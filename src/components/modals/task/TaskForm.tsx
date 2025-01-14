'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Task, Priority, Tag, DEFAULT_TAGS } from '@/types';
import { useBoardContext } from '@/context/BoardContext';

interface TaskFormProps {
  task?: Task;
  onSubmit: (taskData: Omit<Task, 'id'>) => void;
  onDelete?: () => void;
  onCancel: () => void;
}

export function TaskForm({ task, onSubmit, onDelete, onCancel }: TaskFormProps) {
  const { t } = useLanguage();
  const { users } = useBoardContext();

  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [assigneeId, setAssigneeId] = useState(task?.assignee?.id || '');
  const [startDate, setStartDate] = useState(task?.startDate || '');
  const [endDate, setEndDate] = useState(task?.endDate || '');
  const [storyPoints, setStoryPoints] = useState(task?.storyPoints?.toString() || '');
  const [priority, setPriority] = useState<Priority>(task?.priority || 'MEDIUM');
  const [selectedTags, setSelectedTags] = useState<Tag[]>(task?.tags || []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const assignee = users.find(user => user.id === assigneeId) || null;

    onSubmit({
      title,
      description,
      assignee,
      startDate,
      endDate,
      status: task?.status || 'OPEN',
      storyPoints: parseInt(storyPoints) || 0,
      priority,
      tags: selectedTags
    });
  };

  const toggleTag = (tag: Tag) => {
    setSelectedTags(prev => {
      const exists = prev.find(t => t.id === tag.id);
      if (exists) {
        return prev.filter(t => t.id !== tag.id);
      }
      return [...prev, tag];
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-jira-text-primary-light dark:text-jira-text-primary-dark">
          {t.task.title}
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-jira-bg-card-light dark:bg-jira-bg-card-dark rounded-lg 
            border border-jira-border-light dark:border-jira-border-dark 
            text-jira-text-primary-light dark:text-jira-text-primary-dark 
            focus:border-jira-primary-light focus:ring-1 focus:ring-jira-primary-light/20"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-jira-text-primary-light dark:text-jira-text-primary-dark">
          {t.task.description}
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
          value={assigneeId}
          onChange={(e) => setAssigneeId(e.target.value)}
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

      <div>
        <label className="block text-sm font-medium text-jira-text-primary-light dark:text-jira-text-primary-dark">
          Öncelik
        </label>
        <div className="mt-2 space-x-4">
          {(['HIGH', 'MEDIUM', 'LOW'] as Priority[]).map((p) => (
            <label key={p} className="inline-flex items-center">
              <input
                type="radio"
                name="priority"
                value={p}
                checked={priority === p}
                onChange={(e) => setPriority(e.target.value as Priority)}
                className="form-radio text-jira-primary-light"
              />
              <span className="ml-2 text-sm text-jira-text-primary-light dark:text-jira-text-primary-dark">
                {t.tags[p]}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-jira-text-primary-light dark:text-jira-text-primary-dark mb-2">
          Etiketler
        </label>
        <div className="flex flex-wrap gap-2">
          {DEFAULT_TAGS.map((tag) => (
            <button
              key={tag.id}
              type="button"
              onClick={() => toggleTag(tag)}
              className={`
                px-3 py-1 rounded-full text-sm font-medium text-white
                transition-all duration-200 ease-in-out
                ${selectedTags.find(t => t.id === tag.id)
                  ? 'ring-2 ring-offset-2 ring-jira-primary-light'
                  : 'opacity-60 hover:opacity-100'
                }
              `}
              style={{ backgroundColor: tag.color }}
            >
              {t.tags[tag.name]}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-jira-text-primary-light dark:text-jira-text-primary-dark">
          Story Points
        </label>
        <input
          type="number"
          value={storyPoints}
          onChange={(e) => setStoryPoints(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-jira-bg-card-light dark:bg-jira-bg-card-dark rounded-lg 
            border border-jira-border-light dark:border-jira-border-dark 
            text-jira-text-primary-light dark:text-jira-text-primary-dark 
            focus:border-jira-primary-light focus:ring-1 focus:ring-jira-primary-light/20"
          min="0"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-jira-text-primary-light dark:text-jira-text-primary-dark">
          {t.task.startDate}
        </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
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
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-jira-bg-card-light dark:bg-jira-bg-card-dark rounded-lg 
            border border-jira-border-light dark:border-jira-border-dark 
            text-jira-text-primary-light dark:text-jira-text-primary-dark 
            focus:border-jira-primary-light focus:ring-1 focus:ring-jira-primary-light/20"
        />
      </div>

      <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-jira-border-light dark:border-jira-border-dark">
        {task && onDelete && (
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