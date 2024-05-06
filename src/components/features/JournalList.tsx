import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface JournalEntry {
  id: number;
  title: string;
  content: string;
  date: string;
}

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
        </Card>
      ))}
    </>
  );
};

export default JournalList;