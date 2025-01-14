'use client';

import { Modal } from '@/components/modals/base/Modal';
import { Task } from '@/types';
import { useBoardContext } from '@/context/BoardContext';
import { TaskForm } from '@/components/modals/task/TaskForm';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task?: Task;
}

export function TaskModal({ isOpen, onClose, task }: TaskModalProps) {
  const { addTask, updateTask, deleteTask } = useBoardContext();

  const handleSubmit = (taskData: Omit<Task, 'id'>) => {
    if (task) {
      updateTask({ id: task.id, ...taskData });
    } else {
      addTask({ id: crypto.randomUUID(), ...taskData });
    }
    onClose();
  };

  const handleDelete = () => {
    if (task) {
      deleteTask(task.id);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <TaskForm
        task={task}
        onSubmit={handleSubmit}
        onDelete={task ? handleDelete : undefined}
        onCancel={onClose}
      />
    </Modal>
  );
} 