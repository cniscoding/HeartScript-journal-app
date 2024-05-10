'use client'

import React, { useEffect } from 'react';
import JournalList from '@/components/features/JournalList';
import JournalEntryForm from '@/components/features/JournalEntryForm';
import JournalSortControls from '@/components/features/sortJournalEntry';
import ReloadButton from '@/components/features/refreshButton';
import ResetDatabaseButton from '@/components/features/ResetDatabaseButton';
import Image from 'next/image'


const Home: React.FC = () => {
  // const [sortBy, setSortBy] = useState<string>('date');
  // const [sortOrder, setSortOrder] = useState<string>('DESC');

  return (
    <main className="flex min-h-screen min-w-screen flex-col p-6">
      <div>
        <div className="flex justify-between m-4">
          <div className="flex md:h-16 md:w-16 h-10 w-10">
            <Image
              src="/images/logo.png"
              width={75}
              height={75}
              alt="Logo"
              className="rounded-l-full rounded-r-xl"
            />
            <h2 className="p-2 text-2xl md:text-4xl" >
              <span
                className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 bg-clip-text text-transparent"
                style={{ zIndex: -1 }}
              >
                HeartScript.
              </span>
            </h2>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="md:text-md text-xs">
              <p>FOR DEMO PURPOSES</p>
            </div>
            <div className="">
              <ResetDatabaseButton />
              {/* <ReloadButton /> */}
            </div>
          </div>
        </div>
        {/* <SeedEntriesButton /> */}
        <div className="py-4">
          {/* <h2 className="text-2xl font-bold text-gray-800 my-4">Journal Entry Form</h2> */}
          <JournalEntryForm />
        </div>
        {/* <h2 className="text-2xl font-bold text-gray-800 my-4">Journal Entries</h2> */}
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