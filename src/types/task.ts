import type { User } from 'src/types/user';

export type Priority = 'HIGH' | 'MEDIUM' | 'LOW';

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export const PRIORITY_COLORS: Record<Priority, string> = {
  HIGH: '#ef4444',   // Kırmızı
  MEDIUM: '#eab308', // Sarı
  LOW: '#22c55e'     // Yeşil
};

export interface Task {
  id: string;
  title: string;
  description: string;
  assignee: User | null;
  storyPoints: number;
  startDate: string | null;
  endDate: string | null;
  status: 'OPEN' | 'IN_PROGRESS' | 'IN_REVIEW' | 'DONE';
  priority: Priority;
  tags: Tag[];
}

export const DEFAULT_TAGS: Tag[] = [
  { id: '1', name: 'Bug', color: '#ef4444' },         // Kırmızı
  { id: '2', name: 'Feature', color: '#22c55e' },     // Yeşil
  { id: '3', name: 'Documentation', color: '#3b82f6' },// Mavi
  { id: '4', name: 'Enhancement', color: '#a855f7' },  // Mor
  { id: '5', name: 'Design', color: '#ec4899' }       // Pembe
]; 