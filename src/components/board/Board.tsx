'use client';

import { useState, useMemo, useEffect } from 'react';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import { useBoardContext } from '@/context/BoardContext';
import { Column as ColumnComponent } from '@/components/board/Column';
import { ColumnType, Task, Column } from '@/types';
import { TaskModal } from '@/components/modals/task/TaskModal';
import { UserAvatarList } from '@/components/users/UserAvatarList';
import { SearchBar } from '@/components/search/SearchBar';
import { BoardStats } from '@/components/board/BoardStats';
import { useLanguage } from '@/context/LanguageContext';
import { LanguageSwitch } from '@/components/common/LanguageSwitch';
import { ThemeSwitch } from '@/components/common/ThemeSwitch';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { KeyboardShortcuts } from '@/components/common/KeyboardShortcuts';
import { UserModal } from '@/components/modals/user/UserModal';
import { ExportMenu } from '@/components/common/ExportMenu';
import { TooltipToggle } from '@/components/common/TooltipToggle';

export function Board() {
  const { columns: originalColumns, updateTaskStatus } = useBoardContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAssignee, setSelectedAssignee] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const { t } = useLanguage();

  const filteredColumns = useMemo(() => {
    return originalColumns.map((column: Column) => ({
      ...column,
      tasks: column.tasks.filter((task: Task) => {
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
        <div className="px-2 sm:px-4 py-3">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-4">
              <UserAvatarList />
              <div className="flex items-center gap-2 sm:gap-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-2 sm:px-3 py-1.5 bg-jira-primary text-white text-sm font-medium rounded-lg 
                    hover:bg-jira-primary-hover transition-colors shadow-jira-sm hover:shadow-jira-md
                    flex items-center gap-2 whitespace-nowrap"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  <span className="hidden sm:inline">{t.board.newTask}</span>
                  <span className="sm:hidden">{t.board.addTask}</span>
                </button>
                <div className="flex items-center gap-2">
                  <ExportMenu />
                  <LanguageSwitch />
                  <ThemeSwitch />
                  <TooltipToggle />
                </div>
              </div>
            </div>
            
            <div className="w-full">
              <SearchBar
                onSearch={setSearchTerm}
                onAssigneeFilter={setSelectedAssignee}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="p-2 sm:p-4 lg:p-6">
        <div className="space-y-6">
          <div className="from-jira-gradient-start-light to-jira-gradient-end-light 
            dark:from-jira-gradient-start-dark dark:to-jira-gradient-end-dark rounded-lg">
            <BoardStats />
          </div>

          <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2 sm:gap-4 lg:gap-6">
              {filteredColumns.map((column) => (
                <Droppable key={column.id} droppableId={column.title.toUpperCase()}>
                  {(provided, snapshot) => (
                    <div className="relative group">
                      <ColumnComponent
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