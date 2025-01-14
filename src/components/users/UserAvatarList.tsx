'use client';

import { useState } from 'react';
import { useBoardContext } from '../../context/BoardContext';
import { UserModal } from '../modals/user/UserModal';

export function UserAvatarList() {
  const { users } = useBoardContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex items-center">
        <div className="flex -space-x-2 overflow-hidden">
          {users.map((user) => (
            <div
              key={user.id}
              className="relative group"
              title={user.name}
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="h-8 w-8 rounded-full ring-2 ring-jira-bg-light dark:ring-jira-bg-dark hover:z-10 transition-all"
              />
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 
                bg-jira-text-primary dark:bg-jira-bg-dark-hover text-white text-xs rounded 
                shadow-jira-sm opacity-0 invisible group-hover:opacity-100 
                group-hover:visible transition-all whitespace-nowrap"
              >
                {user.name}
              </div>
            </div>
          ))}
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="ml-2 h-8 w-8 rounded-full 
            bg-jira-bg-hover dark:bg-jira-bg-dark-hover 
            hover:bg-jira-border-light dark:hover:bg-jira-border-dark 
            text-jira-text-secondary dark:text-jira-text-dark 
            flex items-center justify-center transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      <UserModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
} 