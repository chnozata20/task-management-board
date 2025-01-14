import type { ColumnType } from '@/types/column';

export interface Translations {
  common: {
    search: string;
    allUsers: string;
    filters: string;
    new: string;
    edit: string;
    delete: string;
    cancel: string;
    save: string;
    update: string;
    create: string;
  };
  export: {
    button: string;
    json: string;
    excel: string;
    pdf: string;
  };
  shortcuts: {
    title: string;
    newTask: string;
    closeModal: string;
    newUser: string;
  };
  board: {
    newTask: string;
    addTask: string;
    dropHere: string;
    taskCount: string;
    storyPoints: string;
    projectStats: string;
    totalTasks: string;
    totalPoints: string;
    progress: string;
  };
  task: {
    title: string;
    description: string;
    assignee: string;
    startDate: string;
    endDate: string;
    status: string;
    deleteConfirm: string;
  };
  status: {
    open: string;
    inProgress: string;
    inReview: string;
    done: string;
  };
  columnTitles: Record<ColumnType, string>;
  home: {
    title: string;
    description: string;
    goToBoard: string;
    learnMore: string;
    features: {
      teamManagement: {
        title: string;
        description: string;
      };
      taskTracking: {
        title: string;
        description: string;
      };
      statistics: {
        title: string;
        description: string;
      };
    };
  };
  tags: Record<string, string>;
} 