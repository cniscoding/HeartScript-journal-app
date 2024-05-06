import { Pool, QueryResult } from 'pg';
import { JournalEntry } from '@/app/types';

const pool = new Pool({
  user: process.env.DB_USER,
  // password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: 5432, 
});

export const fetchJournalEntries = async (): Promise<JournalEntry[]> => {
  const client = await pool.connect();
  try {
    const result: QueryResult<JournalEntry> = await client.query('SELECT * FROM journal_app');
    return result.rows;
  } finally {
    client.release();
  }
};

export default pool;