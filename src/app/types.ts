export interface JournalEntry {
  id: number;
  title: string;
  content: string;
  date: string;
  sentiments: string[];
  sentiment_score: number;
}