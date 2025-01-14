export type ColumnType = 'OPEN' | 'IN_PROGRESS' | 'IN_REVIEW' | 'DONE';

export interface Task {
  id: string;
  title: string;
  description: string;
  assignee: User | null;
  storyPoints: number;
  startDate: string;
  endDate: string;
  status: ColumnType;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface Column {
  id: string;
  title: ColumnType;
  tasks: Task[];
} 