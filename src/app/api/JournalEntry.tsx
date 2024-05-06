// pages/JournalEntry.tsx
import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from 'pg';

const client = new Client({
  // Postgres connection configuration
  user: 'your_username',
  host: 'your_host',
  database: 'your_database',
  password: 'your_password',
  port: 5432, // Default Postgres port
});

client.connect();

export default async function JournalEntry(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { title, content } = req.body;

  // Server-side validation
  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }
  // You can perform additional validation checks here

  try {
    // Assuming you have a 'journal_entries' table with 'title' and 'content' columns
    const query = 'INSERT INTO journal_entries (title, content) VALUES ($1, $2) RETURNING *';
    const result = await client.query(query, [title, content]);
    const newEntry = result.rows[0];
    res.status(201).json(newEntry);
  } catch (error) {
    console.error('Error inserting journal entry:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}