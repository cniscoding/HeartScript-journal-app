

import React, { useState } from 'react';
import JournalList from '@/components/features/JournalList';
import JournalEntryForm from '@/components/features/JournalEntryForm';
import JournalSortControls from '@/components/features/sortJournalEntry';

const Home: React.FC = () => {
  // const [sortBy, setSortBy] = useState<string>('date');
  // const [sortOrder, setSortOrder] = useState<string>('DESC');

  return (
    <main className="flex min-h-screen min-w-screen flex-col p-24">
      <div>
        <div>
          <h2>Journal Entry Form</h2>
          <JournalEntryForm />
        </div>
        <h2>Journal Entries</h2>
        {/* <JournalSortControls
          onSortByDate={() => setSortBy('date')}
          onSortByCreationDate={() => setSortBy('created_at')}
          onSortAscending={() => setSortOrder('ASC')}
          onSortDescending={() => setSortOrder('DESC')} /> */}
        <JournalList />
      </div>
    </main>
  );
}

export default Home