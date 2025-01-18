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
  },
  { 
    id: '4', 
    name: 'Cihan Özata', 
    avatar: 'https://robohash.org/Cihan+Özata.png' 
  },
  { 
    id: '5', 
    name: 'Mauro Icardi', 
    avatar: 'https://robohash.org/Mauro+Icardi.png' 
  },
  { 
    id: '6', 
    name: 'Cristiano Ronaldo', 
    avatar: 'https://robohash.org/Cristiano+Ronaldo.png' 
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
  },
  {
    id: '4',
    title: 'Performans optimizasyonu',
    description: 'Uygulama performansının iyileştirilmesi',
    assignee: initialUsers[3],
    storyPoints: 5,
    startDate: '2024-01-17',
    endDate: '2024-01-22',
    status: 'IN_PROGRESS' as const,
    priority: 'HIGH' as const,
    tags: [
      { id: '4', name: 'Enhancement', color: '#a855f7' }
    ]
  },
  {
    id: '5',
    title: 'Kullanıcı dokümantasyonu',
    description: 'Kullanım kılavuzu hazırlanması',
    assignee: initialUsers[4],
    storyPoints: 3,
    startDate: '2024-01-18',
    endDate: '2024-01-21',
    status: 'DONE' as const,
    priority: 'LOW' as const,
    tags: [
      { id: '3', name: 'Documentation', color: '#3b82f6' }
    ]
  },
  {
    id: '6',
    title: 'Responsive tasarım',
    description: 'Mobil uyumlu tasarım geliştirmeleri',
    assignee: initialUsers[5],
    storyPoints: 8,
    startDate: '2024-01-19',
    endDate: '2024-01-26',
    status: 'OPEN' as const,
    priority: 'MEDIUM' as const,
    tags: [
      { id: '5', name: 'Design', color: '#ec4899' },
      { id: '2', name: 'Feature', color: '#22c55e' }
    ]
  },
  {
    id: '7',
    title: 'Hata düzeltmeleri',
    description: 'Bildirilen hataların giderilmesi',
    assignee: initialUsers[0],
    storyPoints: 3,
    startDate: '2024-01-20',
    endDate: '2024-01-22',
    status: 'IN_REVIEW' as const,
    priority: 'HIGH' as const,
    tags: [
      { id: '1', name: 'Bug', color: '#ef4444' }
    ]
  },
  {
    id: '8',
    title: 'Yeni özellik geliştirme',
    description: 'Kullanıcı isteklerine göre yeni özellikler',
    assignee: initialUsers[1],
    storyPoints: 5,
    startDate: '2024-01-21',
    endDate: '2024-01-25',
    status: 'OPEN' as const,
    priority: 'MEDIUM' as const,
    tags: [
      { id: '2', name: 'Feature', color: '#22c55e' }
    ]
  },
  {
    id: '9',
    title: 'Güvenlik testleri',
    description: 'Güvenlik açıklarının tespiti ve giderilmesi',
    assignee: initialUsers[2],
    storyPoints: 8,
    startDate: '2024-01-22',
    endDate: '2024-01-29',
    status: 'IN_PROGRESS' as const,
    priority: 'HIGH' as const,
    tags: [
      { id: '4', name: 'Enhancement', color: '#a855f7' }
    ]
  },
  {
    id: '10',
    title: 'CI/CD pipeline kurulumu',
    description: 'Otomatik dağıtım süreçlerinin yapılandırılması',
    assignee: initialUsers[3],
    storyPoints: 5,
    startDate: '2024-01-23',
    endDate: '2024-01-26',
    status: 'DONE' as const,
    priority: 'MEDIUM' as const,
    tags: [
      { id: '4', name: 'Enhancement', color: '#a855f7' }
    ]
  },
  {
    id: '11',
    title: 'Analitik entegrasyonu',
    description: 'Kullanıcı davranışlarının takibi için analitik araçların entegrasyonu',
    assignee: initialUsers[4],
    storyPoints: 3,
    startDate: '2024-01-24',
    endDate: '2024-01-26',
    status: 'IN_REVIEW' as const,
    priority: 'LOW' as const,
    tags: [
      { id: '2', name: 'Feature', color: '#22c55e' }
    ]
  },
  {
    id: '12',
    title: 'Dark mode geliştirmeleri',
    description: 'Karanlık tema iyileştirmeleri ve hata düzeltmeleri',
    assignee: initialUsers[5],
    storyPoints: 3,
    startDate: '2024-01-25',
    endDate: '2024-01-27',
    status: 'IN_PROGRESS' as const,
    priority: 'LOW' as const,
    tags: [
      { id: '5', name: 'Design', color: '#ec4899' },
      { id: '4', name: 'Enhancement', color: '#a855f7' }
    ]
  }
];

const initialColumns: Column[] = [
  { id: '1', title: 'OPEN', tasks: initialTasks.filter(task => task.status === 'OPEN') },
  { id: '2', title: 'IN_PROGRESS', tasks: initialTasks.filter(task => task.status === 'IN_PROGRESS') },
  { id: '3', title: 'IN_REVIEW', tasks: initialTasks.filter(task => task.status === 'IN_REVIEW') },
  { id: '4', title: 'DONE', tasks: initialTasks.filter(task => task.status === 'DONE') }
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