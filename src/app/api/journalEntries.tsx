import { sql } from '@vercel/postgres';
import { JournalEntry } from '@/app/types';

export async function fetchJournalEntries() {
  try {
    const data: { rows: JournalEntry[] } = await sql<JournalEntry>`SELECT * FROM journal_app`;
    return data.rows;
  } catch (error) {
    throw new Error('Failed to fetch journal data.' + error.message);
  }
}
