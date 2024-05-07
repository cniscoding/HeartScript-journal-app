export interface JournalEntry {
  id: number;
  title: string;
  content: string;
  date: Date;
  sentiments: string[];
  sentiment_score: number;
}