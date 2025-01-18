import type { User } from 'src/types/user';

export type Priority = 'HIGH' | 'MEDIUM' | 'LOW';

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export const PRIORITY_COLORS: Record<Priority, string> = {
  HIGH: '#ef4444',   // Red
  MEDIUM: '#eab308', // Yellow
  LOW: '#22c55e'     // Green
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
  { id: '1', name: 'Bug', color: '#ef4444' },         // Red
  { id: '2', name: 'Feature', color: '#22c55e' },     // Green
  { id: '3', name: 'Documentation', color: '#3b82f6' },// Blue
  { id: '4', name: 'Enhancement', color: '#a855f7' },  // Purple
  { id: '5', name: 'Design', color: '#ec4899' }       // Pink
]; 