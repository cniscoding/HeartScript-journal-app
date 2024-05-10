'use client'
import { deleteJournalEntry } from '@/app/api/journalEntries';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { JournalEntry } from '@/app/types';

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
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);

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
    const options : Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };

  const handleDeleteEntry = async (entryId: any) => {
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
                <div className="flex justify-center items-center">
                  {/* <span className="hidden md:flex">Journal Entry for&nbsp;</span>  */}
                  <div className='rounded-full text-4xl pr-2'>

                    {emojiTable[entry.sentiments]?.emoji}
                  </div>
                  {entry.sentiments.charAt(0).toUpperCase() + entry.sentiments.slice(1)}

                  {/* {formatDate(entry.date)} */}
                </div>
                <button
                  onClick={() => handleDeleteEntry(entry.id)}
                  disabled={loading}
                  className="px-3 py-1 text-sm md:text-lg bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300 disabled:bg-gray-400 disabled:text-gray-600 disabled:cursor-not-allowed"
                >
                  {loading ? 'Deleting...' : 'Delete'}
                </button>
                {/* <DeleteButton onDelete={handleDeleteEntry} entryId={entry.id} /> */}
                {/* <button>X</button> */}
              </CardTitle>
              <CardDescription className="flex flex-col">
                <span className="">
                  {formatDate(entry.date)}
                  {/* {entry.sentiments}  */}
                  {/* {emojiTable[entry.sentiments]?.emoji} */}
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