export interface JournalEntry {
  id?: number;
  content: string;
  date: Date;
  sentiments: string;
  sentimentScore: number;
  createdAt?: Date;
}