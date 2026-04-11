import { useNavigate } from "react-router";
import TaskRow from "./TaskRow";

const statusConfig = {
  pending: {
    label: "Pending",
    nextStatus: "in-progress",
    pillClassName:
      "bg-[var(--color-status-pending-bg)] text-[var(--color-status-pending-text)] shadow-[0_10px_28px_rgba(255,217,122,0.35)] hover:brightness-95",
  },
  "in-progress": {
    label: "In Progress",
    nextStatus: "done",
    pillClassName:
      "bg-[var(--color-status-progress-bg)] text-[var(--color-status-progress-text)] shadow-[var(--color-shadow-pill)] hover:brightness-95",
  },
  done: {
    label: "Done",
    nextStatus: "pending",
    pillClassName:
      "bg-[var(--color-status-done-bg)] text-[var(--color-status-done-text)] shadow-[0_10px_28px_rgba(79,209,116,0.28)] hover:brightness-95",
  },
};

const TasksTable = ({
  tasks,
  onDeleteTask,
  onTaskStatusChange,
}) => {
  const navigate = useNavigate();

  const handleEditTask = (taskId) => {
    navigate(`/tasks/${taskId}/edit`);
  };

  return (
    <section className="animate-fade-up mt-8 overflow-hidden rounded-[34px] border border-[var(--color-border-strong)] bg-[var(--color-surface-elevated)] shadow-[var(--color-shadow-soft)] backdrop-blur-sm transition-all duration-300">
      <div className="flex flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between md:px-7">
        <div>
          <h2 className="text-4xl font-extrabold tracking-tight text-[var(--color-text-primary)] md:text-[3rem]">
            My tasks
          </h2>
        </div>

        <button
          type="button"
          onClick={() => navigate("/tasks/create")}
          className="inline-flex h-14 cursor-pointer items-center justify-center gap-3 rounded-[22px] bg-[linear-gradient(180deg,#6f9fff_0%,var(--color-primary)_100%)] px-6 text-base font-bold text-white shadow-[var(--color-shadow-pill)] transition duration-200 hover:-translate-y-1 hover:brightness-105"
        >
          <span className="text-xl leading-none">+</span>
          Add Task
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-separate border-spacing-0">
          <thead>
            <tr className="bg-[var(--color-surface-muted)] text-left text-sm text-[var(--color-text-muted)]">
              <th className="px-6 py-4 font-bold md:px-7">Title</th>
              <th className="px-6 py-4 font-bold md:px-7">Description</th>
              <th className="px-6 py-4 font-bold md:px-7">Date</th>
              <th className="px-6 py-4 font-bold md:px-7">Status</th>
              <th className="px-6 py-4 font-bold md:px-7">Action</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((task) => (
              <TaskRow
                key={task.id}
                task={task}
                statusMeta={statusConfig[task.status]}
                onEdit={handleEditTask}
                onDelete={onDeleteTask}
                onStatusChange={(taskId) =>
                  onTaskStatusChange(taskId, statusConfig[task.status].nextStatus)
                }
              />
            ))}
          </tbody>
        </table>

        {tasks.length === 0 && (
          <div className="px-6 py-14 text-center text-base text-[var(--color-text-secondary)]">
            No tasks match your current search.
          </div>
        )}
      </div>
    </section>
  );
};

export default TasksTable;
