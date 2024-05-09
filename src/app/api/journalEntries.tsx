'use server'

import { sql, createPool } from '@vercel/postgres';
import { JournalEntry } from '@/app/types';

const pool = createPool({
  connectionString: process.env.POSTGRES_URL,
});

let failedAttempts = 0;
// ORDER BY ${sortBy} ${sortOrder}, created_at DESC
export async function fetchJournalEntries(sortBy: string, sortOrder: string) {
  try {
    const data: { rows: JournalEntry[] } = await sql<JournalEntry>`
    SELECT * FROM journal_app
    ORDER BY date DESC, created_at DESC
    `;
    failedAttempts = 0;
    return data.rows;
  } catch (error) {
    failedAttempts++
    if (failedAttempts > 1) {
      throw new Error('Failed to fetch journal data. Retry limit exceeded.');
    }
    throw new Error('Failed to fetch journal data.' + error.message);
  }
}

export async function writeJournalEntry(entry: JournalEntry) {
  const client = await sql.connect();
  try {
    await pool.sql`
      INSERT INTO journal_app (content, date, sentiments, sentimentScore)
      VALUES (${entry.content}, ${entry.date}, ${entry.sentiments}, ${entry.sentimentScore})
      RETURNING *
      `;
    console.log('injected successfully from journalEntries API')

    return { success: true };
  } catch (error) {
    throw new Error('Failed to write journal entry.' + error.message);
  }
}

