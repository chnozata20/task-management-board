'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function HomePage() {
  const { t } = useLanguage();
  
  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="mx-auto p-6">
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-12">
          <div className="space-y-6 text-center">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t.home.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-xl max-w-2xl leading-relaxed">
              {t.home.description}
            </p>
          </div>

          <div className="flex gap-6">
            <Link 
              href="/board"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-medium rounded-xl 
                hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl
                flex items-center gap-3 transform hover:scale-105"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V4zM8 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H9a1 1 0 01-1-1V4zM15 3a1 1 0 00-1 1v12a1 1 0 001 1h2a1 1 0 001-1V4a1 1 0 00-1-1h-2z" />
              </svg>
              {t.home.goToBoard}
            </Link>
            <button 
              className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-lg 
                font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300
                border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              {t.home.learnMore}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-20">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-100 dark:border-gray-700 
            shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 
              rounded-2xl flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-600 dark:text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
              {t.home.features.teamManagement.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {t.home.features.teamManagement.description}
            </p>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-100 dark:border-gray-700 
            shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 
              rounded-2xl flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-green-600 dark:text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
              {t.home.features.taskTracking.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {t.home.features.taskTracking.description}
            </p>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-100 dark:border-gray-700 
            shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="w-14 h-14 bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900 dark:to-amber-800 
              rounded-2xl flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-amber-600 dark:text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
              {t.home.features.statistics.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {t.home.features.statistics.description}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
} 