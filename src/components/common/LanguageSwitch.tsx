'use client';

import { useLanguage } from '../../context/LanguageContext';

export function LanguageSwitch() {
  const { language, changeLanguage } = useLanguage();

  return (
    <button
      onClick={() => changeLanguage(language === 'tr' ? 'en' : 'tr')}
      className="px-2 py-1 text-sm rounded-lg 
        bg-jira-bg-card-light dark:bg-jira-bg-card-dark
        border border-jira-border-light dark:border-jira-border-dark
        text-jira-text-primary-light dark:text-jira-text-primary-dark 
        hover:bg-jira-bg-hover-light dark:hover:bg-jira-bg-hover-dark
        transition-colors flex items-center gap-2"
    >
      <span className="font-medium">{language.toUpperCase()}</span>
      <svg xmlns="http://www.w3.org/2000/svg" 
        className="h-4 w-4 text-jira-text-secondary-light dark:text-jira-text-secondary-dark" 
        viewBox="0 0 20 20" 
        fill="currentColor"
      >
        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
      </svg>
    </button>
  );
} 