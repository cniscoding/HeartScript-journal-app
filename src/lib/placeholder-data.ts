import { JournalEntry } from '@/app/types';
  
  export const journalEntries: JournalEntry[]  = [
    { id: 1, title: 'First Entry', date: 'may 6, 2024', content: 'This is my first journal entry.', sentiments: ['happy', 'excited'], sentiment_score: 80 },
    { id: 2, title: 'Second Entry', date: 'may 6, 2024', content: 'This is my second journal entry.', sentiments: ["sad", "disappointed"], sentiment_score: 30 },
  ];