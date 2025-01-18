'use client';

import { useState } from 'react';
import { useBoardContext } from '@/context/BoardContext';
import { useLanguage } from '@/context/LanguageContext';
import { Tooltip } from '@/components/common/Tooltip';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  onAssigneeFilter: (userId: string) => void;
}

export function SearchBar({ onSearch, onAssigneeFilter }: SearchBarProps) {
  const { users } = useBoardContext();
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    onSearch(value);
  };

  const handleUserFilter = (userId: string) => {
    setSelectedUser(userId);
    onAssigneeFilter(userId);
  };

  return (
    <div className="relative flex flex-col sm:flex-row gap-3" data-testid="search-bar">
      {/* Arama Çubuğu */}
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-jira-text-secondary-dark" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder={t.common.search}
          className="w-full pl-10 pr-4 py-2 bg-jira-bg-card-light dark:bg-jira-bg-card-dark rounded-lg 
            border border-jira-border-light dark:border-jira-border-dark 
            text-jira-text-primary-light dark:text-jira-text-primary-dark 
            placeholder-jira-text-secondary-light dark:placeholder-jira-text-secondary-dark
            focus:border-jira-primary-light focus:ring-1 focus:ring-jira-primary-light/20 
            transition-colors"
        />
        {searchTerm && (
          <Tooltip text="Aramayı temizle">
            <button
              onClick={() => handleSearch('')}
              className="absolute inset-y-0 right-3 flex items-center text-jira-text-secondary-light 
                dark:text-jira-text-secondary-dark hover:text-jira-text-primary-light 
                dark:hover:text-jira-text-primary-dark"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </Tooltip>
        )}
      </div>

      {/* Filtreler Butonu (Mobil) */}
      <Tooltip text="Filtreleri göster/gizle">
        <button
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          className="sm:hidden px-3 py-2 bg-jira-bg-card-light dark:bg-jira-bg-card-dark rounded-lg 
            border border-jira-border-light dark:border-jira-border-dark
            text-jira-text-primary-light dark:text-jira-text-primary-dark 
            hover:bg-jira-bg-hover-light dark:hover:bg-jira-bg-hover-dark
            transition-colors flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
          </svg>
          {t.common.filters}
        </button>
      </Tooltip>

      {/* Kullanıcı Filtresi (Desktop) */}
      <div className={`
        sm:block
        ${isFiltersOpen ? 'block animate-slide-down' : 'hidden'}
        absolute sm:relative top-full sm:top-auto left-0 sm:left-auto
        w-full sm:w-auto mt-2 sm:mt-0
        z-10 sm:z-auto
      `}>
        <Tooltip text="Kullanıcıya göre filtrele">
          <div className="relative">
            <select
              value={selectedUser}
              onChange={(e) => handleUserFilter(e.target.value)}
              className="w-full sm:w-48 px-3 py-2 bg-jira-bg-card-light dark:bg-jira-bg-card-dark rounded-lg 
                border border-jira-border-light dark:border-jira-border-dark 
                text-jira-text-primary-light dark:text-jira-text-primary-dark 
                focus:border-jira-primary-light focus:ring-1 focus:ring-jira-primary-light/20 
                transition-colors appearance-none cursor-pointer"
            >
              <option value="">{t.common.allUsers}</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-jira-text-secondary-dark">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </Tooltip>
      </div>
    </div>
  );
} 