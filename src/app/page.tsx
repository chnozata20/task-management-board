'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function HomePage() {
  const { t } = useLanguage();
  
  return (
    <main className="min-h-screen bg-jira-page-dark">
      <div className="max-w-[1920px] mx-auto p-6">
        <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-8">
          <div className="space-y-4 text-center">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-jira-primary-light to-jira-primary bg-clip-text text-transparent">
              {t.home.title}
            </h1>
            <p className="text-jira-text-secondary text-xl max-w-2xl">
              {t.home.description}
            </p>
          </div>

          <div className="flex gap-4">
            <Link 
              href="/board"
              className="px-6 py-3 bg-jira-primary text-white text-lg font-medium rounded-lg 
                hover:bg-jira-primary-hover transition-colors shadow-jira-md hover:shadow-jira-lg
                flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V4zM8 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H9a1 1 0 01-1-1V4zM15 3a1 1 0 00-1 1v12a1 1 0 001 1h2a1 1 0 001-1V4a1 1 0 00-1-1h-2z" />
              </svg>
              {t.home.goToBoard}
            </Link>
            <button 
              className="px-6 py-3 border border-light text-jira-text-primary text-lg 
                font-medium rounded-lg hover:bg-jira-bg-hover transition-colors"
            >
              {t.home.learnMore}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-16">
          <div className="bg-jira-bg-card-light p-6 rounded-lg border border-light">
            <div className="w-12 h-12 bg-jira-primary/10 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-jira-primary" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-jira-text-primary mb-2">
              {t.home.features.teamManagement.title}
            </h3>
            <p className="text-jira-text-secondary">
              {t.home.features.teamManagement.description}
            </p>
          </div>

          <div className="bg-jira-bg-card-light p-6 rounded-lg border border-light">
            <div className="w-12 h-12 bg-jira-status-success/10 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-jira-status-success" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-jira-text-primary mb-2">
              {t.home.features.taskTracking.title}
            </h3>
            <p className="text-jira-text-secondary">
              {t.home.features.taskTracking.description}
            </p>
          </div>

          <div className="bg-jira-bg-card-light p-6 rounded-lg border border-light">
            <div className="w-12 h-12 bg-jira-status-warning/10 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-jira-status-warning" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-jira-text-primary mb-2">
              {t.home.features.statistics.title}
            </h3>
            <p className="text-jira-text-secondary">
              {t.home.features.statistics.description}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
