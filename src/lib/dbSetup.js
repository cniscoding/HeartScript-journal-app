const { db } = require('@vercel/postgres');

export async function seedEntries(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "entries" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS journal_app (
      id SERIAL PRIMARY KEY,
      content TEXT NOT NULL,
      date DATE NOT NULL,
      sentiments TEXT NOT NULL,
      sentimentScore NUMERIC NOT NULL CHECK (sentimentScore >= 0 AND sentimentScore <= 100),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`;

    console.log(`Created "journal_app" table`);

    // Insert data into the "journal_app" table
    const insertedEntries = await client.sql`
    INSERT INTO journal_app (content, date, sentiments, sentimentScore)
    VALUES 
      ('This is my first journal entry.', '2024-05-06', 'Happy', 80),
      ('This is my second journal entry.', '2024-05-06', 'Sad', 30)
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
