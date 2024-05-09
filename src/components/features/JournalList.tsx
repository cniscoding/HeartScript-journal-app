'use client'
import { deleteJournalEntry } from '@/app/api/journalEntries';

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { fetchJournalEntries } from '@/app/api/journalEntries'
import { emojiTable } from '@/lib/emojiTable';

const JournalList = () => {
  const [loading, setLoading] = useState(true);
  const [journalEntries, setJournalEntries] = useState([]);

  const fetchData = async () => {
    try {
      const data = await fetchJournalEntries();
      setJournalEntries(data.body);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching journal entries:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatDate = (dateString: Date) => {
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };

  const handleDeleteEntry = async (entryId) => {
    setLoading(true);
    try {
      await deleteJournalEntry(entryId);
      console.log('Journal entry deleted successfully');
      fetchData()
    } catch (error) {
      console.error('Error deleting journal entry:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col">
        <div className="animate-pulse my-2 flex-col items-center justify-between border-2 p-2 rounded-xl">
          <div className="w-1/3 h-12 bg-gray-200 rounded"></div>
          <div className="mt-2">
            <div className="h-6 w-3/4 bg-gray-200 rounded"></div>
            <div className="h-4 w-1/2 mt-2 bg-gray-200 rounded"></div>
          </div>
        </div>
        <div className="animate-pulse my-2 flex-col items-center justify-between border-2 p-2 rounded-xl">
          <div className="w-1/3 h-12 bg-gray-200 rounded"></div>
          <div className="mt-2">
            <div className="h-6 w-3/4 bg-gray-200 rounded"></div>
            <div className="h-4 w-1/2 mt-2 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {journalEntries.map((entry, index) => (
        <Card key={index} className="my-2 flex-col items-center justify-between">
          <CardHeader>
            <div>
              <CardTitle className="flex justify-between items-center">
                <div className="flex">
                  <span className="hidden md:flex">Journal Entry for&nbsp;</span> {formatDate(entry.date)}
                </div>
                <button onClick={() => handleDeleteEntry(entry.id)} disabled={loading}>
                  {loading ? 'Deleting...' : 'Delete'}
                </button>
                {/* <DeleteButton onDelete={handleDeleteEntry} entryId={entry.id} /> */}
                {/* <button>X</button> */}
              </CardTitle>
              <CardDescription className="flex flex-col">
                <span className="">
                  {entry.sentiments} {emojiTable[entry.sentiments]?.emoji}
                </span>
              </CardDescription>
            </div>
          </CardHeader>
          <div>
            <CardContent>
              <p>{entry.content}</p>
            </CardContent>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default JournalList;