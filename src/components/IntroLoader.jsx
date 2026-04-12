const IntroLoader = ({
  duration = 2000,
  logoSrc = "/assets/proteam-text.png",
  logoAlt = "ProTeam",
}) => {
  return (
    <div
      className="intro-loader-shell fixed inset-0 z-[120] flex items-center justify-center overflow-hidden bg-[var(--color-loader-bg)]"
      style={{ "--intro-duration": `${duration}ms` }}
      role="status"
      aria-live="polite"
    >
      <span className="sr-only">Loading ProTeam</span>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(93,142,246,0.18),transparent_38%),radial-gradient(circle_at_bottom,rgba(32,49,108,0.36),transparent_40%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.03),transparent_42%,rgba(255,255,255,0.02))]" />

      <div className="relative flex w-full items-center justify-center px-6">
        <div className="relative w-full max-w-[28rem]">
          <div className="intro-logo-glow absolute inset-[-18%] rounded-full" />

          <img
            src={logoSrc}
            alt={logoAlt}
            fetchPriority="high"
            className="intro-logo-outline relative z-10 w-full object-contain select-none"
            draggable="false"
          />

          <img
            src={logoSrc}
            alt=""
            aria-hidden="true"
            className="intro-logo-color absolute inset-0 z-20 w-full object-contain select-none"
            draggable="false"
          />

          <div
            aria-hidden="true"
            className="intro-logo-sheen absolute inset-0 z-30"
          />
        </div>
      </div>
    </div>
  );
};

export default IntroLoader;
