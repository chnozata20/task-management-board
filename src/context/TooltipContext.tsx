'use client';

import { createContext, useContext, useState } from 'react';

interface TooltipContextType {
  showTooltips: boolean;
  toggleTooltips: () => void;
}

const TooltipContext = createContext<TooltipContextType | undefined>(undefined);

export function TooltipProvider({ children }: { children: React.ReactNode }) {
  const [showTooltips, setShowTooltips] = useState(true);

  const toggleTooltips = () => {
    setShowTooltips(prev => !prev);
  };

  return (
    <TooltipContext.Provider value={{ showTooltips, toggleTooltips }}>
      {children}
    </TooltipContext.Provider>
  );
}

export function useTooltip() {
  const context = useContext(TooltipContext);
  if (context === undefined) {
    throw new Error('useTooltip must be used within a TooltipProvider');
  }
  return context;
} 