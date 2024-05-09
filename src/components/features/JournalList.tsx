'use server'

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { fetchJournalEntries } from '@/app/api/journalEntries'
import { emojiTable } from '@/lib/emojiTable';

const JournalList = async () => {
  const journalEntries = await fetchJournalEntries()

  const formatDate = (dateString: Date) => {
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };
  return (
    <div className="flex flex-col">
      {journalEntries.body.map((entry, index) => (
        <Card key={index} className="my-2 flex-col items-center justify-between text-center">
          <CardHeader>
            {/* <CardTitle>{entry.title}</CardTitle> */}
            {/* <CardTitle>{entry.date.toLocaleDateString()}</CardTitle> */}
            <CardTitle>{formatDate(entry.date)}</CardTitle>
            <CardDescription className="flex flex-col">
              {/* {entry.date.toLocaleDateString()} */}
              <span className="">
                {entry.sentiments} {emojiTable[entry.sentiments]?.emoji}
              </span>
            </CardDescription>
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