const toneClasses = {
  total: {
    accent: "var(--brand-accent-amber-500)",
    accentSoft: "rgba(243,131,6,0.18)",
    pillText: "var(--brand-accent-amber-500)",
    iconText: "var(--brand-accent-amber-500)",
  },
  pending: {
    accent: "var(--status-pending-surface)",
    accentSoft: "rgba(255,217,122,0.24)",
    pillText: "var(--status-pending-text)",
    iconText: "var(--status-pending-text)",
  },
  progress: {
    accent: "var(--brand-primary-500)",
    accentSoft: "rgba(93,142,246,0.2)",
    pillText: "var(--status-progress-text)",
    iconText: "var(--brand-primary-500)",
  },
  completed: {
    accent: "var(--brand-accent-emerald-500)",
    accentSoft: "rgba(79,209,116,0.22)",
    pillText: "var(--status-done-text)",
    iconText: "var(--brand-accent-emerald-500)",
  },
};

const Card = ({ icon, title, val, tone, eyebrow, support, animationDelay }) => {
  const classes = toneClasses[tone];
  const pillStyle = {
    background: `color-mix(in srgb, var(--surface-1) 84%, ${classes.accent} 16%)`,
    borderColor: `color-mix(in srgb, ${classes.accent} 18%, var(--glass-chip-border))`,
    color: classes.pillText,
  };
  const iconShellStyle = {
    borderColor: `color-mix(in srgb, ${classes.accent} 16%, var(--glass-chip-border))`,
    background: `linear-gradient(180deg, color-mix(in srgb, var(--surface-1) 92%, rgba(255, 255, 255, 0.04)) 0%, color-mix(in srgb, var(--surface-3) 76%, ${classes.accent} 24%) 100%)`,
  };

  return (
    <article
      style={{
        "--ambient-color": classes.accent,
        animationDelay: `${animationDelay}ms`,
        background: "var(--metric-card-bg)",
      }}
      className="card-ambient group relative isolate overflow-hidden rounded-[28px] border border-[var(--border-subtle)] p-4 shadow-[var(--shadow-sm)] transition-[transform,box-shadow,border-color] duration-300 [transition-timing-function:var(--ease-standard)] hover:-translate-y-1 hover:border-[rgba(93,142,246,0.18)] hover:shadow-[var(--shadow-lg)] sm:p-5"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-5 top-0 h-px"
        style={{ background: "var(--panel-top-line)" }}
      />
      <span
        aria-hidden="true"
        className="card-ambient-wave absolute inset-0 opacity-70"
      />
      <span
        aria-hidden="true"
        className="card-ambient-glow absolute inset-[-30%]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10%] top-[-12%] h-24 w-24 rounded-full blur-[44px]"
        style={{
          background: `radial-gradient(circle, ${classes.accentSoft} 0%, transparent 70%)`,
        }}
      />

      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="max-w-[72%]">
            <div
              className="inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[0.64rem] font-black uppercase tracking-[0.18em] shadow-[var(--shadow-xs)]"
              style={pillStyle}
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: classes.accent }}
              />
              {eyebrow}
            </div>

            <p className="mt-4 text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-[var(--text-secondary)]">
              {title}
            </p>
          </div>

          <div
            className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-[20px] border shadow-[var(--shadow-xs)]"
            style={iconShellStyle}
          >
            <span className="absolute inset-[1px] rounded-[18px] bg-[linear-gradient(180deg,rgba(255,255,255,0.22),rgba(255,255,255,0))]" />
            <div className="relative text-[1.55rem]" style={{ color: classes.iconText }}>
              {icon}
            </div>
          </div>
        </div>

        <div className="mt-5">
          <div className="text-[2.35rem] font-black tracking-[-0.08em] text-[var(--text-strong)] sm:text-[2.6rem]">
            {val}
          </div>
          {support && (
            <p className="mt-1.5 max-w-[15rem] text-[0.82rem] font-semibold uppercase tracking-[0.08em] text-[var(--text-tertiary)]">
              {support}
            </p>
          )}
        </div>
      </div>
    </article>
  );
};

export default Card;
