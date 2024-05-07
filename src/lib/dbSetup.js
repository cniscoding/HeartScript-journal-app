const { db } = require('@vercel/postgres');
import { journalEntries } from '@/lib/placeholder-data.js';
// import bcrypt from 'bcrypt';

// async function setupDatabase() {
//   const client = await db.connect();
//   try {
//     // Create initial schema
//     await client.query(`
//       CREATE TABLE IF NOT EXISTS journal_app (
//         id SERIAL PRIMARY KEY,
//         title VARCHAR(255) NOT NULL,
//         content TEXT NOT NULL,
//         date DATE NOT NULL,
//         sentiments VARCHAR(255) NOT NULL,
//         sentiment_score INTEGER NOT NULL CHECK (sentiment_score >= 0 AND sentiment_score <= 100),
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//       )
//     `);

//     // Seed initial data
//     await journalEntries(client);

//     // Add code to seed additional tables if necessary

//   } catch (error) {
//     console.error('Error setting up database:', error);
//   } finally {
//     client.release();
//   }
// }


async function seedEntries(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "entries" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS journal_app (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      content TEXT NOT NULL,
      date DATE NOT NULL,
      sentiments VARCHAR(255)[] NOT NULL,
      sentiment_score INTEGER NOT NULL CHECK (sentiment_score >= 0 AND sentiment_score <= 100),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`;

    console.log(`Created "journal_app" table`);

    // Insert data into the "journal_app" table
    const insertedEntries = await client.sql`
    INSERT INTO journal_app (title, content, date, sentiments, sentiment_score)
    VALUES 
      ('First Entry', 'This is my first journal entry.', '2024-05-06', '{"happy", "excited"}', 80),
      ('Second Entry', 'This is my second journal entry.', '2024-05-06', '{"sad", "disappointed"}', 30)
    RETURNING *
    `;
    console.log(`Seeded ${insertedEntries.length} entries`);

    return {
      createTable,
      Entries: insertedEntries,
    };
  } catch (error) {
    console.error('Error seeding Entries:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedEntries(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
