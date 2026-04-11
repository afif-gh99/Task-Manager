import { Link } from "react-router";

const TaskForm = ({
  title,
  subtitle,
  submitLabel,
  backTo = "/dashboard",
  backLabel = "Back to dashboard",
  badgeLabel,
  values,
  onChange,
  onStatusChange,
  onSubmit,
}) => {
  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "in-progress", label: "In Progress" },
    { value: "done", label: "Done" },
  ];

  const statusOptionClasses = {
    pending: {
      active:
        "border-[rgba(255,217,122,0.45)] bg-[rgba(255,217,122,0.22)] text-[var(--color-status-pending-text)] shadow-[0_10px_28px_rgba(255,217,122,0.25)]",
      idle: "border-[rgba(255,217,122,0.35)] bg-[rgba(255,217,122,0.10)] text-[var(--color-status-pending-text)]",
    },
    "in-progress": {
      active:
        "border-[rgba(93,142,246,0.35)] bg-[var(--color-primary-soft)] text-[var(--color-primary)] shadow-[var(--color-shadow-pill)]",
      idle: "border-[rgba(93,142,246,0.28)] bg-[rgba(93,142,246,0.08)] text-[var(--color-primary)]",
    },
    done: {
      active:
        "border-[rgba(79,209,116,0.35)] bg-[rgba(79,209,116,0.18)] text-[var(--color-status-done-bg)] shadow-[0_10px_28px_rgba(79,209,116,0.22)]",
      idle: "border-[rgba(79,209,116,0.28)] bg-[rgba(79,209,116,0.08)] text-[var(--color-status-done-bg)]",
    },
  };

  return (
    <div className="animate-fade-up mt-8">
      <div className="mb-8 flex flex-wrap items-center gap-3 text-[var(--color-text-secondary)]">
        <Link
          to={backTo}
          className="inline-flex items-center gap-2 text-base font-semibold transition hover:text-[var(--color-primary)]"
        >
          <span className="text-xl leading-none">&larr;</span>
          {backLabel}
        </Link>
        {badgeLabel && (
          <div className="inline-flex items-center rounded-full bg-[var(--color-primary-soft)] px-4 py-2 text-sm font-bold text-[var(--color-primary)]">
            New {badgeLabel}
          </div>
        )}
      </div>

      <div className="mb-8 max-w-5xl">
        <h1 className="text-5xl font-extrabold tracking-[-0.04em] text-[var(--color-text-primary)] md:text-6xl lg:text-7xl">
          {title}
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-[var(--color-text-secondary)]">
          {subtitle}
        </p>
      </div>

      <div className="rounded-[34px] border border-[var(--color-border-strong)] bg-[var(--color-surface-elevated)] p-6 shadow-[var(--color-shadow-soft)] backdrop-blur-sm transition-all duration-300 md:p-7">
        <form onSubmit={onSubmit} className="space-y-7">
          <label className="flex flex-col gap-2">
            <span className="text-2xl font-extrabold tracking-tight text-[var(--color-text-primary)]">
              Task title
            </span>
            <input
              id="title"
              name="title"
              type="text"
              value={values.title}
              onChange={onChange}
              placeholder="Give this task a clear title"
              required
              className="h-16 rounded-[24px] border border-[var(--color-border-strong)] bg-[var(--color-surface-soft)] px-5 text-xl text-[var(--color-text-primary)] outline-none transition duration-200 placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:bg-white"
            />
          </label>

          <label className="flex flex-col gap-3">
            <span className="text-2xl font-extrabold tracking-tight text-[var(--color-text-primary)]">
              Description
            </span>
            <textarea
              id="description"
              name="description"
              value={values.description}
              onChange={onChange}
              placeholder="Add context, goals, or next steps"
              required
              rows={7}
              className="rounded-[28px] border border-[var(--color-border-strong)] bg-[var(--color-surface-soft)] px-5 py-4 text-xl text-[var(--color-text-primary)] outline-none transition duration-200 placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:bg-white"
            />
          </label>

          <div className="grid gap-6 lg:grid-cols-[1.05fr_1fr]">
            <label className="flex flex-col gap-3">
              <span className="text-2xl font-extrabold tracking-tight text-[var(--color-text-primary)]">
                Due date
              </span>
              <input
                id="date"
                name="date"
                type="date"
                value={values.date}
                onChange={onChange}
                required
                className="h-16 rounded-[24px] border border-[var(--color-border-strong)] bg-[var(--color-surface-soft)] px-5 text-xl text-[var(--color-text-primary)] outline-none transition duration-200 focus:border-[var(--color-primary)] focus:bg-white"
              />
            </label>

            <div className="flex flex-col gap-3">
              <span className="text-2xl font-extrabold tracking-tight text-[var(--color-text-primary)]">
                Starting status
              </span>
              <div className="flex flex-wrap gap-3">
                {statusOptions.map((option) => {
                  const isActive = values.status === option.value;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => onStatusChange(option.value)}
                      className={`inline-flex h-15 min-w-[124px] items-center justify-center rounded-full border px-6 text-lg font-bold transition duration-200 hover:-translate-y-0.5 ${
                        isActive
                          ? statusOptionClasses[option.value].active
                          : statusOptionClasses[option.value].idle
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-end">
            <Link
              to="/dashboard"
              className="inline-flex h-14 items-center justify-center px-2 text-xl font-bold text-[var(--color-text-secondary)] transition duration-200 hover:text-[var(--color-primary)]"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="inline-flex h-14 cursor-pointer items-center justify-center gap-3 rounded-[22px] bg-[linear-gradient(180deg,#6f9fff_0%,var(--color-primary)_100%)] px-8 text-xl font-bold text-white shadow-[var(--color-shadow-pill)] transition duration-200 hover:-translate-y-1 hover:brightness-105"
            >
              <span className="text-2xl leading-none">+</span>
              {submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
