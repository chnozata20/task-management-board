'use client';

import { createContext, useContext, useState } from 'react';
import { en } from '../i18n/en';
import { tr } from '../i18n/tr';
import type { Translations } from '@/types/translations';

type Language = 'en' | 'tr';

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