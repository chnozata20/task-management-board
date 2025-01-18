'use client';

import { useState } from 'react';
import { Modal } from '@/components/modals/base/Modal';
import { useLanguage } from '@/context/LanguageContext';
import { User } from '@/types';
import { useBoardContext } from '@/context/BoardContext';
import { v4 as uuidv4 } from 'uuid';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: User;
}

export function UserModal({ isOpen, onClose, user }: UserModalProps) {
  const { t } = useLanguage();
  const { addUser, updateUser, deleteUser } = useBoardContext();

  const [name, setName] = useState(user?.name || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const userAvatar = avatar.trim() || `https://robohash.org/${encodeURIComponent(name)}.png`;

    const userData = {
      id: user?.id || uuidv4(),
      name,
      avatar: userAvatar
    };

    if (user) {
      updateUser(userData);
    } else {
      addUser(userData);
    }

    onClose();
  };

  const handleDelete = () => {
    if (user && window.confirm(t.task.deleteConfirm)) {
      deleteUser(user.id);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-jira-text-primary-light dark:text-jira-text-primary-dark">
            İsim
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-jira-bg-card-light dark:bg-jira-bg-card-dark rounded-lg 
              border border-jira-border-light dark:border-jira-border-dark 
              text-jira-text-primary-light dark:text-jira-text-primary-dark 
              focus:border-jira-primary-light focus:ring-1 focus:ring-jira-primary-light/20"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-jira-text-primary-light dark:text-jira-text-primary-dark">
            Avatar URL
          </label>
          <input
            type="url"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-jira-bg-card-light dark:bg-jira-bg-card-dark rounded-lg 
              border border-jira-border-light dark:border-jira-border-dark 
              text-jira-text-primary-light dark:text-jira-text-primary-dark 
              focus:border-jira-primary-light focus:ring-1 focus:ring-jira-primary-light/20"
          />
        </div>

        <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-jira-border-light dark:border-jira-border-dark">
          {user && (
            <button
              type="button"
              onClick={handleDelete}
              className="px-4 py-2 text-sm font-medium text-jira-status-error hover:bg-jira-status-error/10 rounded transition-colors"
            >
              {t.common.delete}
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
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
            {user ? t.common.update : t.common.create}
          </button>
        </div>
      </form>
    </Modal>
  );
} 