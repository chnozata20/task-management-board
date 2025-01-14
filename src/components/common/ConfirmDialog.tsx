import { Modal } from '@/components/modals/base/Modal';
import { useLanguage } from '@/context/LanguageContext';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

export function ConfirmDialog({ isOpen, onClose, onConfirm, title, message }: ConfirmDialogProps) {
  const { t } = useLanguage();
  
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-jira-text-primary-light dark:text-jira-text-primary-dark mb-2">
          {title || t.dialog.confirmTitle}
        </h2>
        <p className="text-jira-text-secondary-light dark:text-jira-text-secondary-dark mb-4">
          {message || t.dialog.confirmMessage}
        </p>
        <div className="flex justify-end gap-2">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-jira-text-secondary-light dark:text-jira-text-secondary-dark 
              hover:bg-jira-bg-hover-light dark:hover:bg-jira-bg-hover-dark rounded transition-colors"
          >
            {t.common.cancel}
          </button>
          <button 
            onClick={onConfirm}
            className="px-4 py-2 bg-jira-status-error text-white text-sm font-medium rounded 
              hover:bg-jira-status-error-hover transition-colors"
          >
            {t.common.confirm}
          </button>
        </div>
      </div>
    </Modal>
  );
} 