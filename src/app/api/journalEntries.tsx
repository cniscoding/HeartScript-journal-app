'use server'
import { sql, postgresConnectionString, createPool } from '@vercel/postgres';
import { JournalEntry } from '@/app/types';

const pooledConnectionString = postgresConnectionString('pool');
const directConnectionString = postgresConnectionString('direct');

const pool = createPool({
  connectionString: process.env.POSTGRES_URL,
});

export async function fetchJournalEntries() {
  try {
    const data: { rows: JournalEntry[] } = await sql<JournalEntry>`
    SELECT * FROM journal_app
    ORDER BY date DESC, created_at DESC
    `;
    return data.rows;
  } catch (error) {
    throw new Error('Failed to fetch journal data.' + error.message);
  }
}

// export async function writeJournalEntry(entry: JournalEntry) {
export async function writeJournalEntry(entry : JournalEntry) {
  const client = await sql.connect();
  try {
    await pool.sql`
      INSERT INTO journal_app (title, content, date, sentiments, sentiment_score)
      VALUES (${entry.title}, ${entry.content}, ${entry.date}, ${entry.sentiments}, ${entry.sentimentScore})
      `;
    console.log('injected successfully from journalEntries API')
    
    return { success: true };
  } catch (error) {
    throw new Error('Failed to write journal entry.' + error.message);
  }
}

