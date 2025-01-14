'use client';

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { Task, User, Column, ColumnType } from '@/types';

export interface BoardContextType {
  tasks: Task[];
  users: User[];
  columns: Column[];
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (taskId: string) => void;
  addUser: (user: User) => void;
  updateUser: (user: User) => void;
  deleteUser: (userId: string) => void;
  updateTaskStatus: (taskId: string, sourceColumn: ColumnType, destinationColumn: ColumnType) => void;
}

const initialUsers: User[] = [
  { 
    id: '1', 
    name: 'Ahmet Yılmaz', 
    avatar: 'https://ui-avatars.com/api/?name=Ahmet+Yilmaz&background=random' 
  },
  { 
    id: '2', 
    name: 'Ayşe Demir', 
    avatar: 'https://ui-avatars.com/api/?name=Ayse+Demir&background=random' 
  },
  { 
    id: '3', 
    name: 'Mehmet Kaya', 
    avatar: 'https://ui-avatars.com/api/?name=Mehmet+Kaya&background=random' 
  }
];

const initialTasks = [
  {
    id: '1',
    title: 'Login sayfası tasarımı',
    description: 'Kullanıcı girişi için modern bir tasarım yapılacak',
    assignee: initialUsers[0],
    storyPoints: 5,
    startDate: '2024-01-14',
    endDate: '2024-01-20',
    status: 'OPEN' as const,
    priority: 'HIGH' as const,
    tags: [
      { id: '5', name: 'Design', color: '#ec4899' },
      { id: '4', name: 'Enhancement', color: '#a855f7' }
    ]
  },
  {
    id: '2',
    title: 'API entegrasyonu',
    description: 'Backend servisleri ile bağlantı kurulacak',
    assignee: initialUsers[1],
    storyPoints: 8,
    startDate: '2024-01-15',
    endDate: '2024-01-25',
    status: 'IN_PROGRESS' as const,
    priority: 'MEDIUM' as const,
    tags: [
      { id: '2', name: 'Feature', color: '#22c55e' },
      { id: '4', name: 'Enhancement', color: '#a855f7' }
    ]
  },
  {
    id: '3',
    title: 'Test senaryoları',
    description: 'E2E testlerin yazılması',
    assignee: initialUsers[2],
    storyPoints: 3,
    startDate: '2024-01-16',
    endDate: '2024-01-18',
    status: 'IN_REVIEW' as const,
    priority: 'LOW' as const,
    tags: [
      { id: '1', name: 'Bug', color: '#ef4444' }
    ]
  }
];

const initialColumns: Column[] = [
  { id: '1', title: 'OPEN', tasks: initialTasks.filter(task => task.status === 'OPEN') },
  { id: '2', title: 'IN_PROGRESS', tasks: initialTasks.filter(task => task.status === 'IN_PROGRESS') },
  { id: '3', title: 'IN_REVIEW', tasks: [] },
  { id: '4', title: 'DONE', tasks: [] }
];

const BoardContext = createContext<BoardContextType | undefined>(undefined);

export function BoardProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [columns, setColumns] = useState<Column[]>(initialColumns);

  const addTask = useCallback((task: Task) => {
    setTasks(prev => [...prev, task]);
    setColumns(prev => prev.map(col => 
      col.title === task.status ? { ...col, tasks: [...col.tasks, task] } : col
    ));
  }, []);

  const updateTask = useCallback((updatedTask: Task) => {
    setTasks(prev => prev.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
    setColumns(prev => prev.map(col => ({
      ...col,
      tasks: col.tasks.map(task => 
        task.id === updatedTask.id ? updatedTask : task
      )
    })));
  }, []);

  const deleteTask = useCallback((taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
    setColumns(prev => prev.map(col => ({
      ...col,
      tasks: col.tasks.filter(task => task.id !== taskId)
    })));
  }, []);

  const updateTaskStatus = useCallback((taskId: string, sourceColumn: ColumnType, destinationColumn: ColumnType) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const updatedTask = { ...task, status: destinationColumn };
    setTasks(prev => prev.map(t => t.id === taskId ? updatedTask : t));
    setColumns(prev => prev.map(col => {
      if (col.title === sourceColumn) {
        return { ...col, tasks: col.tasks.filter(t => t.id !== taskId) };
      }
      if (col.title === destinationColumn) {
        return { ...col, tasks: [...col.tasks, updatedTask] };
      }
      return col;
    }));
  }, [tasks]);

  const addUser = useCallback((user: User) => {
    setUsers(prev => [...prev, user]);
  }, []);

  const updateUser = useCallback((updatedUser: User) => {
    setUsers(prev => prev.map(user => 
      user.id === updatedUser.id ? updatedUser : user
    ));
  }, []);

  const deleteUser = useCallback((userId: string) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
  }, []);

  const value = {
    tasks,
    users,
    columns,
    addTask,
    updateTask,
    deleteTask,
    addUser,
    updateUser,
    deleteUser,
    updateTaskStatus
  };

  return (
    <BoardContext.Provider value={value}>
      {children}
    </BoardContext.Provider>
  );
}

export function useBoardContext() {
  const context = useContext(BoardContext);
  if (context === undefined) {
    throw new Error('useBoardContext must be used within a BoardProvider');
  }
  return context;
} 