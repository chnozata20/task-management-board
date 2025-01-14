'use client';

import { createContext, useContext, useState } from 'react';
import { en } from '../i18n/en';
import { tr } from '../i18n/tr';
import { ColumnType } from '../types';

type Language = 'en' | 'tr';

interface Translations {
  common: {
    search: string;
    allUsers: string;
    filters: string;
    new: string;
    edit: string;
    delete: string;
    cancel: string;
    save: string;
    update: string;
    create: string;
  };
  board: {
    newTask: string;
    addTask: string;
    dropHere: string;
    taskCount: string;
    storyPoints: string;
    projectStats: string;
    totalTasks: string;
    totalPoints: string;
    progress: string;
  };
  task: {
    title: string;
    description: string;
    assignee: string;
    startDate: string;
    endDate: string;
    status: string;
    deleteConfirm: string;
  };
  status: {
    open: string;
    inProgress: string;
    inReview: string;
    done: string;
  };
  columnTitles: Record<ColumnType, string>;
  home: {
    title: string;
    description: string;
    goToBoard: string;
    learnMore: string;
    features: {
      teamManagement: {
        title: string;
        description: string;
      };
      taskTracking: {
        title: string;
        description: string;
      };
      statistics: {
        title: string;
        description: string;
      };
    };
  };
}

interface LanguageContextType {
  language: Language;
  t: Translations;
  changeLanguage: (lang: Language) => void;
}

const translations = {
  en,
  tr
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('tr');

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  const value = {
    language,
    t: translations[language],
    changeLanguage
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 