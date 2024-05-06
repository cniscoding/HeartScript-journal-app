import pool from '@/lib/db';

async function setupDatabase() {
  const client = await pool.connect();
  try {
    // Create initial schema
    await client.query(`
      CREATE TABLE IF NOT EXISTS journal_app (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        date DATE NOT NULL,
        sentiments VARCHAR(255) NOT NULL,
        sentiment_score INTEGER NOT NULL CHECK (sentiment_score >= 0 AND sentiment_score <= 100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Seed initial data
    await client.query(`
      INSERT INTO journal_app (title, content, date, sentiments, sentiment_score) VALUES
      ('First Entry', 'This is the content of the first entry.', '2024-05-10', 'happy', 80),
      ('Second Entry', 'This is the content of the second entry.', '2024-05-11', 'sad', 30)
    `);
  } catch (error) {
    console.error('Error setting up database:', error);
  } finally {
    client.release();
  }
}

export { setupDatabase };