// This page is the main authenticated dashboard.
// It loads tasks and stats, keeps task actions in sync with the API,
// and passes normalized data into the dashboard UI components.
import { useEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router";
import { toast } from "react-toastify";
import Cards from "../components/Cards";
import ConfirmModal from "../components/ConfirmModal";
import TasksTable from "../components/TasksTable";
import {
  getTaskCounts,
  normalizeTaskListForUi,
  normalizeTaskStats,
} from "../constants/taskStatus";
import { getApiErrorMessage } from "../lib/api/getApiErrorMessage";
import { userStorage } from "../lib/auth/tokenStorage";
import { taskService } from "../services/taskService";

const Dashboard = () => {
  const {
    searchQuery = "",
    startupTasks = null,
    startupStats = null,
    startupError = "",
  } = useOutletContext() ?? {};
  // Dashboard state:
  // - tasks/stats hold normalized data used by cards and the table
  // - loading flags control startup and refresh UX
  // - action ids let the table show lightweight pending states per row
  const [tasks, setTasks] = useState(() =>
    normalizeTaskListForUi(startupTasks),
  );
  const [stats, setStats] = useState(() => normalizeTaskStats(startupStats));
  const [isLoading, setIsLoading] = useState(
    !Array.isArray(startupTasks) && !startupError,
  );
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState(startupError);
  const [taskPendingDelete, setTaskPendingDelete] = useState(null);
  const [updatingTaskId, setUpdatingTaskId] = useState(null);
  const [deletingTaskId, setDeletingTaskId] = useState(null);

  // Re-fetches dashboard data after deletes or other manual refresh points.
  const loadDashboardData = async () => {
    if (tasks.length === 0 && !stats) {
      setIsLoading(true);
    } else {
      setIsRefreshing(true);
    }
    setErrorMessage("");

    try {
      const tasksResponse = await taskService.getTasks();
      const statsResponse = await taskService.getStats();
      const nextTasks = normalizeTaskListForUi(tasksResponse?.data);
      const nextStats = normalizeTaskStats(
        statsResponse?.data ?? statsResponse,
      );

      setTasks(nextTasks);
      setStats(nextStats);
    } catch (error) {
      setTasks([]);
      setStats(null);
      setErrorMessage(
        getApiErrorMessage(
          error,
          "We could not load your dashboard right now.",
        ),
      );
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  // Initial data flow:
  // 1. use bootstrapped data if AppEntry already loaded it
  // 2. otherwise fetch tasks and stats here
  useEffect(() => {
    let isMounted = true;

    if (Array.isArray(startupTasks) || startupError) {
      setTasks(normalizeTaskListForUi(startupTasks));
      setStats(normalizeTaskStats(startupStats));
      setErrorMessage(startupError);
      setIsLoading(false);

      return () => {
        isMounted = false;
      };
    }

    const loadDashboardDataOnce = async () => {
      try {
        const tasksResponse = await taskService.getTasks();
        const statsResponse = await taskService.getStats();
        const nextTasks = normalizeTaskListForUi(tasksResponse?.data);
        const nextStats = normalizeTaskStats(
          statsResponse?.data ?? statsResponse,
        );

        if (!isMounted) {
          return;
        }

        setTasks(nextTasks);
        setStats(nextStats);
        setErrorMessage("");
      } catch (error) {
        if (isMounted) {
          setTasks([]);
          setStats(null);
          setErrorMessage(
            getApiErrorMessage(
              error,
              "We could not load your dashboard right now.",
            ),
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadDashboardDataOnce();

    return () => {
      isMounted = false;
    };
  }, [startupError, startupStats, startupTasks]);

  const normalizedSearchQuery = searchQuery.trim().toLowerCase();

  // Search only filters the already-loaded tasks in memory.
  const filteredTasks = useMemo(() => {
    if (!normalizedSearchQuery) {
      return tasks;
    }

    return tasks.filter((task) =>
      task.title.toLowerCase().includes(normalizedSearchQuery),
    );
  }, [normalizedSearchQuery, tasks]);

  // Prefer counts derived from the normalized task list.
  // If the task list is empty, fall back to normalized stats from the API.
  const counts = useMemo(() => {
    const taskCounts = getTaskCounts(tasks);

    if (taskCounts.total > 0) {
      return taskCounts;
    }

    return normalizeTaskStats(stats);
  }, [stats, tasks]);

  // Read the stored authenticated user so the task section can greet them.
  const welcomeMessage = useMemo(() => {
    const storedUser = userStorage.getUser();
    const userName =
      storedUser?.name ?? storedUser?.Name ?? storedUser?.userName ?? "";

    if (!userName || typeof userName !== "string") {
      return "Welcome back";
    }

    return `Welcome back, ${userName}`;
  }, []);

  // Updates one task status, then updates local state so the UI feels immediate.
  const handleTaskStatusChange = async (taskId, nextStatus) => {
    const currentTask = tasks.find((task) => task.id === taskId);

    if (!currentTask) {
      return;
    }

    try {
      setUpdatingTaskId(taskId);
      const response = await taskService.updateTask(taskId, {
        ...currentTask,
        status: nextStatus,
      });

      // Keep tasks and counts in sync after a successful status change.
      setTasks((currentTasks) => {
        const nextTasks = currentTasks.map((task) =>
          task.id === taskId ? { ...task, status: nextStatus } : task,
        );

        setStats(getTaskCounts(nextTasks));

        return nextTasks;
      });

      toast.success(response?.message || "Task updated successfully.");
    } catch (error) {
      toast.error(
        getApiErrorMessage(error, "We could not update this task right now."),
      );
    } finally {
      setUpdatingTaskId(null);
    }
  };

  // Opens the confirmation modal for the selected task.
  const handleDeleteTask = (taskId) => {
    const selectedTask = tasks.find((task) => task.id === taskId) ?? null;

    setTaskPendingDelete(selectedTask);
  };

  // Deletes the selected task, then refreshes the list from the API.
  const confirmDeleteTask = async () => {
    if (!taskPendingDelete) {
      return;
    }

    try {
      setDeletingTaskId(taskPendingDelete.id);
      const response = await taskService.deleteTask(taskPendingDelete.id);

      setTaskPendingDelete(null);
      toast.success(response?.message || "Task deleted successfully.");
      await loadDashboardData();
    } catch (error) {
      toast.error(
        getApiErrorMessage(error, "We could not delete this task right now."),
      );
    } finally {
      setDeletingTaskId(null);
    }
  };

  return (
    <div>
      <Cards counts={counts} />
      {/* Page-level loading is used after the initial app loader is gone. */}
      {isLoading && (
        <div className="mt-8 rounded-[34px] border border-(--color-border-strong) bg-(--color-surface-elevated) px-6 py-8 text-center text-base font-semibold text-(--color-text-secondary) shadow-(--color-shadow-soft)">
          Loading dashboard...
        </div>
      )}

      {!isLoading && errorMessage && (
        <div className="mt-8 rounded-[34px] border border-[rgba(229,83,83,0.24)] bg-[rgba(229,83,83,0.08)] px-6 py-8 text-center text-base font-semibold text-[#cf3f3f] shadow-(--color-shadow-soft)">
          {errorMessage}
        </div>
      )}

      {!isLoading && !errorMessage && (
        <>
          {/* This hidden block is kept only to avoid disturbing the current layout structure. */}
          <div className="hidden">
            <p className="text-base font-semibold text-(--color-text-secondary) md:text-lg">
              {welcomeMessage}
            </p>
          </div>

          <TasksTable
            tasks={filteredTasks}
            onDeleteTask={handleDeleteTask}
            onTaskStatusChange={handleTaskStatusChange}
            updatingTaskId={updatingTaskId}
            deletingTaskId={deletingTaskId}
            isRefreshing={isRefreshing}
            welcomeMessage={welcomeMessage}
          />
        </>
      )}

      {taskPendingDelete && (
        <ConfirmModal
          title="Delete Task?"
          message={
            <>
              Are you sure you want to delete{" "}
              <span className="font-bold text-(--color-text-primary)">
                {taskPendingDelete.title}
              </span>
              ?
            </>
          }
          confirmLabel="Delete Task"
          type="danger"
          onConfirm={confirmDeleteTask}
          onCancel={() => setTaskPendingDelete(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;
