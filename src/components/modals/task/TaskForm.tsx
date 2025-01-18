'use client';

import { useLanguage } from '@/context/LanguageContext';
import { Task, Priority, DEFAULT_TAGS } from '@/types';
import { useBoardContext } from '@/context/BoardContext';
import { useState } from 'react';

interface TaskFormProps {
  task?: Task;
  onSubmit: (task: Omit<Task, 'id'>) => void;
  onDelete?: () => void;
  onCancel: () => void;
}

export function TaskForm({ task, onSubmit, onDelete, onCancel }: TaskFormProps) {
  const { t } = useLanguage();
  const { users } = useBoardContext();
  const [selectedPriority, setSelectedPriority] = useState<Priority>(task?.priority || 'MEDIUM');
  const [selectedTags, setSelectedTags] = useState<string[]>(task?.tags?.map(t => t.name) || []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const assigneeId = formData.get('assignee') as string;
    const startDate = formData.get('startDate');
    const endDate = formData.get('endDate');

    const taskData: Omit<Task, 'id'> = {
      title: formData.get('title') as string,
      description: (formData.get('description') as string) || '',
      assignee: assigneeId ? users.find(u => u.id === assigneeId) || null : null,
      startDate: startDate ? String(startDate) : '',
      endDate: endDate ? String(endDate) : '',
      storyPoints: Number(formData.get('storyPoints')),
      priority: selectedPriority,
      tags: selectedTags.map(tagName => DEFAULT_TAGS.find(t => t.name === tagName)!),
      status: task?.status || 'OPEN'
    };

    onSubmit(taskData);
  };

  const handlePriorityChange = (priority: Priority) => {
    setSelectedPriority(priority);
  };

  const handleTagToggle = (tagName: string) => {
    setSelectedTags(prev => {
      if (prev.includes(tagName)) {
        return prev.filter(t => t !== tagName);
      }
      return [...prev, tagName];
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold text-jira-text-primary-light dark:text-jira-text-primary-dark">
        {task ? t.task.edit : t.task.new}
      </h2>

      <div>
        <label className="block text-sm font-medium text-jira-text-primary-light dark:text-jira-text-primary-dark">
          {t.task.title}
        </label>
        <input
          type="text"
          name="title"
          defaultValue={task?.title}
          required
          className="mt-1 block w-full px-3 py-2 bg-jira-bg-card-light dark:bg-jira-bg-card-dark rounded-lg 
            border border-jira-border-light dark:border-jira-border-dark 
            text-jira-text-primary-light dark:text-jira-text-primary-dark 
            focus:border-jira-primary-light focus:ring-1 focus:ring-jira-primary-light/20"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-jira-text-primary-light dark:text-jira-text-primary-dark">
          {t.task.description}
        </label>
        <textarea
          name="description"
          defaultValue={task?.description}
          rows={3}
          className="mt-1 block w-full px-3 py-2 bg-jira-bg-card-light dark:bg-jira-bg-card-dark rounded-lg 
            border border-jira-border-light dark:border-jira-border-dark 
            text-jira-text-primary-light dark:text-jira-text-primary-dark 
            focus:border-jira-primary-light focus:ring-1 focus:ring-jira-primary-light/20"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-jira-text-primary-light dark:text-jira-text-primary-dark">
          {t.task.assignee}
        </label>
        <select
          name="assignee"
          defaultValue={task?.assignee?.id}
          className="mt-1 block w-full px-3 py-2 bg-jira-bg-card-light dark:bg-jira-bg-card-dark rounded-lg 
            border border-jira-border-light dark:border-jira-border-dark 
            text-jira-text-primary-light dark:text-jira-text-primary-dark 
            focus:border-jira-primary-light focus:ring-1 focus:ring-jira-primary-light/20"
        >
          <option value="">{t.common.allUsers}</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-jira-text-primary-light dark:text-jira-text-primary-dark">
            {t.task.startDate}
          </label>
          <input
            type="date"
            name="startDate"
            defaultValue={task?.startDate || undefined}
            className="mt-1 block w-full px-3 py-2 bg-jira-bg-card-light dark:bg-jira-bg-card-dark rounded-lg 
              border border-jira-border-light dark:border-jira-border-dark 
              text-jira-text-primary-light dark:text-jira-text-primary-dark 
              focus:border-jira-primary-light focus:ring-1 focus:ring-jira-primary-light/20"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-jira-text-primary-light dark:text-jira-text-primary-dark">
            {t.task.endDate}
          </label>
          <input
            type="date"
            name="endDate"
            defaultValue={task?.endDate || undefined}
            className="mt-1 block w-full px-3 py-2 bg-jira-bg-card-light dark:bg-jira-bg-card-dark rounded-lg 
              border border-jira-border-light dark:border-jira-border-dark 
              text-jira-text-primary-light dark:text-jira-text-primary-dark 
              focus:border-jira-primary-light focus:ring-1 focus:ring-jira-primary-light/20"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-jira-text-primary-light dark:text-jira-text-primary-dark">
          {t.task.storyPoints}
        </label>
        <input
          type="number"
          name="storyPoints"
          defaultValue={task?.storyPoints || 0}
          min={0}
          max={100}
          className="mt-1 block w-full px-3 py-2 bg-jira-bg-card-light dark:bg-jira-bg-card-dark rounded-lg 
            border border-jira-border-light dark:border-jira-border-dark 
            text-jira-text-primary-light dark:text-jira-text-primary-dark 
            focus:border-jira-primary-light focus:ring-1 focus:ring-jira-primary-light/20"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-jira-text-primary-light dark:text-jira-text-primary-dark mb-2">
          {t.task.priority.title}
        </label>
        <div className="flex flex-col gap-2">
          {(['HIGH', 'MEDIUM', 'LOW'] as Priority[]).map((p, index) => (
            <button
              key={p}
              type="button"
              onClick={() => handlePriorityChange(p)}
              className={`
                flex items-center p-2 rounded-lg border cursor-pointer
                ${selectedPriority === p
                  ? 'bg-jira-bg-hover-light dark:bg-jira-bg-hover-dark border-jira-primary-light'
                  : 'border-jira-border-light dark:border-jira-border-dark hover:bg-jira-bg-hover-light dark:hover:bg-jira-bg-hover-dark'
                }
              `}
            >
              <div className="flex items-center gap-3 flex-1">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ 
                    backgroundColor: p === 'HIGH' ? '#ef4444' : p === 'MEDIUM' ? '#eab308' : '#22c55e'
                  }}
                />
                <span className="text-sm text-jira-text-primary-light dark:text-jira-text-primary-dark flex-1">
                  {t.task.priority[p]}
                </span>
                <div className="flex items-center text-jira-text-secondary-light dark:text-jira-text-secondary-dark">
                  {index === 0 && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                  )}
                  {index === 2 && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-jira-text-primary-light dark:text-jira-text-primary-dark mb-2">
          {t.tags.title}
        </label>
        <div className="grid grid-cols-2 gap-2">
          {DEFAULT_TAGS.map((tag) => (
            <button
              key={tag.id}
              type="button"
              onClick={() => handleTagToggle(tag.name)}
              className={`
                flex items-center p-2 rounded-lg border cursor-pointer
                ${selectedTags.includes(tag.name)
                  ? 'bg-jira-bg-hover-light dark:bg-jira-bg-hover-dark border-jira-primary-light'
                  : 'border-jira-border-light dark:border-jira-border-dark hover:bg-jira-bg-hover-light dark:hover:bg-jira-bg-hover-dark'
                }
              `}
            >
              <div className="flex items-center gap-2 w-full">
                <div 
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: tag.color }}
                />
                <span 
                  className="text-sm flex-1 truncate"
                  style={{ 
                    color: tag.color
                  }}
                >
                  {t.tags[tag.name as keyof typeof t.tags]}
                </span>
                {selectedTags.includes(tag.name) && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-jira-primary-light flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-jira-border-light dark:border-jira-border-dark">
        {onDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="px-4 py-2 text-sm font-medium text-jira-status-error hover:bg-jira-status-error/10 rounded transition-colors"
          >
            {t.common.delete}
          </button>
        )}
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-jira-text-secondary-light dark:text-jira-text-secondary-dark 
            hover:bg-jira-bg-hover-light dark:hover:bg-jira-bg-hover-dark rounded transition-colors"
        >
          {t.common.cancel}
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-jira-primary-light text-white text-sm font-medium rounded 
            hover:bg-jira-primary-hover-light transition-colors"
        >
          {task ? t.common.update : t.common.create}
        </button>
      </div>
    </form>
  );
} 