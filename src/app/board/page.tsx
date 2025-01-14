import { Board } from '@/components/board/Board';
import { BoardProvider } from '@/context/BoardContext';

export default function BoardPage() {
  return (
    <BoardProvider>
      <main className="min-h-screen bg-jira-page-light dark:bg-jira-page-dark">
        <Board />
      </main>
    </BoardProvider>
  );
} 