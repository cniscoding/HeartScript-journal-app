'use client'

import { useEffect, useState } from 'react';
import { JournalEntry } from '@/app/types';

export function useJournalEntries(): JournalEntry[] {
  const [journalEntries, setJournalEntries] = useState([]);

  useEffect(() => {
    const fetchJournalEntries = async () => {
      try {
        const response = await fetch('/api/journalEntries');
        if (response.ok) {
          const entries = await response.json();
          setJournalEntries(entries);
        } else {
          console.error('Failed to fetch journal entries:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching journal entries:', error);
      }
    };

    fetchJournalEntries();
  }, []);

  return journalEntries;
};

