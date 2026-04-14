// This file is the single source of truth for task statuses.
// It explains how UI-friendly values map to backend values and how
// task/status data should be normalized before rendering or sending requests.
export const TASK_STATUS = {
  PENDING: "pending",
  IN_PROGRESS: "in-progress",
  DONE: "done",
  UNKNOWN: "unknown",
};

export const taskStatusConfig = {
  [TASK_STATUS.PENDING]: {
    uiValue: TASK_STATUS.PENDING,
    apiValue: "Pending",
    label: "Pending",
  },
  [TASK_STATUS.IN_PROGRESS]: {
    uiValue: TASK_STATUS.IN_PROGRESS,
    apiValue: "In progress",
    label: "In Progress",
  },
  [TASK_STATUS.DONE]: {
    uiValue: TASK_STATUS.DONE,
    apiValue: "Done",
    label: "Done",
  },
};

// Builds a backend -> UI lookup table from the shared config above.
const apiToUiTaskStatusMap = Object.values(taskStatusConfig).reduce(
  (accumulator, statusItem) => {
    accumulator[statusItem.apiValue] = statusItem.uiValue;
    return accumulator;
  },
  {},
);

// Builds a UI -> backend lookup table from the same shared config.
const uiToApiTaskStatusMap = Object.values(taskStatusConfig).reduce(
  (accumulator, statusItem) => {
    accumulator[statusItem.uiValue] = statusItem.apiValue;
    return accumulator;
  },
  {},
);

// Accepts either a backend status or a UI status and returns the normalized
// UI value used internally by the app.
export const normalizeTaskStatus = (status) => {
  if (!status || typeof status !== "string") {
    return TASK_STATUS.UNKNOWN;
  }

  const trimmedStatus = status.trim();

  if (uiToApiTaskStatusMap[trimmedStatus]) {
    return trimmedStatus;
  }

  if (apiToUiTaskStatusMap[trimmedStatus]) {
    return apiToUiTaskStatusMap[trimmedStatus];
  }

  const normalizedKey = trimmedStatus.toLowerCase().replace(/[\s_]+/g, "-");

  if (uiToApiTaskStatusMap[normalizedKey]) {
    return normalizedKey;
  }

  return TASK_STATUS.UNKNOWN;
};

// Converts a normalized UI status back into the exact string the API expects.
export const mapTaskStatusToApi = (status) =>
  uiToApiTaskStatusMap[normalizeTaskStatus(status)] ?? status;

// Returns the label we want to show to the user for a given status.
export const getTaskStatusLabel = (status) =>
  taskStatusConfig[normalizeTaskStatus(status)]?.label ?? "Unknown";

// Normalizes one task object after it comes back from the API.
export const normalizeTaskForUi = (task) => {
  if (!task) {
    return task;
  }

  return {
    ...task,
    status: normalizeTaskStatus(task.status),
  };
};

// Normalizes a full task list so counting, filtering, and status display
// all work from the same internal values.
export const normalizeTaskListForUi = (tasks) => {
  if (!Array.isArray(tasks)) {
    return [];
  }

  return tasks.map(normalizeTaskForUi);
};

// Converts a task payload from UI values to backend values before create/update.
export const mapTaskPayloadToApi = (payload) => {
  if (!payload) {
    return payload;
  }

  return {
    ...payload,
    status: mapTaskStatusToApi(payload.status),
  };
};

// Derives dashboard counts directly from normalized tasks.
// This is the safest fallback when backend stats are missing or inconsistent.
export const getTaskCounts = (taskItems) => {
  const normalizedTasks = normalizeTaskListForUi(taskItems);

  return normalizedTasks.reduce(
    (counts, task) => {
      counts.total += 1;

      if (task.status === TASK_STATUS.PENDING) {
        counts.pending += 1;
      }

      if (task.status === TASK_STATUS.IN_PROGRESS) {
        counts.inProgress += 1;
      }

      if (task.status === TASK_STATUS.DONE) {
        counts.done += 1;
      }

      return counts;
    },
    {
      total: 0,
      pending: 0,
      inProgress: 0,
      done: 0,
    },
  );
};

// Reshapes backend stats into a stable object used by the dashboard cards.
// It accepts a few possible backend key formats so the UI stays resilient.
export const normalizeTaskStats = (stats) => {
  if (!stats || typeof stats !== "object") {
    return getTaskCounts([]);
  }

  return {
    total: Number(
      stats.total ?? stats.Total ?? stats.all ?? stats.count ?? 0,
    ),
    pending: Number(stats.pending ?? stats.Pending ?? 0),
    inProgress: Number(
      stats.inProgress ??
        stats.in_progress ??
        stats["In progress"] ??
        0,
    ),
    done: Number(stats.done ?? stats.Done ?? 0),
  };
};
