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
      className={`${classes.surface} animate-fade-up flex items-center gap-3 rounded-[24px] border border-[var(--color-border-strong)] px-4 py-4 shadow-[var(--color-shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(49,74,143,0.12)] sm:gap-4 sm:rounded-[28px] sm:px-5 sm:py-5 md:rounded-[30px] md:px-6 md:py-6`}
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[20px] bg-white/80 shadow-[0_12px_30px_rgba(37,46,89,0.08)] backdrop-blur-sm sm:h-14 sm:w-14 sm:rounded-[22px] md:h-[4.5rem] md:w-[4.5rem] md:rounded-3xl">
        <div
          className={`text-[1.75rem] leading-none sm:text-[2rem] md:text-5xl ${classes.iconText}`}
        >
          {icon}
        </div>
      </div>

      <div className="flex flex-col justify-center leading-none">
        <div className="text-xl font-extrabold tracking-tight text-[var(--color-text-primary)] sm:text-2xl md:text-3xl">
          {val}
        </div>
        <div className="mt-1.5 text-sm font-bold leading-tight tracking-tight text-[var(--color-text-secondary)] sm:mt-2 sm:text-base md:text-lg">
          {title}
        </div>
      </div>
    </div>
  );
};

export default Card;
