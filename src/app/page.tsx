
import React from 'react';
import JournalList from '@/components/features/JournalList';

const Home: React.FC = () => {
  // Assuming you have a list of entries passed from props or fetched from an API
  const journalEntries = [
    { id: 1, title: 'First Entry', content: 'This is my first journal entry.' },
    { id: 2, title: 'Second Entry', content: 'This is my second journal entry.' },
    // Add more entries as needed
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1>Journal Entries</h1>
        <JournalList entries={journalEntries} />
      </div>
    </main>
  );
}

export default Home