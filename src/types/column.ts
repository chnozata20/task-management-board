import type { Task } from '@/types/task';

export type ColumnType = 'OPEN' | 'IN_PROGRESS' | 'IN_REVIEW' | 'DONE';

export interface Column {
  id: string;
  title: string;
  tasks: Task[];
} 