'use client';

import { useTooltip } from '@/context/TooltipContext';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

export function Tooltip({ text, children }: TooltipProps) {
  const { showTooltips } = useTooltip();

  if (!showTooltips) {
    return <div className="relative group">{children}</div>;
  }

  return (
    <div className="relative group">
      {children}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 
        bg-jira-text-primary-light dark:bg-jira-bg-dark-hover text-white text-xs rounded 
        shadow-jira-sm opacity-0 invisible group-hover:opacity-100 
        group-hover:visible transition-all whitespace-nowrap z-50">
        {text}
      </div>
    </div>
  );
} 