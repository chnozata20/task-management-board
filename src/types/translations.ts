import type { ColumnType } from '@/types/column';

type TranslationString = string;

export interface CommonTranslations {
  create: string;
  update: string;
  delete: string;
  cancel: string;
  save: string;
  close: string;
  confirm: string;
  allUsers: string;
  search: string;
  filters: string;
}

export interface DialogTranslations {
  confirmTitle: string;
  confirmMessage: string;
}

type ExportTranslations = {
  button: TranslationString;
  json: TranslationString;
  excel: TranslationString;
  pdf: TranslationString;
};

type ShortcutTranslations = {
  title: TranslationString;
  newTask: TranslationString;
  closeModal: TranslationString;
  newUser: TranslationString;
};

type BoardTranslations = {
  newTask: TranslationString;
  addTask: TranslationString;
  dropHere: TranslationString;
  taskCount: TranslationString;
  storyPoints: TranslationString;
  projectStats: TranslationString;
  totalTasks: TranslationString;
  totalPoints: TranslationString;
  progress: TranslationString;
};

type TaskTranslations = {
  title: TranslationString;
  description: TranslationString;
  assignee: TranslationString;
  startDate: TranslationString;
  endDate: TranslationString;
  status: TranslationString;
  deleteConfirm: TranslationString;
  new: TranslationString;
  edit: TranslationString;
  storyPoints: TranslationString;
  priority: {
    title: TranslationString;
    HIGH: TranslationString;
    MEDIUM: TranslationString;
    LOW: TranslationString;
  };
};

type StatusTranslations = {
  open: TranslationString;
  inProgress: TranslationString;
  inReview: TranslationString;
  done: TranslationString;
};

type HomeFeatureTranslations = {
  title: TranslationString;
  description: TranslationString;
};

type HomeTranslations = {
  title: TranslationString;
  description: TranslationString;
  goToBoard: TranslationString;
  learnMore: TranslationString;
  features: {
    teamManagement: HomeFeatureTranslations;
    taskTracking: HomeFeatureTranslations;
    statistics: HomeFeatureTranslations;
  };
};

export interface Translations {
  common: CommonTranslations;
  dialog: DialogTranslations;
  export: ExportTranslations;
  shortcuts: ShortcutTranslations;
  board: BoardTranslations;
  task: TaskTranslations;
  status: StatusTranslations;
  columnTitles: Record<ColumnType, TranslationString>;
  home: HomeTranslations;
  tags: Record<string, TranslationString>;
} 