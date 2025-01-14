export function LoadingState() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-4 bg-jira-border-light dark:bg-jira-bg-hover-dark rounded-full w-3/4 opacity-70" />
      <div className="h-4 bg-jira-border-light dark:bg-jira-bg-hover-dark rounded-full opacity-70" />
      <div className="h-4 bg-jira-border-light dark:bg-jira-bg-hover-dark rounded-full w-5/6 opacity-70" />
    </div>
  );
} 