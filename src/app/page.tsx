'use client'

import React, { useEffect } from 'react';
import JournalList from '@/components/features/JournalList';
import JournalEntryForm from '@/components/features/JournalEntryForm';
import JournalSortControls from '@/components/features/sortJournalEntry';
import ReloadButton from '@/components/features/refreshButton';
import ResetDatabaseButton from '@/components/features/ResetDatabaseButton';


const Home: React.FC = () => {
  // const [sortBy, setSortBy] = useState<string>('date');
  // const [sortOrder, setSortOrder] = useState<string>('DESC');

  return (
    <main className="flex min-h-screen min-w-screen flex-col p-6">
      <div>
        <div className="flex flex-col items-end">
          <div>
            FOR DEMO PURPOSES
          </div>
          <div>
            <ResetDatabaseButton />
            {/* <ReloadButton /> */}
          </div>
        </div>
        {/* <SeedEntriesButton /> */}
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