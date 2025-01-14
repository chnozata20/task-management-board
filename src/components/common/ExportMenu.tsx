import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useBoardContext } from '@/context/BoardContext';

export const ExportMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();
  const { columns } = useBoardContext();

  const handleExportJSON = () => {
    const data = {
      columns,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `task-board-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setIsOpen(false);
  };

  const handleExportExcel = () => {
    // Excel verisi oluştur
    let csvContent = "Column,Task Title,Description,Assignee,Start Date,End Date\n";
    
    columns.forEach(column => {
      column.tasks.forEach(task => {
        const row = [
          column.title,
          task.title,
          task.description,
          task.assignee?.name || '',
          task.startDate || '',
          task.endDate || ''
        ].map(cell => `"${cell}"`).join(',');
        
        csvContent += row + "\n";
      });
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `task-board-export-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setIsOpen(false);
  };

  const handleExportPDF = () => {
    // PDF export işlemi için window.print() kullanacağız
    window.print();
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-1.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 
          text-sm font-medium rounded-lg border border-gray-200 dark:border-gray-700
          hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm
          flex items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        {t.export.button}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg 
          border border-gray-200 dark:border-gray-700 py-1 z-50">
          <button
            onClick={handleExportJSON}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 
              hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
          >
            <span className="w-4 h-4">📄</span>
            {t.export.json}
          </button>
          <button
            onClick={handleExportExcel}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 
              hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
          >
            <span className="w-4 h-4">📊</span>
            {t.export.excel}
          </button>
          <button
            onClick={handleExportPDF}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 
              hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
          >
            <span className="w-4 h-4">📑</span>
            {t.export.pdf}
          </button>
        </div>
      )}
    </div>
  );
}; 