import {
  FiArrowLeft,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiPlus,
} from "react-icons/fi";
import { Link } from "react-router";

const TaskForm = ({
  eyebrow = "Task Editor",
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
  insightLabel = "Editing Guide",
  insightTitle = "Shape a task that is easy to execute.",
  insightDescription = "",
  insightPoints = [],
}) => {
  const statusOptions = [
    {
      value: "pending",
      label: "Pending",
      accent: "#e0ab15",
      text: "var(--status-pending-text)",
      border: "var(--status-pending-chip-border)",
      surface: "var(--status-pending-chip-surface)",
      glow: "var(--status-pending-chip-glow)",
      meta: "Queued for kickoff",
    },
    {
      value: "in-progress",
      label: "In Progress",
      accent: "var(--brand-primary-500)",
      text: "var(--status-progress-text)",
      border: "var(--status-progress-chip-border)",
      surface: "var(--status-progress-chip-surface)",
      glow: "var(--status-progress-chip-glow)",
      meta: "Work is underway",
    },
    {
      value: "done",
      label: "Done",
      accent: "var(--brand-accent-emerald-500)",
      text: "var(--status-done-text)",
      border: "var(--status-done-chip-border)",
      surface: "var(--status-done-chip-surface)",
      glow: "var(--status-done-chip-glow)",
      meta: "Ready to archive",
    },
  ];

  const currentStatus =
    statusOptions.find((option) => option.value === values.status) ??
    statusOptions[0];
  const submitIcon =
    submitLabel.toLowerCase().includes("update") ||
    submitLabel.toLowerCase().includes("save") ? (
      <FiCheckCircle className="text-lg md:text-xl" />
    ) : (
      <FiPlus className="text-lg md:text-xl" />
    );

  return (
    <div className="page-enter">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          to={backTo}
          className="ui-btn-ghost min-h-11 rounded-[18px] px-4 text-sm md:text-base"
        >
          <FiArrowLeft className="text-base" />
          {backLabel}
        </Link>

        {badgeLabel && (
          <div className="ui-kicker">
            <span
              className="h-2 w-2 rounded-full bg-[var(--brand-primary-500)]"
              aria-hidden="true"
            />
            {badgeLabel}
          </div>
        )}
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1.16fr)_minmax(16rem,0.7fr)] xl:items-start">
        <div className="min-w-0 space-y-4">
          <section className="premium-panel rounded-[32px] px-4 py-4 sm:px-5 sm:py-5">
            <div className="relative z-10">
              <div className="ui-kicker">
                <span
                  className="h-2 w-2 rounded-full bg-[var(--brand-primary-500)]"
                  aria-hidden="true"
                />
                {eyebrow}
              </div>

              <h1 className="mt-4 text-[2rem] font-black tracking-[-0.05em] text-[var(--text-strong)] sm:text-[2.35rem] lg:text-[2.6rem] lg:leading-[1.06]">
                {title}
              </h1>

              {subtitle && (
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--text-secondary)] sm:text-base">
                  {subtitle}
                </p>
              )}

              <div className="mt-3.5 flex flex-wrap gap-2.5">
                <div className="ui-glass-chip inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-[var(--text-secondary)]">
                  <FiClock className="text-sm text-[var(--text-tertiary)]" />
                  {currentStatus.label}
                </div>
              </div>
            </div>
          </section>

          <form onSubmit={onSubmit} className="space-y-4">
            <section className="ui-surface-card rounded-[30px] px-4 py-4 sm:px-5 sm:py-4">
              <div className="relative z-10">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
                    Core brief
                  </p>
                  <h2 className="mt-1.5 text-[1.45rem] font-black tracking-[-0.04em] text-[var(--text-strong)]">
                    Task details
                  </h2>
                </div>

                <div className="mt-4 grid gap-3.5">
                  <label className="flex flex-col gap-2.5">
                    <span className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--text-secondary)]">
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
                      className="ui-control px-4 text-base md:h-[3.5rem] md:text-[1rem]"
                    />
                  </label>

                  <label className="flex flex-col gap-2.5">
                    <span className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--text-secondary)]">
                      Description
                    </span>
                    <textarea
                      id="description"
                      name="description"
                      value={values.description}
                      onChange={onChange}
                      placeholder="Add context, goals, or next steps"
                      required
                      rows={5}
                      className="ui-control ui-control-textarea px-4 py-3.5 text-base"
                    />
                  </label>
                </div>
              </div>
            </section>

            <section className="ui-surface-card rounded-[30px] px-4 py-4 sm:px-5 sm:py-4">
              <div className="relative z-10">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
                    Planning
                  </p>
                  <h2 className="mt-1.5 text-[1.45rem] font-black tracking-[-0.04em] text-[var(--text-strong)]">
                    Date and status
                  </h2>
                </div>

                <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.06fr)]">
                  <label className="flex flex-col gap-2.5">
                    <span className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--text-secondary)]">
                      Due date
                    </span>
                    <div className="relative">
                      <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-[var(--text-tertiary)]">
                        <FiCalendar className="text-lg" />
                      </span>
                      <input
                        id="date"
                        name="date"
                        type="date"
                        value={values.date}
                        onChange={onChange}
                        required
                        className="ui-control ui-control-date pl-12 pr-4 text-base md:h-[3.5rem] md:text-[1rem]"
                      />
                    </div>
                  </label>

                  <div className="flex flex-col gap-2.5">
                    <span className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--text-secondary)]">
                      Status
                    </span>

                    <div className="grid gap-2">
                      {statusOptions.map((option) => {
                        const isActive = values.status === option.value;

                        return (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => onStatusChange(option.value)}
                            className={`flex cursor-pointer items-center gap-3 rounded-[22px] border px-4 py-3 text-left transition-[transform,box-shadow,border-color,color] duration-200 [transition-timing-function:var(--ease-standard)] hover:-translate-y-0.5 hover:border-[var(--border-accent)] active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] ${
                              isActive ? "" : "text-[var(--text-secondary)]"
                            }`}
                            style={
                              isActive
                                ? {
                                    borderColor: option.border,
                                    background: `linear-gradient(180deg, color-mix(in srgb, var(--surface-1) 88%, rgba(255, 255, 255, 0.06)) 0%, ${option.surface} 100%)`,
                                    color: option.text,
                                    boxShadow: `0 14px 26px ${option.glow}`,
                                  }
                                : {
                                    borderColor: "var(--border-subtle)",
                                    background:
                                      "color-mix(in srgb, var(--surface-1) 78%, transparent)",
                                  }
                            }
                          >
                            <span
                              className="mt-1 h-2.5 w-2.5 rounded-full"
                              style={{ backgroundColor: option.accent }}
                              aria-hidden="true"
                            />
                            <span className="min-w-0 flex-1">
                              <span className="block text-sm font-bold uppercase tracking-[0.12em]">
                                {option.label}
                              </span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className="premium-panel rounded-[26px] px-4 py-3.5 sm:px-5">
              <div className="relative z-10 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
                    Actions
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link
                    to="/dashboard"
                    className="ui-btn-secondary min-h-11 px-5 text-sm md:px-6 md:text-[0.95rem]"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    className="ui-btn-primary min-h-11 cursor-pointer px-6 text-sm md:px-8 md:text-[0.95rem]"
                  >
                    {submitIcon}
                    {submitLabel}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>

        <aside className="space-y-4 xl:sticky xl:top-[4.5rem]">
          <section className="ui-surface-card rounded-[28px] px-4 py-4 sm:px-5">
            <div className="relative z-10">
              <div className="ui-kicker">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: currentStatus.accent }}
                  aria-hidden="true"
                />
                {insightLabel}
              </div>

              <h3 className="mt-4 text-[1.55rem] font-black tracking-[-0.04em] text-[var(--text-strong)]">
                {insightTitle}
              </h3>

              {insightDescription && (
                <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                  {insightDescription}
                </p>
              )}

              {insightPoints.length > 0 && (
                <div className="mt-4 space-y-2.5">
                  {insightPoints.map((point) => (
                    <div
                      key={point}
                      className="ui-glass-tile flex items-start gap-3 rounded-[20px] px-3.5 py-3"
                    >
                      <FiCheckCircle className="mt-0.5 shrink-0 text-[var(--brand-primary-500)]" />
                      <p className="text-sm leading-6 text-[var(--text-secondary)]">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              <div className="ui-glass-tile mt-4 rounded-[22px] px-4 py-3.5">
                <p className="text-[0.72rem] font-black uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
                  Status
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: currentStatus.accent }}
                    aria-hidden="true"
                  />
                  <span className="text-lg font-black text-[var(--text-strong)]">
                    {currentStatus.label}
                  </span>
                </div>
                <p className="mt-1.5 text-sm text-[var(--text-secondary)]">
                  {currentStatus.meta}
                </p>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default TaskForm;
