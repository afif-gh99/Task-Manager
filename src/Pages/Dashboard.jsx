// This page is the main authenticated dashboard.
// It loads tasks and stats directly with axios, keeps task actions in sync
// with the API, and passes that data into the dashboard UI components.
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router";
import { toast } from "react-toastify";
import Cards from "../components/Cards";
import ConfirmModal from "../components/ConfirmModal";
import TasksTable from "../components/TasksTable";

const API_BASE_URL = "/api";

const EMPTY_TASK_STATS = {
  total: 0,
  pending: 0,
  inProgress: 0,
  done: 0,
};

const Dashboard = () => {
  const { searchQuery = "" } = useOutletContext() ?? {};
  // Dashboard state:
  // - tasks/stats hold normalized data used by cards and the table
  // - loading flags control startup and refresh UX
  // - action ids let the table show lightweight pending states per row
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState(EMPTY_TASK_STATS);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [taskPendingDelete, setTaskPendingDelete] = useState(null);
  const [updatingTaskId, setUpdatingTaskId] = useState(null);
  const [deletingTaskId, setDeletingTaskId] = useState(null);

  // Re-fetches dashboard data after deletes or other manual refresh points.
  const loadDashboardData = async () => {
    if (isLoading) {
      setIsLoading(true);
    } else {
      setIsRefreshing(true);
    }
    setErrorMessage("");

    try {
      const token = localStorage.getItem("token");
      const tasksResponse = await axios.get(`${API_BASE_URL}/tasks`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const statsResponse = await axios.get(`${API_BASE_URL}/tasks/stats`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const nextTasks = tasksResponse.data?.data ?? [];
      const nextStats = statsResponse.data?.data ?? EMPTY_TASK_STATS;

      setTasks(nextTasks);
      setStats(nextStats);
    } catch (err) {
      const serverMsg = err.response?.data?.message;

      setTasks([]);
      setStats(EMPTY_TASK_STATS);
      setErrorMessage(serverMsg || "We could not load your dashboard right now.");
      console.log(err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  // Initial dashboard load:
  // this page now owns its own startup requests so the data flow stays local
  // and easier to follow.
  useEffect(() => {
    let isMounted = true;

    const loadDashboardDataOnce = async () => {
      try {
        const token = localStorage.getItem("token");
        const tasksResponse = await axios.get(`${API_BASE_URL}/tasks`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        const statsResponse = await axios.get(`${API_BASE_URL}/tasks/stats`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        const nextTasks = tasksResponse.data?.data ?? [];
        const nextStats = statsResponse.data?.data ?? EMPTY_TASK_STATS;

        if (!isMounted) {
          return;
        }

        setTasks(nextTasks);
        setStats(nextStats);
        setErrorMessage("");
      } catch (err) {
        if (isMounted) {
          const serverMsg = err.response?.data?.message;

          setTasks([]);
          setStats(EMPTY_TASK_STATS);
          setErrorMessage(
            serverMsg || "We could not load your dashboard right now.",
          );
          console.log(err);
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
  }, []);

  const normalizedSearchQuery = searchQuery.trim().toLowerCase();
  const {
    total = 0,
    pending = 0,
    in_progress = 0,
    done = 0,
  } = stats || {};

  // Search only filters the already-loaded tasks in memory.
  const filteredTasks = useMemo(() => {
    if (!normalizedSearchQuery) {
      return tasks;
    }

    return tasks.filter((task) =>
      task.title.toLowerCase().includes(normalizedSearchQuery),
    );
  }, [normalizedSearchQuery, tasks]);

  // Read the stored authenticated user so the task section can greet them.
  const welcomeMessage = useMemo(() => {
    let storedUser = null;

    try {
      storedUser = JSON.parse(localStorage.getItem("user") ?? "null");
    } catch {
      storedUser = null;
    }

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
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${API_BASE_URL}/tasks/${taskId}`,
        {
          ...currentTask,
          status: nextStatus,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        },
      );

      // Keep the row UI immediate, then re-sync the cards from backend stats.
      setTasks((currentTasks) => {
        return currentTasks.map((task) =>
          task.id === taskId ? { ...task, status: nextStatus } : task,
        );
      });
      const statsResponse = await axios.get(`${API_BASE_URL}/tasks/stats`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setStats(statsResponse.data?.data ?? EMPTY_TASK_STATS);

      toast.success(response.data?.message || "Task updated successfully.");
    } catch (err) {
      const serverMsg = err.response?.data?.message;

      toast.error(serverMsg || "We could not update this task right now.");
      console.log(err);
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
      const response = await axios.delete(
        `${API_BASE_URL}/tasks/${taskPendingDelete.id}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        },
      );

      setTaskPendingDelete(null);
      toast.success(response.data?.message || "Task deleted successfully.");
      await loadDashboardData();
    } catch (err) {
      const serverMsg = err.response?.data?.message;

      toast.error(serverMsg || "We could not delete this task right now.");
      console.log(err);
    } finally {
      setDeletingTaskId(null);
    }
  };

  return (
    <div>
      <Cards
        counts={{
          total,
          pending,
          inProgress: in_progress,
          done,
        }}
      />
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
