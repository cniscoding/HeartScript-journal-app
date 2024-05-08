import React from 'react';
import JournalList from '@/components/features/JournalList';
import JournalEntryForm from '@/components/features/JournalEntryForm';

const Home: React.FC = () => {

  // pull from DB   
  // const journalEntries = [
  //   { id: 1, title: 'First Entry', date: 'may 6, 2024', content: 'This is my first journal entry.', sentiments: ['happy', 'excited'], sentiment_score: 80 },
  //   { id: 2, title: 'Second Entry', date: 'may 6, 2024', content: 'This is my second journal entry.', sentiments: ["sad", "disappointed"], sentiment_score: 30 },
  //   // Add more entries as needed
  // ];

  return (
    <main className="flex min-h-screen min-w-screen flex-col p-24">
      <div>
        <div>
          <h2>Journal Entry Form</h2>
          <JournalEntryForm />
        </div>
        <h2>Journal Entries</h2>
        {/* <JournalList entries={journalEntries} /> */}
        <JournalList />
      </div>
    </main>
  );
}

export default Home