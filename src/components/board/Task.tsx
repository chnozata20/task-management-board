'use client';

import { Draggable } from '@hello-pangea/dnd';
import { Task as TaskType } from '@/types';
import { useState } from 'react';
import { TaskModal } from '@/components/modals/task/TaskModal';
import { Tooltip } from '@/components/common/Tooltip';
import { useLanguage } from '@/context/LanguageContext';

interface TaskProps {
  task: TaskType;
  index: number;
}

export function Task({ task, index }: TaskProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { t } = useLanguage();

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditModalOpen(true);
  };

  return (
    <>
      <Draggable draggableId={task.id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`
              bg-jira-bg-card-light dark:bg-jira-bg-card-dark p-3 rounded-lg 
              border border-jira-border-light dark:border-jira-border-dark 
              hover:bg-jira-bg-hover-light dark:hover:bg-jira-bg-hover-dark 
              shadow-jira-sm dark:shadow-jira-dark-sm
              hover:shadow-jira-md dark:hover:shadow-jira-dark-md
              transition-all duration-200 ease-in-out
              group animate-fade-in
              ${snapshot.isDragging ? `
                shadow-jira-lg dark:shadow-jira-dark-lg 
                ring-2 ring-jira-primary-light 
                rotate-[2deg] scale-105
                bg-jira-bg-card-light/95 dark:bg-jira-bg-card-dark/95
              ` : ''}
            `}
            style={{
              ...provided.draggableProps.style,
              cursor: snapshot.isDragging ? 'grabbing' : 'grab'
            }}
          >
            <div className="flex justify-between items-start gap-3">
              <h3 className="text-jira-text-primary-light dark:text-jira-text-primary-dark text-sm font-medium">
                {task.title}
              </h3>
              <div className="flex items-center gap-2">
                <Tooltip text={t.tags[task.priority]}>
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: task.priority === 'HIGH' ? '#ef4444' : task.priority === 'MEDIUM' ? '#eab308' : '#22c55e' }}
                  />
                </Tooltip>
                <button
                  onClick={handleEditClick}
                  className="text-jira-text-secondary-light dark:text-jira-text-secondary-dark opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
              </div>
            </div>

            {task.description && (
              <p className="text-jira-text-secondary-light dark:text-jira-text-secondary-dark text-sm mt-2">
                {task.description}
              </p>
            )}

            {task.tags && task.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {task.tags.map(tag => (
                  <Tooltip key={tag.id} text={t.tags[tag.name]}>
                    <span
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium text-white"
                      style={{ backgroundColor: tag.color }}
                    >
                      {t.tags[tag.name]}
                    </span>
                  </Tooltip>
                ))}
              </div>
            )}

            <div className="mt-3 flex items-center justify-between">
              {task.assignee && (
                <Tooltip text={task.assignee.name}>
                  <img
                    src={task.assignee.avatar}
                    alt={task.assignee.name}
                    className="w-6 h-6 rounded-full ring-2 ring-jira-border-light dark:ring-jira-border-dark"
                  />
                </Tooltip>
              )}
              
              <div className="flex items-center gap-2">
                <Tooltip text={`${task.storyPoints} Story Points`}>
                  <span className="text-xs px-2 py-1 rounded bg-jira-bg-hover-light dark:bg-jira-bg-hover-dark text-jira-primary dark:text-jira-primary-light">
                    {task.storyPoints} SP
                  </span>
                </Tooltip>
                {task.startDate && (
                  <span className="text-xs text-jira-text-secondary-light dark:text-jira-text-secondary-dark">
                    {new Date(task.startDate).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </Draggable>

      <TaskModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        task={task}
      />
    </>
  );
} 