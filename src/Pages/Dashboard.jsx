import { useMemo, useState } from "react";
import { useOutletContext } from "react-router";
import Cards from "../components/Cards";
import TasksTable from "../components/TasksTable";
import { fakeTasks } from "../fakeTasks";

const Dashboard = () => {
  const { searchQuery = "" } = useOutletContext() ?? {};
  const [tasks, setTasks] = useState(fakeTasks);
  const [taskPendingDelete, setTaskPendingDelete] = useState(null);

  const normalizedSearchQuery = searchQuery.trim().toLowerCase();

  const filteredTasks = useMemo(() => {
    if (!normalizedSearchQuery) {
      return tasks;
    }

    return tasks.filter((task) =>
      task.title.toLowerCase().includes(normalizedSearchQuery),
    );
  }, [normalizedSearchQuery, tasks]);

  const counts = useMemo(
    () => ({
      total: tasks.length,
      pending: tasks.filter((task) => task.status === "pending").length,
      inProgress: tasks.filter((task) => task.status === "in-progress").length,
      done: tasks.filter((task) => task.status === "done").length,
    }),
    [tasks],
  );

  const handleTaskStatusChange = (taskId, nextStatus) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, status: nextStatus } : task,
      ),
    );
  };

  const handleDeleteTask = (taskId) => {
    const selectedTask = tasks.find((task) => task.id === taskId) ?? null;

    setTaskPendingDelete(selectedTask);
  };

  const confirmDeleteTask = () => {
    if (!taskPendingDelete) {
      return;
    }

    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskPendingDelete.id),
    );

    setTaskPendingDelete(null);
  };

  return (
    <div>
      <Cards counts={counts} />
      <TasksTable
        tasks={filteredTasks}
        onDeleteTask={handleDeleteTask}
        onTaskStatusChange={handleTaskStatusChange}
      />

      {taskPendingDelete && (
        <div className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-[rgba(20,28,58,0.32)] px-4 backdrop-blur-[2px]">
          <div className="w-full max-w-md rounded-[30px] border border-[var(--color-border-strong)] bg-[var(--color-surface-primary)] p-6 shadow-[0_28px_80px_rgba(31,40,88,0.18)]">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[rgba(229,83,83,0.12)] text-2xl text-[#e55353]">
              !
            </div>

            <h3 className="text-2xl font-extrabold text-[var(--color-text-primary)]">
              Delete Task?
            </h3>
            <p className="mt-3 text-base leading-7 text-[var(--color-text-secondary)]">
              Are you sure you want to delete{" "}
              <span className="font-bold text-[var(--color-text-primary)]">
                {taskPendingDelete.title}
              </span>
              ? This is a temporary local delete and will remove it from the
              current dashboard view.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setTaskPendingDelete(null)}
                className="inline-flex h-12 items-center justify-center rounded-[20px] border border-[var(--color-border-strong)] bg-[var(--color-surface-soft)] px-5 text-sm font-semibold text-[var(--color-text-secondary)] transition duration-200 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeleteTask}
                className="inline-flex h-12 items-center justify-center rounded-[20px] bg-[#e55353] px-5 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#d94747]"
              >
                Delete Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
