import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

export const KeyboardShortcuts: React.FC = () => {
  const { t } = useLanguage();

  const shortcuts = [
    {
      key: 'Cmd/Ctrl + N',
      description: t.shortcuts.newTask,
    },
    {
      key: 'Cmd/Ctrl + U',
      description: t.shortcuts.newUser,
    },
    {
      key: 'Esc',
      description: t.shortcuts.closeModal,
    },
  ];

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
        {t.shortcuts.title}
      </h3>
      <div className="space-y-2">
        {shortcuts.map((shortcut, index) => (
          <div
            key={index}
            className="flex justify-between items-center text-sm"
          >
            <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-gray-700 dark:text-gray-300">
              {shortcut.key}
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              {shortcut.description}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}; 