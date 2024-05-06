import React from 'react';

interface JournalEntry {
  id: number;
  title: string;
  content: string;
}

interface Props {
  entries: JournalEntry[];
}

const JournalList: React.FC<Props> = ({ entries }) => {
  return (
    <div>
      {entries.map(entry => (
        <div key={entry.id}>
          <h2>{entry.title}</h2>
          <p>{entry.content}</p>
        </div>
      ))}
    </div>
  );
};

export default JournalList;