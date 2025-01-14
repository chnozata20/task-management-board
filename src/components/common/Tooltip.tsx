interface TooltipProps {
  children: React.ReactNode;
  text: string;
}

export function Tooltip({ children, text }: TooltipProps) {
  return (
    <div className="group relative">
      {children}
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 
        opacity-0 group-hover:opacity-100 transition-opacity
        px-2 py-1 rounded bg-jira-bg-card-dark text-white text-xs
        whitespace-nowrap pointer-events-none z-50"
      >
        {text}
      </div>
    </div>
  );
} 