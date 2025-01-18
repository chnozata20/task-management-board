export const en = {
  common: {
    create: "Create",
    update: "Update",
    delete: "Delete",
    cancel: "Cancel",
    save: "Save",
    close: "Close",
    confirm: "Confirm",
    allUsers: "All Users",
    search: "Search tasks...",
    filters: "Filters"
  },
  dialog: {
    confirmTitle: "Are you sure?",
    confirmMessage: "Are you sure you want to perform this action?"
  },
  task: {
    new: "New Task",
    edit: "Edit Task",
    title: "Title",
    description: "Description",
    assignee: "Assignee",
    startDate: "Start Date",
    endDate: "End Date",
    storyPoints: "Story Points",
    deleteConfirm: "Are you sure you want to delete this task?",
    status: "Status",
    priority: {
      title: "Priority",
      HIGH: "High",
      MEDIUM: "Medium",
      LOW: "Low"
    }
  },
  status: {
    open: "Open",
    inProgress: "In Progress",
    inReview: "In Review",
    done: "Done"
  },
  columnTitles: {
    OPEN: "Open",
    IN_PROGRESS: "In Progress",
    IN_REVIEW: "In Review",
    DONE: "Done"
  },
  home: {
    title: "Task Management",
    description: "Manage your tasks easily",
    goToBoard: "Go to Board",
    learnMore: "Learn More",
    features: {
      teamManagement: {
        title: "Team Management",
        description: "Manage your team effectively"
      },
      taskTracking: {
        title: "Task Tracking",
        description: "Track your tasks in real-time"
      },
      statistics: {
        title: "Statistics",
        description: "View detailed project statistics"
      }
    }
  },
  board: {
    dropHere: "Drop here",
    taskCount: "Task Count",
    storyPoints: "Story Points",
    projectStats: "Project Statistics",
    totalTasks: "Total Tasks",
    totalPoints: "Total Points",
    progress: "Progress",
    newTask: "New Task",
    addTask: "Add Task"
  },
  shortcuts: {
    title: "Keyboard Shortcuts",
    newTask: "Create new task",
    newUser: "Create new user",
    closeModal: "Close modal"
  },
  export: {
    button: "Export",
    json: "Export as JSON",
    excel: "Export as Excel",
    pdf: "Export as PDF"
  },
  tooltip: {
    show: "Show Tooltips",
    hide: "Hide Tooltips",
    enabled: "Tooltips Enabled",
    disabled: "Tooltips Disabled"
  },
  tags: {
    title: "Tags",
    Bug: "Bug",
    Feature: "Feature",
    Documentation: "Documentation",
    Enhancement: "Enhancement",
    Design: "Design"
  },
  tour: {
    back: "Back",
    close: "Close",
    finish: "Finish",
    next: "Next",
    skip: "Skip",
    start: "Start Tour",
    steps: {
      board: "Your task board. You can manage all your tasks here.",
      newTask: "Use this button to add a new task. Shortcut: Ctrl/Cmd + N",
      userAvatars: "Your team members appear here. You can add new members or edit existing ones.",
      searchBar: "Search tasks by title or description.",
      columnOpen: "New tasks start in the 'Open' column.",
      columnInProgress: "Tasks being worked on move to the 'In Progress' column.",
      columnInReview: "Completed tasks are moved to 'In Review' for review.",
      columnDone: "Approved tasks are moved to the 'Done' column.",
      tooltipToggle: "Toggle tooltips on/off with this button.",
      themeSwitch: "Change between Dark/Light theme here.",
      languageSwitch: "Change your language preference here.",
      exportMenu: "Export your tasks in different formats.",
      boardStats: "Track task and user statistics here."
    }
  }
} as const; 