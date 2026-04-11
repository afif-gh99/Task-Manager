const Card = ({ icon, title, val, color, bgColor }) => {
  return (
    <div
      className={`${bgColor} animate-fade-up flex items-center gap-4 rounded-[30px] border border-[var(--color-border-strong)] px-5 py-5 shadow-[var(--color-shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(49,74,143,0.12)] md:px-6 md:py-6`}
    >
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[24px] bg-white/80 shadow-[0_12px_30px_rgba(37,46,89,0.08)] backdrop-blur-sm md:h-18 md:w-18">
        <div className={`text-4xl leading-none md:text-5xl ${color}`}>{icon}</div>
      </div>

      <div className="flex flex-col justify-center leading-none">
        <div className="text-3xl font-extrabold tracking-tight text-[var(--color-text-primary)] md:text-4xl">
          {val}
        </div>
        <div className="mt-2 text-lg font-bold leading-tight tracking-tight text-[var(--color-text-secondary)] md:text-xl">
          {title}
        </div>
      </div>
    </div>
  );
};

export default Card;
