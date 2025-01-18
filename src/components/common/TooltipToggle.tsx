'use client';

import { useTooltip } from '@/context/TooltipContext';
import { useLanguage } from '@/context/LanguageContext';
import { Tooltip } from './Tooltip';

export function TooltipToggle() {
  const { showTooltips, toggleTooltips } = useTooltip();
  const { t } = useLanguage();

  return (
    <Tooltip text={showTooltips ? t.tooltip.hide : t.tooltip.show}>
      <button
        data-testid="tooltip-toggle-button"
        onClick={toggleTooltips}
        className={`px-2 py-1 text-sm rounded-lg 
          border transition-all duration-200
          ${showTooltips 
            ? 'bg-jira-primary/10 border-jira-primary text-jira-primary' 
            : 'bg-jira-bg-card-light dark:bg-jira-bg-card-dark border-jira-border-light dark:border-jira-border-dark text-jira-text-secondary-light dark:text-jira-text-secondary-dark'
          }
          hover:bg-jira-bg-hover-light dark:hover:bg-jira-bg-hover-dark
          flex items-center gap-2`}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-4 w-4 transition-colors"
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
          />
        </svg>
        <span className="hidden sm:inline text-xs">
          {showTooltips ? t.tooltip.enabled : t.tooltip.disabled}
        </span>
      </button>
    </Tooltip>
  );
} 