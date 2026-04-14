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

const apiToUiTaskStatusMap = Object.values(taskStatusConfig).reduce(
  (accumulator, statusItem) => {
    accumulator[statusItem.apiValue] = statusItem.uiValue;
    return accumulator;
  },
  {},
);

const uiToApiTaskStatusMap = Object.values(taskStatusConfig).reduce(
  (accumulator, statusItem) => {
    accumulator[statusItem.uiValue] = statusItem.apiValue;
    return accumulator;
  },
  {},
);

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

export const mapTaskStatusToApi = (status) =>
  uiToApiTaskStatusMap[normalizeTaskStatus(status)] ?? status;

export const getTaskStatusLabel = (status) =>
  taskStatusConfig[normalizeTaskStatus(status)]?.label ?? "Unknown";

export const normalizeTaskForUi = (task) => {
  if (!task) {
    return task;
  }

  return {
    ...task,
    status: normalizeTaskStatus(task.status),
  };
};

export const normalizeTaskListForUi = (tasks) => {
  if (!Array.isArray(tasks)) {
    return [];
  }

  return tasks.map(normalizeTaskForUi);
};

export const mapTaskPayloadToApi = (payload) => {
  if (!payload) {
    return payload;
  }

  return {
    ...payload,
    status: mapTaskStatusToApi(payload.status),
  };
};

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
