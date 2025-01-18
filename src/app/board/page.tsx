import { Board } from '@/components/board/Board';
import { BoardProvider } from '@/context/BoardContext';
import { TooltipProvider } from '@/context/TooltipContext';

export default function BoardPage() {
  return (
    <BoardProvider>
      <TooltipProvider>
        <main className="min-h-screen bg-jira-page-light dark:bg-jira-page-dark overflow-x-hidden">
          <Board />
        </main>
      </TooltipProvider>
    </BoardProvider>
  );
} 