'use client'

import React from 'react';
import {seedEntries} from '../../lib/dbSetup'
const { db } = require('@vercel/postgres');

const SeedEntriesButton = () => {
  const handleSeedEntries = async () => {
    const client = await db.connect();
    await seedEntries(client);
    await client.end();
    alert('Entries seeded successfully!');
  };

  return (
    <button onClick={handleSeedEntries}>Seed Entries</button>
  );
};

export default SeedEntriesButton;