'use client';

import { DroppableProvided } from '@hello-pangea/dnd';
import { Column as ColumnInterface } from '@/types';
import { Task } from './Task';
import { useLanguage } from '@/context/LanguageContext';
import { LoadingState } from '../common/LoadingState';
import { Tooltip } from '../common/Tooltip';

interface ColumnProps {
  column: ColumnInterface;
  provided: DroppableProvided;
  isLoading?: boolean;
}

export function Column({ column, provided, isLoading = false }: ColumnProps) {
  const { t } = useLanguage();

  return (
    <div
      ref={provided.innerRef}
      {...provided.droppableProps}
      className="bg-jira-bg-card-light dark:bg-jira-bg-card-dark rounded-lg 
        shadow-jira-sm dark:shadow-jira-dark-sm 
        border border-jira-border-light dark:border-jira-border-dark 
        min-h-[500px] flex flex-col group/column 
        transition-all duration-200 ease-in-out
        hover:shadow-jira-md dark:hover:shadow-jira-dark-md
        animate-fade-in"
    >
      <div className="p-3 border-b border-jira-border-light dark:border-jira-border-dark 
        bg-gradient-to-r from-jira-gradient-start-light to-jira-gradient-end-light 
        dark:from-jira-gradient-start-dark dark:to-jira-gradient-end-dark">
        <div className="flex items-center justify-between">
          <h2 className="text-jira-text-primary-light dark:text-jira-text-primary-dark text-[15px] font-medium flex items-center gap-2">
            {t.columnTitles[column.title]}
            <Tooltip text={`${column.tasks.length} görev`}>
              <span className="text-sm font-normal text-jira-text-secondary-light dark:text-jira-text-secondary-dark 
                px-2 py-0.5 rounded-full bg-jira-bg-hover-light dark:bg-jira-bg-hover-dark">
                {column.tasks.length}
              </span>
            </Tooltip>
          </h2>
          <div className="opacity-0 group-hover/column:opacity-100 transition-opacity">
            <Tooltip text="Kolon ayarları">
              <button className="p-1 hover:bg-jira-bg-hover-light dark:hover:bg-jira-bg-hover-dark rounded">
                <svg xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 text-jira-text-secondary-light dark:text-jira-text-secondary-dark" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
      
      <div className="p-2 flex-1 space-y-2 bg-jira-overlay-light dark:bg-jira-overlay-dark">
        {isLoading ? (
          <div className="p-3">
            <LoadingState />
          </div>
        ) : (
          <>
            {column.tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </>
        )}
      </div>
    </div>
  );
} 