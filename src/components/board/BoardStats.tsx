'use client';

import { useState, useEffect } from 'react';
import { useBoardContext } from '../../context/BoardContext';
import { useLanguage } from '../../context/LanguageContext';
import { LoadingState } from '../common/LoadingState';
import { Column } from '../../types';

export function BoardStats() {
  const { columns } = useBoardContext();
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);

  const getTotalStoryPoints = (column: Column) => {
    return column.tasks.reduce((total, task) => total + task.storyPoints, 0);
  };

  const getTotalTasks = (column: Column) => column.tasks.length;

  const getCompletionPercentage = () => {
    const totalTasks = columns.reduce((total, col) => total + col.tasks.length, 0);
    const doneTasks = columns.find(col => col.title.toUpperCase() === 'DONE')?.tasks.length || 0;
    return totalTasks === 0 ? 0 : Math.round((doneTasks / totalTasks) * 100);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-jira-bg-card-light dark:bg-jira-bg-card-dark rounded-lg p-4 
              shadow-jira-sm dark:shadow-jira-dark-sm border border-jira-border-light dark:border-jira-border-dark"
            >
              <LoadingState />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {columns.map((column) => (
          <div 
            key={column.id}
            className="bg-jira-bg-card-light dark:bg-jira-bg-card-dark rounded-lg p-4 
              shadow-jira-sm dark:shadow-jira-dark-sm 
              border border-jira-border-light dark:border-jira-border-dark
              animate-fade-in"
          >
            <h3 className="text-[15px] font-medium text-jira-text-primary-light dark:text-jira-text-primary-dark mb-3 flex items-center gap-2">
              {t.columnTitles[column.title as keyof typeof t.columnTitles]}
              <span className="text-sm font-normal text-jira-text-secondary-light dark:text-jira-text-secondary-dark">
                ({getTotalTasks(column)})
              </span>
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-jira-text-secondary-light dark:text-jira-text-secondary-dark text-sm">
                  {t.board.taskCount}
                </span>
                <span className="text-jira-text-primary-light dark:text-jira-text-primary-dark text-sm font-medium 
                  bg-jira-bg-hover-light dark:bg-jira-bg-hover-dark px-2 py-1 rounded">
                  {getTotalTasks(column)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-jira-text-secondary-light dark:text-jira-text-secondary-dark text-sm">
                  {t.board.storyPoints}
                </span>
                <span className="text-jira-primary dark:text-jira-primary-light text-sm font-medium 
                  bg-jira-bg-hover-light dark:bg-jira-bg-hover-dark px-2 py-1 rounded">
                  {getTotalStoryPoints(column)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-jira-bg-card-light dark:bg-jira-bg-card-dark rounded-lg p-5 
        shadow-jira-sm dark:shadow-jira-dark-sm 
        border border-jira-border-light dark:border-jira-border-dark
        animate-slide-up"
      >
        <h3 className="text-[16px] font-medium text-jira-text-primary-light dark:text-jira-text-primary-dark mb-4">
          {t.board.projectStats}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="space-y-1">
            <p className="text-jira-text-secondary-light dark:text-jira-text-secondary-dark text-sm">
              {t.board.totalTasks}
            </p>
            <p className="text-xl font-semibold text-jira-text-primary-light dark:text-jira-text-primary-dark">
              {columns.reduce((total, col) => total + getTotalTasks(col), 0)}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-jira-text-secondary-light dark:text-jira-text-secondary-dark text-sm">
              {t.board.totalPoints}
            </p>
            <p className="text-xl font-semibold text-jira-primary dark:text-jira-primary-light">
              {columns.reduce((total, col) => total + getTotalStoryPoints(col), 0)}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-jira-text-secondary-light dark:text-jira-text-secondary-dark text-sm">
              {t.board.progress}
            </p>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xl font-semibold text-jira-primary dark:text-jira-primary-light">
                  {getCompletionPercentage()}%
                </span>
              </div>
              <div className="overflow-hidden h-2 rounded-full bg-jira-bg-hover-light dark:bg-jira-bg-hover-dark">
                <div
                  className="h-full bg-jira-primary dark:bg-jira-primary-light transition-all duration-500 ease-out"
                  style={{ width: `${getCompletionPercentage()}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 