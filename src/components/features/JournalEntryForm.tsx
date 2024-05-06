// components/JournalEntryForm.tsx
import React, { useState } from 'react';

const JournalEntryForm: React.FC = () => {
  const [entry, setEntry] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle submission of journal entry
    console.log('Submitted entry:', entry);
    // You can send the entry to a backend, save it to state, etc.
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={entry} onChange={e => setEntry(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default JournalEntryForm;
