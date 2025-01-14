'use client';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-jira-backdrop-dark flex items-center justify-center p-4 z-50 animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="bg-jira-bg-card-light dark:bg-jira-bg-card-dark rounded-lg 
        p-6 w-full max-w-2xl shadow-jira-lg dark:shadow-jira-dark-lg 
        border border-jira-border-light dark:border-jira-border-dark
        animate-slide-up"
      >
        {children}
      </div>
    </div>
  );
} 