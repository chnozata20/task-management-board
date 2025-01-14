'use client';

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { Task, User, Column, ColumnType } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface BoardContextType {
  columns: Column[];
  users: User[];
  updateTaskStatus: (taskId: string, sourceColumn: ColumnType, destinationColumn: ColumnType) => void;
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (task: Task) => void;
  deleteTask: (taskId: string) => void;
  addUser: (user: Omit<User, 'id'>) => void;
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
    status: 'OPEN' as const
  },
  {
    id: '2',
    title: 'API entegrasyonu',
    description: 'Backend servisleri ile bağlantı kurulacak',
    assignee: initialUsers[1],
    storyPoints: 8,
    startDate: '2024-01-15',
    endDate: '2024-01-25',
    status: 'IN_PROGRESS' as const
  },
  {
    id: '3',
    title: 'Test senaryoları',
    description: 'E2E testlerin yazılması',
    assignee: initialUsers[2],
    storyPoints: 3,
    startDate: '2024-01-16',
    endDate: '2024-01-18',
    status: 'IN_REVIEW' as const
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
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [users, setUsers] = useState<User[]>(initialUsers);

  const updateTaskStatus = (taskId: string, sourceColumn: ColumnType, destinationColumn: ColumnType) => {
    setColumns(prevColumns => {
      const newColumns = [...prevColumns];
      
      // Kaynaktan taskı bul ve kaldır
      const sourceColumnIndex = newColumns.findIndex(col => 
        col.tasks.some((task: Task) => task.id === taskId)
      );
      const taskToMove = newColumns[sourceColumnIndex].tasks.find(
        (task: Task) => task.id === taskId
      );
      
      if (!taskToMove) return prevColumns;
      
      newColumns[sourceColumnIndex].tasks = newColumns[sourceColumnIndex].tasks.filter(
        (task: Task) => task.id !== taskId
      );
      
      // Hedef kolona taskı ekle
      const destinationColumnIndex = newColumns.findIndex(col => col.title.toUpperCase() === destinationColumn);
      taskToMove.status = destinationColumn;
      newColumns[destinationColumnIndex].tasks.push(taskToMove);
      
      return newColumns;
    });
  };

  const addTask = useCallback((newTask: Omit<Task, 'id'>) => {
    setColumns(prev => {
      let taskId = uuidv4();
      const allTasks = prev.flatMap(col => col.tasks);
      
      // Benzersiz bir ID bulana kadar yeni ID oluştur
      while (allTasks.some(task => task.id === taskId)) {
        taskId = uuidv4();
      }

      return prev.map(column => {
        if (column.title.toUpperCase() === newTask.status) {
          return {
            ...column,
            tasks: [...column.tasks, { ...newTask, id: taskId }]
          };
        }
        return column;
      });
    });
  }, []);

  const updateTask = (updatedTask: Task) => {
    setColumns(prevColumns => {
      const newColumns = [...prevColumns];
      const columnIndex = newColumns.findIndex(col => 
        col.tasks.some((task: Task) => task.id === updatedTask.id)
      );
      
      if (columnIndex === -1) return prevColumns;
      
      const taskIndex = newColumns[columnIndex].tasks.findIndex(
        (task: Task) => task.id === updatedTask.id
      );
      newColumns[columnIndex].tasks[taskIndex] = updatedTask;
      
      return newColumns;
    });
  };

  const deleteTask = (taskId: string) => {
    setColumns(prevColumns => {
      const newColumns = [...prevColumns];
      const columnIndex = newColumns.findIndex(col => 
        col.tasks.some((task: Task) => task.id === taskId)
      );
      
      if (columnIndex === -1) return prevColumns;
      
      newColumns[columnIndex].tasks = newColumns[columnIndex].tasks.filter(
        (task: Task) => task.id !== taskId
      );
      
      return newColumns;
    });
  };

  const addUser = (userData: Omit<User, 'id'>) => {
    const newUser: User = {
      ...userData,
      id: crypto.randomUUID()
    };
    setUsers(prev => [...prev, newUser]);
  };

  return (
    <BoardContext.Provider value={{ 
      columns, 
      users, 
      updateTaskStatus, 
      addTask, 
      updateTask,
      deleteTask,
      addUser 
    }}>
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