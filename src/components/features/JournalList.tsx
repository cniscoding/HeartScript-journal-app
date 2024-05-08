// 'use client'

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { fetchJournalEntries } from '@/app/api/journalEntries'

const JournalList = async () => {
  const journalEntries = await fetchJournalEntries()

  return (
    <>
      {journalEntries.map(entry => (
        <Card>
          <CardHeader>
            <CardTitle>{entry.title}</CardTitle>
            <CardDescription>{entry.date.toLocaleDateString()}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{entry.content}</p>
          </CardContent>
          <CardFooter>
            {entry.sentiments?.map(sentiment => (
              <span key={sentiment} className="cursor-pointer bg-gray-100 text-gray-800 text-lg px-4 py-1 rounded-full border border-gray-400">
                {sentiment}
              </span>
            ))}
            {entry.sentiment_score}
          </CardFooter>
        </Card>
      ))}
    </>
  );
};


export default JournalList;