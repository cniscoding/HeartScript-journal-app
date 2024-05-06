import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { JournalEntry } from '../types';

// interface JournalEntry {
//   id: number;
//   title: string;
//   content: string;
//   date: string;
//   sentiments: string[];
//   sentiment_score: number;
// }

interface Props {
  entries: JournalEntry[];
}

const JournalList: React.FC<Props> = ({ entries }) => {
  return (
    <>
      {entries.map(entry => (
        <Card>
          <CardHeader>
            <CardTitle>{entry.title}</CardTitle>
            <CardDescription>{entry.date}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{entry.content}</p>
          </CardContent>
          <CardFooter>
            {entry.sentiments?.map(sentiment => (
              <span key={sentiment} className="cursor-pointer bg-gray-100 text-gray-800 text-lg px-4 py-1 rounded-full border border-gray-400">{sentiment}</span>
            ))}
            {entry.sentiment_score}
          </CardFooter>
        </Card>
      ))}
    </>
  );
};

export default JournalList;