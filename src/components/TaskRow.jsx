import { FiEdit2, FiTrash2 } from "react-icons/fi";

const formatTaskDate = (dateValue) => {
  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return dateValue;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

const TaskRow = ({ task, statusMeta, onEdit, onDelete, onStatusChange }) => {
  return (
    <tr className="text-(--color-text-primary) transition-colors duration-200 hover:bg-[rgba(237,243,255,0.45)]">
      <td className="border-b border-(--color-border-soft) px-6 py-6 font-medium md:px-7">
        <div className="min-w-40">{task.title}</div>
      </td>

      <td className="border-b border-(--color-border-soft) px-6 py-6 text-(--color-text-secondary) md:px-7">
        <div className="min-w-60">{task.description}</div>
      </td>

      <td className="border-b border-(--color-border-soft) px-6 py-6 text-(--color-text-secondary) md:px-7">
        <div className="min-w-35">{formatTaskDate(task.date)}</div>
      </td>

      <td className="border-b border-(--color-border-soft) px-6 py-6 md:px-7">
        <button
          type="button"
          onClick={() => onStatusChange(task.id)}
          className={`inline-flex min-w-31 cursor-pointer items-center justify-center rounded-full px-4 py-2.5 text-sm font-bold transition duration-200 hover:-translate-y-0.5 ${statusMeta.pillClassName}`}
        >
          {statusMeta.label}
        </button>
      </td>

      <td className="border-b border-(--color-border-soft) px-6 py-6 md:px-7">
        <div className="flex items-center gap-4 text-(--color-text-muted)">
          <button
            type="button"
            onClick={() => onDelete(task.id)}
            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-[18px] border border-(--color-border-soft) bg-(--color-surface-soft) transition duration-200 hover:-translate-y-0.5 hover:border-[rgba(229,83,83,0.35)] hover:bg-[rgba(229,83,83,0.10)] hover:text-[#e55353]"
            aria-label={`Delete ${task.title}`}
          >
            <FiTrash2 className="text-lg" />
          </button>

          <button
            type="button"
            onClick={() => onEdit(task.id)}
            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-[18px] border border-(--color-border-soft) bg-(--color-surface-soft) transition duration-200 hover:-translate-y-0.5 hover:border-(--color-primary) hover:text-(--color-primary)"
            aria-label={`Edit ${task.title}`}
          >
            <FiEdit2 className="text-lg" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TaskRow;
