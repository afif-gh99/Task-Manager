import { useNavigate } from "react-router";
import { FiInbox, FiPlus } from "react-icons/fi";
import TaskRow from "./TaskRow";

const statusConfig = {
  pending: {
    label: "Pending",
    nextStatus: "in-progress",
    nextLabel: "In Progress",
    accent: "#e0ab15",
    text: "var(--status-pending-text)",
    surface: "var(--status-pending-chip-surface)",
    border: "var(--status-pending-chip-border)",
    glow: "var(--status-pending-chip-glow)",
  },
  "in-progress": {
    label: "In Progress",
    nextStatus: "done",
    nextLabel: "Done",
    accent: "var(--brand-primary-500)",
    text: "var(--status-progress-text)",
    surface: "var(--status-progress-chip-surface)",
    border: "var(--status-progress-chip-border)",
    glow: "var(--status-progress-chip-glow)",
  },
  done: {
    label: "Done",
    nextStatus: "pending",
    nextLabel: "Pending",
    accent: "var(--brand-accent-emerald-500)",
    text: "var(--status-done-text)",
    surface: "var(--status-done-chip-surface)",
    border: "var(--status-done-chip-border)",
    glow: "var(--status-done-chip-glow)",
  },
};

const TasksTable = ({ tasks, onDeleteTask, onTaskStatusChange }) => {
  const navigate = useNavigate();
  const visibleTasksLabel =
    tasks.length === 1 ? "1 task" : `${tasks.length} tasks`;

  const handleEditTask = (taskId) => {
    navigate(`/tasks/${taskId}/edit`);
  };

  return (
    <section className="premium-panel overflow-hidden rounded-[34px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-6%] top-[-12%] h-36 w-36 rounded-full bg-[radial-gradient(circle,rgba(124,160,255,0.14)_0%,transparent_72%)] blur-[64px]"
      />

      <div className="relative z-10 border-b border-[rgba(214,225,244,0.72)] px-4 py-5 sm:px-5 lg:px-6 lg:py-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-2xl">
            <div className="ui-glass-chip inline-flex items-center gap-2 rounded-full px-4 py-2 text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[var(--text-secondary)]">
              <span className="h-2 w-2 rounded-full bg-[var(--brand-primary-500)]" />
              Task Board
            </div>

            <h2 className="mt-4 text-[2rem] font-black tracking-[-0.05em] text-[var(--text-strong)] sm:text-[2.35rem]">
              My tasks
            </h2>

            <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)] sm:text-base">
              Track work and keep it moving.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="ui-glass-tile rounded-[20px] px-4 py-2.5">
              <p className="text-[0.68rem] font-black uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
                Visible
              </p>
              <p className="mt-1 text-sm font-semibold text-[var(--text-strong)]">
                {visibleTasksLabel}
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/tasks/create")}
              className="ui-btn-primary min-h-11 cursor-pointer px-5 text-sm md:px-6 md:text-[0.95rem]"
            >
              <FiPlus className="text-lg" />
              Add Task
            </button>
          </div>
        </div>
      </div>

      <div className="relative z-10 px-3 pb-3 pt-3 sm:px-4 sm:pb-4 lg:px-5 lg:pb-5">
        {tasks.length > 0 ? (
          <>
            <div className="hidden md:grid grid-cols-[minmax(0,2.2fr)_minmax(170px,0.9fr)_minmax(175px,0.85fr)_auto] items-center gap-4 px-4 pb-2 text-[0.68rem] font-black uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
              <div>Task</div>
              <div>Timeline</div>
              <div>Status</div>
              <div className="text-right">Actions</div>
            </div>

            <div className="hidden flex-col gap-2.5 md:flex">
              {tasks.map((task) => (
                <TaskRow
                  key={task.id}
                  task={task}
                  variant="desktop"
                  statusMeta={statusConfig[task.status]}
                  onEdit={handleEditTask}
                  onDelete={onDeleteTask}
                  onStatusChange={(taskId) =>
                    onTaskStatusChange(
                      taskId,
                      statusConfig[task.status].nextStatus,
                    )
                  }
                />
              ))}
            </div>

            <div className="flex flex-col gap-3 md:hidden">
              {tasks.map((task) => (
                <TaskRow
                  key={task.id}
                  task={task}
                  variant="mobile"
                  statusMeta={statusConfig[task.status]}
                  onEdit={handleEditTask}
                  onDelete={onDeleteTask}
                  onStatusChange={(taskId) =>
                    onTaskStatusChange(
                      taskId,
                      statusConfig[task.status].nextStatus,
                    )
                  }
                />
              ))}
            </div>
          </>
        ) : (
          <div className="flex min-h-[18rem] items-center justify-center px-2 py-6">
            <div className="ui-surface-card max-w-lg rounded-[28px] px-5 py-7 text-center sm:px-7">
              <div className="ui-glass-tile mx-auto flex h-16 w-16 items-center justify-center rounded-[22px] shadow-[var(--shadow-glow-primary)]">
                <FiInbox className="text-[2rem] text-[var(--brand-primary-500)]" />
              </div>

              <h3 className="mt-5 text-[1.65rem] font-black tracking-[-0.04em] text-[var(--text-strong)]">
                No tasks found
              </h3>

              <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                Clear the search or add a task.
              </p>

              <div className="mt-5 flex justify-center">
                <button
                  type="button"
                  onClick={() => navigate("/tasks/create")}
                  className="ui-btn-primary min-h-11 cursor-pointer px-5 text-sm md:px-6 md:text-[0.95rem]"
                >
                  <FiPlus className="text-lg" />
                  Create Task
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TasksTable;
