'use client';

import { Modal } from '../base/Modal';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

export function ConfirmDialog({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message 
}: ConfirmDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        <h3 className="text-lg font-medium text-jira-text-primary-light dark:text-jira-text-primary-dark">
          {title}
        </h3>
        <p className="mt-2 text-jira-text-secondary-light dark:text-jira-text-secondary-dark">
          {message}
        </p>
        <div className="mt-4 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-jira-text-secondary-light dark:text-jira-text-secondary-dark 
              hover:bg-jira-bg-hover-light dark:hover:bg-jira-bg-hover-dark rounded transition-colors"
          >
            İptal
          </button>
          <button 
            onClick={onConfirm}
            className="px-4 py-2 bg-jira-status-error text-white text-sm font-medium rounded 
              hover:bg-jira-status-error-hover transition-colors"
          >
            Onayla
          </button>
        </div>
      </div>
    </Modal>
  );
} 