'use client';

import { useTheme } from '@/context/ThemeContext';

export function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      data-testid="theme-switch"
      onClick={toggleTheme}
      className="p-2 rounded-lg 
        bg-jira-bg-card-light dark:bg-jira-bg-card-dark
        border border-jira-border-light dark:border-jira-border-dark
        text-jira-text-primary-light dark:text-jira-text-primary-dark 
        hover:bg-jira-bg-hover-light dark:hover:bg-jira-bg-hover-dark
        transition-colors flex items-center gap-2"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <svg xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5 text-jira-text-secondary-light dark:text-jira-text-secondary-dark" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5 text-jira-text-secondary-light dark:text-jira-text-secondary-dark" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
        </svg>
      )}
    </button>
  );
} 