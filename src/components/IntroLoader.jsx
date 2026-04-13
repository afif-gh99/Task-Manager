const IntroLoader = ({
  duration = 2400,
  logoSrc = "/assets/logo-dark.png",
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
        <div className="intro-loader-panel w-full max-w-[34rem] px-5 py-5 sm:px-7 sm:py-7">
          <div
            aria-hidden="true"
            className="intro-loader-orbit pointer-events-none absolute right-[-14%] top-[-16%] h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(124,160,255,0.2)_0%,transparent_72%)] blur-[56px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[-10%] bottom-[-18%] h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(255,188,122,0.16)_0%,transparent_72%)] blur-[54px]"
          />

          <div className="relative z-10">
            <div className="flex items-center justify-between gap-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.06)] px-3.5 py-1.5 text-[0.68rem] font-black uppercase tracking-[0.2em] text-[rgba(223,232,255,0.72)]">
                <span className="h-2 w-2 rounded-full bg-[rgba(124,160,255,0.96)]" />
                ProTeam
              </div>

              <p className="text-[0.68rem] font-black uppercase tracking-[0.18em] text-[rgba(223,232,255,0.52)]">
                Loading
              </p>
            </div>

            <div className="intro-loader-stage relative mt-5 flex justify-center">
              <div className="relative w-full max-w-[24rem]">
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

            <div className="mt-5">
              <div className="flex items-center justify-between gap-3 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[rgba(223,232,255,0.5)]">
                <span>Preparing workspace</span>
                <span>Almost ready</span>
              </div>

              <div className="mt-2 rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.05)] p-[3px]">
                <div className="intro-loader-bar-fill h-1.5 rounded-full bg-[linear-gradient(90deg,rgba(124,160,255,0.86),rgba(160,190,255,1),rgba(255,194,132,0.82))] shadow-[0_8px_18px_rgba(124,160,255,0.22)]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroLoader;
