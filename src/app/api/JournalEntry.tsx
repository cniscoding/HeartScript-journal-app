import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../utils/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { title, content, date, sentiments, sentiment_score } = req.body;

  // Server-side validation
  if (!title || !content || !date || !sentiments || !sentiment_score) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  // You can perform additional validation checks here

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
}