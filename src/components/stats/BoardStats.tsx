'use client';

import { useState, useEffect } from 'react';
import { useBoardContext } from '../../context/BoardContext';
import { Column } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { LoadingState } from '../common/LoadingState';
import { Tooltip } from '../common/Tooltip';

export function BoardStats() {
  const { columns } = useBoardContext();
  const { t } = useLanguage();

  const getTotalStoryPoints = (column: Column) => {
    return column.tasks.reduce((total, task) => total + task.storyPoints, 0);
  };

  const getTotalTasks = (column: Column) => column.tasks.length;

  const getCompletionPercentage = () => {
    const totalTasks = columns.reduce((total, col) => total + col.tasks.length, 0);
    const doneTasks = columns.find(col => col.title.toUpperCase() === 'DONE')?.tasks.length || 0;
    return totalTasks === 0 ? 0 : Math.round((doneTasks / totalTasks) * 100);
  };

  const getTotalProjectStats = () => {
    const total = columns.reduce((acc, col) => {
      return {
        tasks: acc.tasks + col.tasks.length,
        points: acc.points + getTotalStoryPoints(col)
      };
    }, { tasks: 0, points: 0 });

    return total;
  };

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
              <Tooltip text={`${getTotalTasks(column)} görev`}>
                <span className="text-sm font-normal text-jira-text-secondary-light dark:text-jira-text-secondary-dark">
                  ({getTotalTasks(column)})
                </span>
              </Tooltip>
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-jira-text-secondary-light dark:text-jira-text-secondary-dark text-sm">
                  {t.board.taskCount}
                </span>
                <Tooltip text="Toplam görev sayısı">
                  <span className="text-jira-text-primary-light dark:text-jira-text-primary-dark text-sm font-medium 
                    bg-jira-bg-hover-light dark:bg-jira-bg-hover-dark px-2 py-1 rounded">
                    {getTotalTasks(column)}
                  </span>
                </Tooltip>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-jira-text-secondary-light dark:text-jira-text-secondary-dark text-sm">
                  {t.board.storyPoints}
                </span>
                <Tooltip text="Toplam story point">
                  <span className="text-jira-primary dark:text-jira-primary-light text-sm font-medium 
                    bg-jira-bg-hover-light dark:bg-jira-bg-hover-dark px-2 py-1 rounded">
                    {getTotalStoryPoints(column)}
                  </span>
                </Tooltip>
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
          <Tooltip text="Projedeki toplam görev sayısı">
            <div className="space-y-1">
              <p className="text-jira-text-secondary-light dark:text-jira-text-secondary-dark text-sm">
                {t.board.totalTasks}
              </p>
              <p className="text-xl font-semibold text-jira-text-primary-light dark:text-jira-text-primary-dark">
                {columns.reduce((total, col) => total + getTotalTasks(col), 0)}
              </p>
            </div>
          </Tooltip>

          <Tooltip text="Projedeki toplam story point">
            <div className="space-y-1">
              <p className="text-jira-text-secondary-light dark:text-jira-text-secondary-dark text-sm">
                {t.board.totalPoints}
              </p>
              <p className="text-xl font-semibold text-jira-primary dark:text-jira-primary-light">
                {columns.reduce((total, col) => total + getTotalStoryPoints(col), 0)}
              </p>
            </div>
          </Tooltip>

          <Tooltip text="Projenin tamamlanma yüzdesi">
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
          </Tooltip>
        </div>
      </div>
    </div>
  );
} 