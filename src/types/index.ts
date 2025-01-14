export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignee: User | null;
  storyPoints: number;
  startDate: string | null;
  endDate: string | null;
  status: 'OPEN' | 'IN_PROGRESS' | 'IN_REVIEW' | 'DONE';
}

export interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

export type ColumnType = 'OPEN' | 'IN_PROGRESS' | 'IN_REVIEW' | 'DONE'; 