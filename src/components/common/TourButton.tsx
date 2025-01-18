'use client';

import { useTour } from '@/context/TourContext';
import { useLanguage } from '@/context/LanguageContext';
import { Tooltip } from './Tooltip';

export function TourButton() {
  const { startTour } = useTour();
  const { t } = useLanguage();

  return (
    <Tooltip text={t.tour.start}>
      <button
        onClick={startTour}
        className="px-3 py-1.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 
          text-sm font-medium rounded-lg border border-gray-200 dark:border-gray-700
          hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm
          flex items-center gap-2"
        data-testid="tour-button"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-4 w-4" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
          />
        </svg>
        <span className="hidden sm:inline">{t.tour.start}</span>
      </button>
    </Tooltip>
  );
} 