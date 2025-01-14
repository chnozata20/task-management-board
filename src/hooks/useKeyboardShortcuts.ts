import { useEffect } from 'react';

interface UseKeyboardShortcutsProps {
  onEscape?: () => void;
  onNewTask?: () => void;
  onNewUser?: () => void;
}

export function useKeyboardShortcuts({ onEscape, onNewTask, onNewUser }: UseKeyboardShortcutsProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ESC tuşu modalları kapatır
      if (e.key === 'Escape' && onEscape) {
        onEscape();
      }
      
      // N tuşu yeni task oluşturur
      if (e.key === 'n' && (e.ctrlKey || e.metaKey) && onNewTask) {
        e.preventDefault();
        onNewTask();
      }

      // U tuşu yeni kullanıcı oluşturur
      if (e.key === 'u' && (e.ctrlKey || e.metaKey) && onNewUser) {
        e.preventDefault();
        onNewUser();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onEscape, onNewTask, onNewUser]);
} 