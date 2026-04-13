import {
  FiCalendar,
  FiChevronRight,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";

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

const handleKeyboardActivation = (callback) => (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    callback();
  }
};

const getTaskPreview = (description, maxLength) => {
  const normalizedDescription = description.replace(/\s+/g, " ").trim();

  if (normalizedDescription.length <= maxLength) {
    return normalizedDescription;
  }

  return `${normalizedDescription.slice(0, maxLength).trimEnd()}...`;
};

const StatusChip = ({ taskId, statusMeta, onStatusChange }) => (
  <button
    type="button"
    onClick={(event) => {
      event.stopPropagation();
      onStatusChange(taskId);
    }}
    className="inline-flex cursor-pointer items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-semibold shadow-[var(--shadow-xs)] transition-[transform,box-shadow,border-color,filter] duration-200 [transition-timing-function:var(--ease-standard)] hover:-translate-y-0.5 hover:brightness-[1.02] active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
    style={{
      background: `linear-gradient(180deg, color-mix(in srgb, var(--surface-1) 86%, rgba(255, 255, 255, 0.18)) 0%, ${statusMeta.surface} 100%)`,
      borderColor: statusMeta.border,
      color: statusMeta.text,
      boxShadow: `0 10px 24px ${statusMeta.glow}`,
    }}
  >
    <span
      className="h-2.5 w-2.5 rounded-full"
      style={{
        backgroundColor: statusMeta.accent,
        boxShadow: `0 0 14px ${statusMeta.glow}`,
      }}
    />
    <span>{statusMeta.label}</span>
  </button>
);

const ActionButton = ({ label, onClick, tone = "neutral", icon }) => {
  const toneClasses = {
    neutral:
      "ui-icon-button text-[var(--text-secondary)] hover:border-[var(--border-accent)] hover:text-[var(--brand-primary-500)]",
    danger:
      "ui-icon-button text-[var(--text-secondary)] hover:border-[rgba(229,83,83,0.2)] hover:text-[#d95858]",
  };

  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      className={`inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-[14px] transition-[transform,box-shadow,border-color,color] duration-200 [transition-timing-function:var(--ease-standard)] hover:-translate-y-0.5 active:translate-y-px active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] ${toneClasses[tone]}`}
      aria-label={label}
    >
      {icon}
    </button>
  );
};

const TaskRow = ({
  task,
  statusMeta,
  onEdit,
  onDelete,
  onStatusChange,
  variant = "desktop",
}) => {
  const formattedDate = formatTaskDate(task.date);
  const taskIdLabel = task.id.toUpperCase();
  const mobileDescription = getTaskPreview(task.description, 84);
  const desktopDescription = getTaskPreview(task.description, 112);
  const openEdit = () => onEdit(task.id);
  const removeTask = () => onDelete(task.id);
  const advanceStatus = (taskId) => onStatusChange(taskId);

  if (variant === "mobile") {
    return (
      <article
        role="button"
        tabIndex={0}
        onClick={openEdit}
        onKeyDown={handleKeyboardActivation(openEdit)}
        className="ui-data-row group relative cursor-pointer overflow-hidden rounded-[24px] border border-[var(--border-subtle)] p-4 text-left shadow-[var(--shadow-xs)] transition-[transform,box-shadow,border-color] duration-200 [transition-timing-function:var(--ease-standard)] hover:-translate-y-0.5 hover:border-[rgba(93,142,246,0.18)] hover:shadow-[var(--shadow-sm)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-5 left-0 w-1 rounded-r-full"
          style={{ backgroundColor: statusMeta.accent }}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-[-14%] top-[-12%] h-28 w-28 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${statusMeta.glow} 0%, transparent 72%)`,
          }}
        />

        <div className="relative z-10 flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="ui-glass-chip inline-flex items-center gap-2 rounded-full px-3 py-1 text-[0.66rem] font-black uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: statusMeta.accent }}
              />
              {taskIdLabel}
            </div>

            <h3 className="mt-2.5 text-[1.02rem] font-black tracking-[-0.03em] text-[var(--text-strong)]">
              {task.title}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <ActionButton
              label={`Edit ${task.title}`}
              onClick={openEdit}
              icon={<FiEdit2 className="text-base" />}
            />
            <ActionButton
              label={`Delete ${task.title}`}
              onClick={removeTask}
              tone="danger"
              icon={<FiTrash2 className="text-base" />}
            />
          </div>
        </div>

        <p className="relative z-10 mt-2.5 text-sm leading-6 text-[var(--text-secondary)]">
          {mobileDescription}
        </p>

        <div className="relative z-10 mt-3.5 flex flex-wrap items-center gap-2">
          <div className="ui-glass-chip inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold text-[var(--text-secondary)]">
            <FiCalendar className="text-sm text-[var(--text-tertiary)]" />
            {formattedDate}
          </div>
        </div>

        <div className="relative z-10 mt-3.5 flex items-center justify-between gap-3">
          <StatusChip
            taskId={task.id}
            statusMeta={statusMeta}
            onStatusChange={advanceStatus}
          />

          <div className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
            Open
            <FiChevronRight className="text-sm" />
          </div>
        </div>
      </article>
    );
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={openEdit}
      onKeyDown={handleKeyboardActivation(openEdit)}
      className="ui-data-row group relative grid cursor-pointer grid-cols-[minmax(0,2.2fr)_minmax(170px,0.9fr)_minmax(175px,0.85fr)_auto] items-start gap-4 overflow-hidden rounded-[24px] border border-[var(--border-subtle)] px-4 py-4 text-left shadow-[var(--shadow-xs)] transition-[transform,box-shadow,border-color] duration-200 [transition-timing-function:var(--ease-standard)] hover:-translate-y-0.5 hover:border-[rgba(93,142,246,0.18)] hover:shadow-[var(--shadow-sm)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-6 left-0 w-1 rounded-r-full transition-colors duration-200"
        style={{ backgroundColor: statusMeta.accent }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-[-16%] top-[-14%] h-32 w-32 rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, ${statusMeta.glow} 0%, transparent 72%)`,
        }}
      />

      <div className="relative z-10 min-w-0">
        <div className="ui-glass-chip inline-flex items-center gap-2 rounded-full px-3 py-1 text-[0.66rem] font-black uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: statusMeta.accent }}
          />
          {taskIdLabel}
        </div>

        <h3 className="mt-2.5 text-[1.05rem] font-black tracking-[-0.03em] text-[var(--text-strong)]">
          {task.title}
        </h3>

        <p className="mt-1.5 max-w-2xl text-sm leading-6 text-[var(--text-secondary)]">
          {desktopDescription}
        </p>
      </div>

      <div className="relative z-10 min-w-0 pt-1">
        <div className="ui-glass-chip mt-2.5 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold text-[var(--text-secondary)]">
          <FiCalendar className="text-sm text-[var(--text-tertiary)]" />
          {formattedDate}
        </div>
      </div>

      <div className="relative z-10 min-w-0 pt-1">
        <div className="mt-2.5">
          <StatusChip
            taskId={task.id}
            statusMeta={statusMeta}
            onStatusChange={advanceStatus}
          />
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-end gap-2 pt-1">
        <ActionButton
          label={`Edit ${task.title}`}
          onClick={openEdit}
          icon={<FiEdit2 className="text-base" />}
        />
        <ActionButton
          label={`Delete ${task.title}`}
          onClick={removeTask}
          tone="danger"
          icon={<FiTrash2 className="text-base" />}
        />
      </div>
    </div>
  );
};

export default TaskRow;
