'use client';

import { useState, useEffect, useCallback, memo } from 'react';
import { Task, ColumnType } from '../../types';
import { useBoardContext } from '../../context/BoardContext';
import { useLanguage } from '../../context/LanguageContext';
import { ConfirmDialog } from '../common/ConfirmDialog';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task?: Task; // Düzenleme için mevcut task
}

interface FormData {
  title: string;
  description: string;
  assigneeId: string;
  storyPoints: number;
  startDate: string;
  endDate: string;
  status: ColumnType;
}

// FormField bileşenini memo ile sarmalayalım
const FormField = memo(({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) => (
  <div>
    <label className="block text-sm font-medium text-jira-text-primary-light dark:text-jira-text-primary-dark mb-1">
      {label}
    </label>
    {children}
    {error && (
      <p className="mt-1 text-sm text-jira-status-error animate-slide-down">
        {error}
      </p>
    )}
  </div>
));

FormField.displayName = 'FormField';

export function TaskModal({ isOpen, onClose, task }: TaskModalProps) {
  const { users, addTask, updateTask, deleteTask } = useBoardContext();
  const { t } = useLanguage();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState<FormData>(() => ({
    title: task?.title || '',
    description: task?.description || '',
    assigneeId: task?.assignee?.id || '',
    storyPoints: task?.storyPoints || 0,
    startDate: task?.startDate || '',
    endDate: task?.endDate || '',
    status: task?.status || 'OPEN'
  }));

  // Modal açıldığında form verilerini güncelle
  useEffect(() => {
    if (isOpen) {
      setFormData({
        title: task?.title || '',
        description: task?.description || '',
        assigneeId: task?.assignee?.id || '',
        storyPoints: task?.storyPoints || 0,
        startDate: task?.startDate || '',
        endDate: task?.endDate || '',
        status: task?.status || 'OPEN'
      });
      setErrors({});
    }
  }, [isOpen, task]);

  const handleChange = useCallback((field: keyof FormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Hata varsa temizle
    setErrors(prev => {
      if (!prev[field]) return prev;
      const { [field]: _, ...rest } = prev;
      return rest;
    });
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Başlık zorunludur';
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Başlık en az 3 karakter olmalıdır';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Açıklama zorunludur';
    }
    
    if (isNaN(formData.storyPoints) || formData.storyPoints < 0) {
      newErrors.storyPoints = 'Story point 0 veya daha büyük olmalıdır';
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Başlangıç tarihi zorunludur';
    }

    if (!formData.endDate) {
      newErrors.endDate = 'Bitiş tarihi zorunludur';
    }

    if (formData.startDate && formData.endDate && new Date(formData.startDate) > new Date(formData.endDate)) {
      newErrors.endDate = 'Bitiş tarihi başlangıç tarihinden önce olamaz';
    }

    if (!formData.assigneeId) {
      newErrors.assigneeId = 'Lütfen bir kullanıcı seçin';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!validateForm()) {
      return;
    }

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      const assignee = users.find(user => user.id === formData.assigneeId) || null;

      if (task) {
        await updateTask({
          ...task,
          ...formData,
          assignee
        });
      } else {
        await addTask({
          ...formData,
          assignee
        });
      }
      
      onClose();
    } catch (error) {
      console.error('Form submit error:', error);
      setErrors(prev => ({ ...prev, submit: 'Bir hata oluştu. Lütfen tekrar deneyin.' }));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Silme işlemi için handleDelete fonksiyonu
  const handleDelete = () => {
    if (task) {
      deleteTask(task.id);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-jira-backdrop-dark flex items-center justify-center p-4 z-50 animate-fade-in">
        <div className="bg-jira-bg-card-light dark:bg-jira-bg-card-dark rounded-lg 
          p-6 w-full max-w-2xl shadow-jira-lg dark:shadow-jira-dark-lg 
          border border-jira-border-light dark:border-jira-border-dark
          animate-slide-up">
          
          <h2 className="text-[16px] font-medium text-jira-text-primary-light dark:text-jira-text-primary-dark mb-6">
            {task ? t.common.edit : t.common.new}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <FormField label={t.task.title} error={errors.title}>
              <input
                type="text"
                value={formData.title}
                onChange={e => handleChange('title', e.target.value)}
                className={`
                  w-full px-3 py-2 bg-jira-bg-card-light dark:bg-jira-bg-card-dark rounded-lg 
                  border border-jira-border-light dark:border-jira-border-dark 
                  text-jira-text-primary-light dark:text-jira-text-primary-dark 
                  placeholder-jira-text-secondary-light dark:placeholder-jira-text-secondary-dark
                  focus:border-jira-primary-light focus:ring-1 focus:ring-jira-primary-light/20 
                  transition-colors
                  ${errors.title ? 'border-jira-status-error ring-1 ring-jira-status-error' : ''}
                `}
                required
                autoFocus
              />
            </FormField>

            <FormField label={t.task.description} error={errors.description}>
              <textarea
                value={formData.description}
                onChange={e => handleChange('description', e.target.value)}
                className="w-full px-3 py-2 bg-jira-bg-card-light dark:bg-jira-bg-card-dark rounded-lg 
                  border border-jira-border-light dark:border-jira-border-dark 
                  text-jira-text-primary-light dark:text-jira-text-primary-dark 
                  placeholder-jira-text-secondary-light dark:placeholder-jira-text-secondary-dark
                  focus:border-jira-primary-light focus:ring-1 focus:ring-jira-primary-light/20 
                  transition-colors"
                rows={3}
              />
            </FormField>

            <FormField label={t.task.assignee} error={errors.assigneeId}>
              <select
                value={formData.assigneeId}
                onChange={e => handleChange('assigneeId', e.target.value)}
                className="w-full px-3 py-2 bg-jira-bg-card-light dark:bg-jira-bg-card-dark rounded-lg 
                  border border-jira-border-light dark:border-jira-border-dark 
                  text-jira-text-primary-light dark:text-jira-text-primary-dark 
                  placeholder-jira-text-secondary-light dark:placeholder-jira-text-secondary-dark
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
            </FormField>

            <FormField label={t.board.storyPoints} error={errors.storyPoints}>
              <input
                type="number"
                value={formData.storyPoints}
                onChange={e => handleChange('storyPoints', Number(e.target.value))}
                className="w-full px-3 py-2 bg-jira-bg-card-light dark:bg-jira-bg-card-dark rounded-lg 
                  border border-jira-border-light dark:border-jira-border-dark 
                  text-jira-text-primary-light dark:text-jira-text-primary-dark 
                  placeholder-jira-text-secondary-light dark:placeholder-jira-text-secondary-dark
                  focus:border-jira-primary-light focus:ring-1 focus:ring-jira-primary-light/20 
                  transition-colors"
                min={0}
              />
            </FormField>

            <div className="grid grid-cols-2 gap-4">
              <FormField label={t.task.startDate} error={errors.startDate}>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={e => handleChange('startDate', e.target.value)}
                  className="w-full px-3 py-2 bg-jira-bg-card-light dark:bg-jira-bg-card-dark rounded-lg 
                    border border-jira-border-light dark:border-jira-border-dark 
                    text-jira-text-primary-light dark:text-jira-text-primary-dark 
                    placeholder-jira-text-secondary-light dark:placeholder-jira-text-secondary-dark
                    focus:border-jira-primary-light focus:ring-1 focus:ring-jira-primary-light/20 
                    transition-colors"
                />
              </FormField>
              <FormField label={t.task.endDate} error={errors.endDate}>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={e => handleChange('endDate', e.target.value)}
                  className="w-full px-3 py-2 bg-jira-bg-card-light dark:bg-jira-bg-card-dark rounded-lg 
                    border border-jira-border-light dark:border-jira-border-dark 
                    text-jira-text-primary-light dark:text-jira-text-primary-dark 
                    placeholder-jira-text-secondary-light dark:placeholder-jira-text-secondary-dark
                    focus:border-jira-primary-light focus:ring-1 focus:ring-jira-primary-light/20 
                    transition-colors"
                />
              </FormField>
            </div>

            <FormField label={t.task.status} error={errors.status}>
              <select
                value={formData.status}
                onChange={e => handleChange('status', e.target.value as ColumnType)}
                className="w-full px-3 py-2 bg-jira-bg-card-light dark:bg-jira-bg-card-dark rounded-lg 
                  border border-jira-border-light dark:border-jira-border-dark 
                  text-jira-text-primary-light dark:text-jira-text-primary-dark 
                  placeholder-jira-text-secondary-light dark:placeholder-jira-text-secondary-dark
                  focus:border-jira-primary-light focus:ring-1 focus:ring-jira-primary-light/20 
                  transition-colors appearance-none cursor-pointer"
              >
                <option value="OPEN">{t.columnTitles.OPEN}</option>
                <option value="IN_PROGRESS">{t.columnTitles.IN_PROGRESS}</option>
                <option value="IN_REVIEW">{t.columnTitles.IN_REVIEW}</option>
                <option value="DONE">{t.columnTitles.DONE}</option>
              </select>
            </FormField>

            <div className="flex justify-between gap-2 mt-6 pt-4 border-t border-light dark:border-dark">
              {task && (
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="px-4 py-2 text-sm font-medium text-jira-status-error hover:bg-jira-status-error/10 rounded transition-colors"
                >
                  {t.common.delete}
                </button>
              )}
              <div className="flex gap-2 ml-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-jira-text-secondary hover:bg-jira-bg-hover dark:text-jira-text-dark dark:hover:bg-jira-bg-dark-hover rounded transition-colors"
                >
                  {t.common.cancel}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`
                    px-4 py-2 bg-jira-primary text-white text-sm font-medium rounded 
                    hover:bg-jira-primary-hover transition-colors
                    ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                >
                  {isSubmitting ? 'İşleniyor...' : (task ? t.common.update : t.common.create)}
                </button>
              </div>
            </div>
          </form>
          {errors.submit && (
            <p className="mt-4 text-sm text-jira-status-error animate-slide-down">
              {errors.submit}
            </p>
          )}
        </div>
      </div>

      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
        title="Görevi Sil"
        message="Bu görevi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz."
      />
    </>
  );
} 