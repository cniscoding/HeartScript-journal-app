'use client'

import React, {useEffect, useState} from 'react';
import { setupDatabase } from '@/app/utils/dbSetUp';
import JournalList from '@/components/features/JournalList';
import JournalEntryForm from '@/components/features/JournalEntryForm';
import { getJournalEntries } from '@/app/utils/db';
import { JournalEntry } from '../types';

const Home: React.FC = () => {
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);

  useEffect(() => {
    setupDatabase().then(() => {
      console.log('Database setup complete.');
      fetchJournalEntries();
    });
  }, []);

  const fetchJournalEntries = async () => {
    try {
      // Fetch journal entries from the database
      const entries = await getJournalEntries();
      setJournalEntries(entries);
    } catch (error) {
      console.error('Error fetching journal entries:', error);
    }
  };

  // pull from DB   
  // const journalEntries = [
  //   { id: 1, title: 'First Entry', date: 'may 6, 2024', content: 'This is my first journal entry.', sentiments: ['happy', 'excited'], sentiment_score: 80 },
  //   { id: 2, title: 'Second Entry', date: 'may 6, 2024', content: 'This is my second journal entry.', sentiments: ["sad", "disappointed"], sentiment_score: 30 },
  //   // Add more entries as needed
  // ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <div>
          <h2>Journal Entry Form</h2>
          <JournalEntryForm />
        </div>
        <h2>Journal Entries</h2>
        <JournalList entries={journalEntries} />
      </div>
    </main>
  );
}

export default Home