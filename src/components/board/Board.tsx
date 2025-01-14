'use client';

import { useState, useMemo, useEffect } from 'react';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import { useBoardContext } from '../../context/BoardContext';
import { Column } from './Column';
import { ColumnType } from '../../types';
import { TaskModal } from '../modals/TaskModal';
import { UserAvatarList } from '../users/UserAvatarList';
import { SearchBar } from '../search/SearchBar';
import { BoardStats } from '../stats/BoardStats';
import { useLanguage } from '../../context/LanguageContext';
import { LanguageSwitch } from '../common/LanguageSwitch';
import { ThemeSwitch } from '../common/ThemeSwitch';
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts';
import KeyboardShortcuts from '../common/KeyboardShortcuts';
import { UserModal } from '../modals/UserModal';
import ExportMenu from '../common/ExportMenu';

export function Board() {
  const { columns: originalColumns, updateTaskStatus } = useBoardContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAssignee, setSelectedAssignee] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const { t } = useLanguage();

  const filteredColumns = useMemo(() => {
    return originalColumns.map(column => ({
      ...column,
      tasks: column.tasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            task.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesAssignee = !selectedAssignee || task.assignee?.id === selectedAssignee;
        return matchesSearch && matchesAssignee;
      })
    }));
  }, [originalColumns, searchTerm, selectedAssignee]);

  const handleDragStart = () => {
    document.body.style.cursor = 'grabbing';
  };

  const handleDragEnd = (result: DropResult) => {
    document.body.style.cursor = 'default';

    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    updateTaskStatus(
      draggableId,
      source.droppableId as ColumnType,
      destination.droppableId as ColumnType
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Keyboard shortcuts
  useKeyboardShortcuts({
    onEscape: () => {
      setIsModalOpen(false);
      setIsUserModalOpen(false);
    },
    onNewTask: () => {
      setIsModalOpen(true);
    },
    onNewUser: () => {
      setIsUserModalOpen(true);
    }
  });

  return (
    <div className="bg-jira-page-light dark:bg-jira-page-dark min-h-screen">
      <div className="border-b border-jira-border-light dark:border-jira-border-dark bg-jira-bg-card-light dark:bg-jira-bg-card-dark shadow-jira-sm dark:shadow-jira-dark-sm">
        <div className="max-w-[1920px] mx-auto px-4 py-3">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
            <div className="flex items-center justify-between lg:justify-start gap-4 lg:gap-6">
              <UserAvatarList />
              <div className="hidden lg:block h-6 w-px bg-jira-border-light dark:bg-jira-border-dark" />
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-3 py-1.5 bg-jira-primary text-white text-sm font-medium rounded-lg 
                  hover:bg-jira-primary-hover transition-colors shadow-jira-sm hover:shadow-jira-md
                  flex items-center gap-2 whitespace-nowrap"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                <span className="hidden sm:inline">{t.board.newTask}</span>
                <span className="sm:hidden">{t.board.addTask}</span>
              </button>
              <ExportMenu />
              <LanguageSwitch />
              <ThemeSwitch />
            </div>

            <div className="flex-1">
              <SearchBar
                onSearch={setSearchTerm}
                onAssigneeFilter={setSelectedAssignee}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1920px] mx-auto p-4 lg:p-6">
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-jira-gradient-start-light to-jira-gradient-end-light 
            dark:from-jira-gradient-start-dark dark:to-jira-gradient-end-dark rounded-lg p-2">
            <BoardStats />
          </div>

          <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
              {filteredColumns.map((column) => (
                <Droppable key={column.id} droppableId={column.title.toUpperCase()}>
                  {(provided, snapshot) => (
                    <div className="relative group">
                      <Column
                        column={column}
                        provided={provided}
                        isLoading={isLoading}
                      />
                      {snapshot.isDraggingOver && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="border-2 border-dashed border-jira-primary-light rounded-lg p-3 
                            bg-jira-overlay-light dark:bg-jira-overlay-dark animate-pulse">
                            <span className="text-jira-primary-light text-sm font-medium">
                              {t.board.dropHere}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </Droppable>
              ))}
            </div>
          </DragDropContext>

          <div className="mt-6">
            <KeyboardShortcuts />
          </div>
        </div>
      </div>

      <TaskModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <UserModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
      />
    </div>
  );
} 