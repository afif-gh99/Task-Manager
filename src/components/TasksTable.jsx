import { useNavigate } from "react-router";
import TaskRow from "./TaskRow";

const statusConfig = {
  Pending: {
    label: "Pending",
    nextStatus: "In progress",
    pillClassName:
      "bg-[var(--color-status-pending-bg)] text-[var(--color-status-pending-text)] shadow-[0_10px_28px_rgba(255,217,122,0.35)] hover:brightness-95",
  },
  "In progress": {
    label: "In Progress",
    nextStatus: "Done",
    pillClassName:
      "bg-[var(--color-status-progress-bg)] text-[var(--color-status-progress-text)] shadow-[var(--color-shadow-pill)] hover:brightness-95",
  },
  Done: {
    label: "Done",
    nextStatus: "Pending",
    pillClassName:
      "bg-[var(--color-status-done-bg)] text-[var(--color-status-done-text)] shadow-[0_10px_28px_rgba(79,209,116,0.28)] hover:brightness-95",
  },
};

const defaultStatusMeta = {
  label: "Unknown",
  nextStatus: "Pending",
  pillClassName:
    "bg-[var(--color-surface-muted)] text-[var(--color-text-muted)] shadow-[var(--color-shadow-soft)] hover:brightness-95",
};

const TasksTable = ({
  tasks,
  onDeleteTask,
  onTaskStatusChange,
  updatingTaskId = null,
  deletingTaskId = null,
  isRefreshing = false,
  welcomeMessage = "Welcome back",
}) => {
  const navigate = useNavigate();

  const handleEditTask = (taskId) => {
    navigate(`/tasks/${taskId}/edit`);
  };

  return (
    <section
      className={`animate-fade-up mt-8 overflow-hidden rounded-[34px] border border-(--color-border-strong) bg-(--color-surface-elevated) shadow-(--color-shadow-soft) backdrop-blur-sm transition-all duration-300 ${
        isRefreshing ? "opacity-90" : "opacity-100"
      }`}
    >
      <div className="flex flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between md:px-7">
        <div>
          <p className="mb-1 text-sm font-bold tracking-[0.01em] text-(--color-text-secondary) md:text-xl">
            {welcomeMessage}
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-(--color-text-primary) md:text-4xl">
            My tasks
          </h2>
        </div>

        <button
          type="button"
          onClick={() => navigate("/tasks/create")}
          className="inline-flex h-12 cursor-pointer items-center justify-center gap-3 rounded-[22px] bg-[linear-gradient(180deg,#6f9fff_0%,var(--color-primary)_100%)] px-5 text-sm font-bold text-white shadow-(--color-shadow-pill) transition duration-200 hover:-translate-y-1 hover:brightness-105 md:h-14 md:px-6 md:text-base"
        >
          <span className="text-xl leading-none">+</span>
          Add Task
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-190 border-separate border-spacing-0">
          <thead>
            <tr className="bg-(--color-surface-muted) text-left text-sm text-(--color-text-muted)">
              <th className="px-6 py-4 font-bold md:px-7">Title</th>
              <th className="px-6 py-4 font-bold md:px-7">Description</th>
              <th className="px-6 py-4 font-bold md:px-7">Date</th>
              <th className="px-6 py-4 font-bold md:px-7">Status</th>
              <th className="px-6 py-4 font-bold md:px-7">Action</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((task) => {
              const statusMeta = statusConfig[task.status] ?? defaultStatusMeta;

              return (
                <TaskRow
                  key={task.id}
                  task={task}
                  statusMeta={statusMeta}
                  isUpdating={updatingTaskId === task.id}
                  isDeleting={deletingTaskId === task.id}
                  onEdit={handleEditTask}
                  onDelete={onDeleteTask}
                  onStatusChange={(taskId) =>
                    onTaskStatusChange(taskId, statusMeta.nextStatus)
                  }
                />
              );
            })}
          </tbody>
        </table>

        {tasks.length === 0 && (
          <div className="px-6 py-14 text-center text-base text-(--color-text-secondary)">
            No tasks match your current search.
          </div>
        )}
      </div>
    </section>
  );
};

export default TasksTable;
