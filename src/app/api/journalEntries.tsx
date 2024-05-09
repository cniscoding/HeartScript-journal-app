'use server'

import { unstable_noStore as noStore } from 'next/cache';
import { sql, createPool } from '@vercel/postgres';
import { JournalEntry } from '@/app/types';

const pool = createPool({
  connectionString: process.env.POSTGRES_URL,
});

let failedAttempts = 0;
// ORDER BY ${sortBy} ${sortOrder}, created_at DESC
export async function fetchJournalEntries(sortBy: string, sortOrder: string) {
  noStore();
  try {
    const data: { rows: JournalEntry[] } = await sql<JournalEntry>`
    SELECT * FROM journal_app
    ORDER BY date DESC, created_at DESC
    `;
    failedAttempts = 0;
    // return data.rows;
    return {
      statusCode: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      },
      body: data.rows
    }
  } catch (error) {
    failedAttempts++
    if (failedAttempts > 1) {
      throw new Error('Failed to fetch journal data. Retry limit exceeded.');
    }
    throw new Error('Failed to fetch journal data.' + error.message);
  }
}

export async function writeJournalEntry(entry: JournalEntry) {
  noStore();
  try {
    await pool.sql`
      INSERT INTO journal_app (content, date, sentiments, sentimentScore)
      VALUES (${entry.content}, ${entry.date}, ${entry.sentiments}, ${entry.sentimentScore})
      RETURNING *
      `;
    console.log('injected successfully from journalEntries API')

    // return { success: true };
    return {
      statusCode: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      },
      body: JSON.stringify({ success: true })
    }
  } catch (error) {
    throw new Error('Failed to write journal entry.' + error.message);
  }
}


export async function deleteJournalEntry(entryId) {
  try {
    await pool.sql`
      DELETE FROM journal_app
      WHERE id = ${entryId}
    `;
    console.log('Entry deleted successfully from journalEntries API')

    return {
      statusCode: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      },
      body: JSON.stringify({ success: true })
    }
  } catch (error) {
    throw new Error('Failed to delete journal entry.' + error.message);
  }
}

export async function handleDeleteEntry(entryId) {
  try {
    const response = await deleteJournalEntry(entryId);
  } catch (error) {
    console.error('Error deleting journal entry:', error);
  }
}

export async function seedEntries() {
  try {
    console.log('did it get here?')
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await pool.sql`
    DROP TABLE IF EXISTS journal_app;
    `
    console.log('clear database')
    await pool.sql`
    CREATE TABLE IF NOT EXISTS journal_app (
      id SERIAL PRIMARY KEY,
      content TEXT NOT NULL,
      date DATE NOT NULL,
      sentiments TEXT NOT NULL,
      sentimentScore NUMERIC,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`;

    console.log(`Created "journal_app" table`);
    await pool.sql`
    INSERT INTO journal_app (content, date, sentiments, sentimentScore)
    VALUES 
      ('Today sparked a wildfire of curiosity within me as I stumbled upon an ancient tome tucked away in the dusty corner of the library, its faded pages whispering secrets of a forgotten era, igniting a hunger for knowledge I never knew I possessed', '2024-05-06', 'curiosity', 80),
      ('Today, I found myself in an unexpected moment of embarrassment when I tripped over my own shoelaces in the crowded hallway, drawing the attention of everyone around me.', '2024-05-06', 'embarrassment', 30),
      ('Anxiety fluttered in my chest as I awaited feedback on my latest project, yearning for the nod of approval that would validate the countless hours of dedication poured into its creation.', '2024-05-06', 'nervousness', 30)
      `;
    console.log(`Seeded entries`);

  } catch (error) {
    console.error('Error seeding Entries:', error);
    throw error;
  }
}