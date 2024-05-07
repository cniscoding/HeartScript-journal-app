import { NextApiRequest, NextApiResponse } from 'next';
import pool from '@/lib/db';
import { sql } from '@vercel/postgres';
import { JournalEntry } from '@/app/types';

export async function fetchJournalEntries() {
  try {
    // const data = await sql<JournalEntry>`SELECT * FROM journal_app`;
    const data: { rows: JournalEntry[] } = await sql<JournalEntry>`SELECT * FROM journal_app`;
    console.log('typeof data.rows fetch', typeof data.rows)
    // console.log('data',data)
    console.log('Data fetch completed');
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error.message);
    throw new Error('Failed to fetch journal data.' + error.message);
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('journalEntry TOP')
  if (req.method === 'GET') {
    console.log('getJournalEntry im hitting 1')
    try {
      // Fetch journal entries from the database
      console.log('getJournalEntry try 1')
      const result = await pool.query('SELECT * FROM journal_app');
      const entries = result.rows;
      res.status(200).json(entries);
    } catch (error) {
      console.error('Error fetching journal entries:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'POST') {
    const { title, content, date, sentiments, sentiment_score } = req.body;

    // Server-side validation
    if (!title || !content || !date || !sentiments || !sentiment_score) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    try {
      // Insert the new journal entry into the database
      const result = await pool.query(
        'INSERT INTO journal_app (title, content, date, sentiments, sentiment_score) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [title, content, date, sentiments, sentiment_score]
      );
      const newEntry = result.rows[0];
      res.status(201).json(newEntry);
    } catch (error) {
      console.error('Error inserting journal entry:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}