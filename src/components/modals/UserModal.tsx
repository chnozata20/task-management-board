'use client';

import { useState } from 'react';
import { User } from '../../types';
import { useBoardContext } from '../../context/BoardContext';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
}

export function UserModal({ isOpen, onClose }: UserModalProps) {
  const { addUser } = useBoardContext();
  const [formData, setFormData] = useState<FormData>({
    name: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newUser: Omit<User, 'id'> = {
      name: formData.name,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=random`
    };
    
    addUser(newUser);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-jira-backdrop-dark flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-jira-bg-card-light dark:bg-jira-bg-card-dark rounded-lg 
        p-6 w-full max-w-md shadow-jira-lg dark:shadow-jira-dark-lg 
        border border-jira-border-light dark:border-jira-border-dark
        animate-slide-up"
      >
        <h2 className="text-[16px] font-medium text-jira-text-primary-light dark:text-jira-text-primary-dark mb-6">
          Yeni Kullanıcı
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-jira-text-primary-light dark:text-jira-text-primary-dark mb-1">
              Ad Soyad
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 bg-jira-bg-card-light dark:bg-jira-bg-card-dark rounded-lg 
                border border-jira-border-light dark:border-jira-border-dark 
                text-jira-text-primary-light dark:text-jira-text-primary-dark 
                placeholder-jira-text-secondary-light dark:placeholder-jira-text-secondary-dark
                focus:border-jira-primary-light focus:ring-1 focus:ring-jira-primary-light/20 
                transition-colors"
              required
            />
          </div>

          <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-jira-border-light dark:border-jira-border-dark">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-jira-text-secondary-light dark:text-jira-text-secondary-dark 
                hover:bg-jira-bg-hover-light dark:hover:bg-jira-bg-hover-dark rounded transition-colors"
            >
              İptal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-jira-primary text-white text-sm font-medium rounded hover:bg-jira-primary-hover transition-colors"
            >
              Ekle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 