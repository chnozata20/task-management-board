'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import dynamic from 'next/dynamic';
import type { CallBackProps, Step } from 'react-joyride';
import { useLanguage } from './LanguageContext';
import { Translations } from '../types/translations';

// Client-side only import
const Joyride = dynamic(() => import('react-joyride'), { ssr: false });

interface TourContextType {
  startTour: () => void;
  endTour: () => void;
  isActive: boolean;
}

const TourContext = createContext<TourContextType | undefined>(undefined);

const getTourSteps = (t: Translations): Step[] => [
  {
    target: '[data-testid="board-container"]',
    content: t.tour.steps.board,
    placement: 'center',
    disableBeacon: true,
    disableOverlay: false
  },
  {
    target: '[data-testid="new-task-button"]',
    content: t.tour.steps.newTask,
    placement: 'bottom',
    disableBeacon: true,
    disableOverlay: false
  },
  {
    target: '[data-testid="user-avatar-list"]',
    content: t.tour.steps.userAvatars,
    placement: 'bottom',
    disableBeacon: true,
    disableOverlay: false
  },
  {
    target: '[data-testid="search-bar"]',
    content: t.tour.steps.searchBar,
    placement: 'bottom',
    disableBeacon: true,
    disableOverlay: false
  },
  {
    target: '[data-testid="board-column-open"]',
    content: t.tour.steps.columnOpen,
    placement: 'right',
    disableBeacon: true,
    disableOverlay: false
  },
  {
    target: '[data-testid="board-column-in_progress"]',
    content: t.tour.steps.columnInProgress,
    placement: 'bottom',
    disableBeacon: true,
    disableOverlay: false
  },
  {
    target: '[data-testid="board-column-in_review"]',
    content: t.tour.steps.columnInReview,
    placement: 'bottom',
    disableBeacon: true,
    disableOverlay: false
  },
  {
    target: '[data-testid="board-column-done"]',
    content: t.tour.steps.columnDone,
    placement: 'left',
    disableBeacon: true,
    disableOverlay: false
  },
  {
    target: '[data-testid="tooltip-toggle-button"]',
    content: t.tour.steps.tooltipToggle,
    placement: 'bottom',
    disableBeacon: true,
    disableOverlay: false
  },
  {
    target: '[data-testid="theme-switch"]',
    content: t.tour.steps.themeSwitch,
    placement: 'bottom',
    disableBeacon: true,
    disableOverlay: false
  },
  {
    target: '[data-testid="language-switch"]',
    content: t.tour.steps.languageSwitch,
    placement: 'bottom',
    disableBeacon: true,
    disableOverlay: false
  },
  {
    target: '[data-testid="export-menu"]',
    content: t.tour.steps.exportMenu,
    placement: 'bottom',
    disableBeacon: true,
    disableOverlay: false
  },
  {
    target: '[data-testid="board-stats"]',
    content: t.tour.steps.boardStats,
    placement: 'top',
    disableBeacon: true,
    disableOverlay: false
  }
];

export function TourProvider({ children }: { children: ReactNode }) {
  const [isActive, setIsActive] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const { t } = useLanguage();

  const tourSteps = getTourSteps(t);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMounted(true);
      localStorage.removeItem('hasSeenTour');
    }
  }, []);

  // Tour aktif olduğunda body'ye data-tour-is-active attribute'u eklendi
  useEffect(() => {
    if (isActive) {
      document.body.setAttribute('data-tour-is-active', 'true');
      document.querySelector('main')?.setAttribute('data-tour-is-active', 'true');
    } else {
      document.body.removeAttribute('data-tour-is-active');
      document.querySelector('main')?.removeAttribute('data-tour-is-active');
    }
  }, [isActive]);

  const checkElementsExist = () => {
    return tourSteps.every(step => {
      const target = typeof step.target === 'string' ? step.target : '';
      const element = document.querySelector(target);
      return element !== null;
    });
  };

  useEffect(() => {
    if (isMounted) {
      const hasSeenTour = localStorage.getItem('hasSeenTour');
      const checkElements = () => {
        if (checkElementsExist()) {
          setIsReady(true);
          if (!hasSeenTour) {
            setIsActive(true);
          }
          return true;
        }
        return false;
      };

      if (!checkElements()) {
        const interval = setInterval(() => {
          if (checkElements()) {
            clearInterval(interval);
          }
        }, 500);

        setTimeout(() => clearInterval(interval), 10000);

        return () => clearInterval(interval);
      }
    }
  }, [isMounted]);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    if (status === 'finished' || status === 'skipped') {
      setIsActive(false);
      localStorage.setItem('hasSeenTour', 'true');
    }
  };

  const startTour = () => {
    if (isMounted && isReady && checkElementsExist()) {
      localStorage.removeItem('hasSeenTour');
      setIsActive(true);
    } else {
      console.log('Tour cannot start:', { isMounted, isReady, elementsExist: checkElementsExist() });
    }
  };

  const endTour = () => {
    setIsActive(false);
  };

  return (
    <TourContext.Provider value={{ startTour, endTour, isActive }}>
      {isMounted && isReady && (
        <Joyride
          callback={handleJoyrideCallback}
          continuous
          hideCloseButton
          hideBackButton
          showProgress
          showSkipButton
          steps={tourSteps}
          run={isActive}
          disableOverlayClose
          spotlightClicks
          disableScrolling={false}
          scrollToFirstStep={false}
          styles={{
            options: {
              primaryColor: '#0052CC',
              textColor: '#172B4D',
              backgroundColor: '#FFFFFF',
              arrowColor: '#FFFFFF',
              overlayColor: 'rgba(0, 0, 0, 0.75)',
              zIndex: 1000,
            },
            tooltip: {
              backgroundColor: '#FFFFFF',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(9, 30, 66, 0.15)',
              padding: '16px',
              maxWidth: '420px'
            },
            tooltipContainer: {
              textAlign: 'left'
            },
            tooltipTitle: {
              color: '#172B4D',
              fontSize: '16px',
              fontWeight: 600,
              marginBottom: '8px'
            },
            tooltipContent: {
              color: '#42526E',
              fontSize: '14px',
              lineHeight: '20px'
            },
            buttonNext: {
              backgroundColor: '#0052CC',
              borderRadius: '6px',
              color: '#FFFFFF',
              fontSize: '14px',
              padding: '8px 16px',
              fontWeight: 500,
              border: 'none',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.2s ease'
            },
            buttonBack: {
              color: '#42526E',
              fontSize: '14px',
              marginRight: '8px',
              padding: '8px 16px',
              fontWeight: 500,
              transition: 'all 0.2s ease'
            },
            buttonSkip: {
              color: '#42526E',
              fontSize: '14px',
              padding: '8px 16px',
              fontWeight: 500,
              transition: 'all 0.2s ease'
            },
            buttonClose: {
              color: '#42526E',
              transition: 'all 0.2s ease'
            }
          }}
          locale={{
            back: t.tour.back,
            close: t.tour.close,
            last: t.tour.finish,
            next: t.tour.next,
            skip: t.tour.skip,
          }}
        />
      )}
      {children}
    </TourContext.Provider>
  );
}

export function useTour() {
  const context = useContext(TourContext);
  if (context === undefined) {
    throw new Error('useTour must be used within a TourProvider');
  }
  return context;
} 