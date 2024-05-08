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
    ORDER BY date DESC
    `;
    return data.rows;
  } catch (error) {
    throw new Error('Failed to fetch journal data.' + error.message);
  }
}

// export async function writeJournalEntry(entry: JournalEntry) {
export async function writeJournalEntry() {
  console.log('did this hit? 1 ')
  const client = await sql.connect();
  try {
    // await sql`INSERT INTO journal_app (title, content, date, sentiments, sentiment_score)
    //            VALUES (${entry.title}, ${entry.content}, ${entry.date}, ${entry.sentiments}, ${entry.sentimentScore})`;

    //  test
    await pool.sql`INSERT INTO journal_app (title, content, date, sentiments, sentiment_score)
  VALUES ('my day', 'I felt great today', '2024-05-08', ARRAY['happy', 'joy'], '85')`;
    console.log('injected successfully from journalEntries API')
    return { success: true };
  } catch (error) {
    throw new Error('Failed to write journal entry.' + error.message);
  }
}

