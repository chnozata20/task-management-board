'use client';

import { Modal } from '@/components/modals/base/Modal';
import { Task } from '@/types';
import { useBoardContext } from '@/context/BoardContext';
import { TaskForm } from '@/components/modals/task/TaskForm';
import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ConfirmDialog } from '@/components/modals/dialogs/ConfirmDialog';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task?: Task;
}

export function TaskModal({ isOpen, onClose, task }: TaskModalProps) {
  const { addTask, updateTask, deleteTask } = useBoardContext();
  const { t } = useLanguage();
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const handleSubmit = (taskData: Omit<Task, 'id'>) => {
    if (task) {
      updateTask({ id: task.id, ...taskData });
    } else {
      addTask({ id: crypto.randomUUID(), ...taskData });
    }
    onClose();
  };

  const handleDelete = () => {
    setIsConfirmDialogOpen(true);
  };

  const confirmDelete = () => {
    if (task) {
      deleteTask(task.id);
      setIsConfirmDialogOpen(false);
      onClose();
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <TaskForm
          task={task}
          onSubmit={handleSubmit}
          onDelete={task ? handleDelete : undefined}
          onCancel={onClose}
        />
      </Modal>

      <ConfirmDialog
        isOpen={isConfirmDialogOpen}
        onClose={() => setIsConfirmDialogOpen(false)}
        onConfirm={confirmDelete}
        title={t.dialog.confirmTitle}
        message={t.task.deleteConfirm}
      />
    </>
  );
} 