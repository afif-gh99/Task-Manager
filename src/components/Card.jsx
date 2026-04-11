const toneClasses = {
  total: {
    iconText: "text-[var(--color-orange)]",
    surface: "bg-[rgba(243,131,6,0.10)]",
  },
  pending: {
    iconText: "text-[var(--color-status-pending-text)]",
    surface: "bg-[rgba(255,217,122,0.22)]",
  },
  progress: {
    iconText: "text-[var(--color-primary)]",
    surface: "bg-[rgba(93,142,246,0.14)]",
  },
  completed: {
    iconText: "text-[var(--color-status-done-bg)]",
    surface: "bg-[rgba(79,209,116,0.16)]",
  },
};

const Card = ({ icon, title, val, tone }) => {
  const classes = toneClasses[tone];

  return (
    <div
      className={`${classes.surface} animate-fade-up flex items-center gap-4 rounded-[30px] border border-[var(--color-border-strong)] px-5 py-5 shadow-[var(--color-shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(49,74,143,0.12)] md:px-6 md:py-6`}
    >
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl bg-white/80 shadow-[0_12px_30px_rgba(37,46,89,0.08)] backdrop-blur-sm md:h-[4.5rem] md:w-[4.5rem]">
        <div
          className={`text-4xl leading-none md:text-5xl ${classes.iconText}`}
        >
          {icon}
        </div>
      </div>

      <div className="flex flex-col justify-center leading-none">
        <div className="text-2xl font-extrabold tracking-tight text-[var(--color-text-primary)] md:text-3xl">
          {val}
        </div>
        <div className="mt-2 text-base font-bold leading-tight tracking-tight text-[var(--color-text-secondary)] md:text-lg">
          {title}
        </div>
      </div>
    </div>
  );
};

export default Card;
