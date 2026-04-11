const NavBar = ({
  logoSrc,
  logoAlt = "logo",
  searchPlaceholder = "Search tasks by title...",
  searchValue = "",
  onSearchChange,
  logoutText = "Logout",
  onLogout,
}) => {
  return (
    <div className="animate-fade-up flex w-full flex-col gap-4 rounded-[28px] bg-[var(--color-surface-elevated)] px-4 py-4 shadow-[var(--color-shadow-soft)] backdrop-blur-sm transition-transform duration-300 sm:px-5 lg:flex-row lg:items-center">
      <div className="w-42 shrink-0 sm:w-50">
        <img
          src={logoSrc}
          alt={logoAlt}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="flex-1">
        <input
          type="text"
          value={searchValue}
          onChange={onSearchChange}
          placeholder={searchPlaceholder}
          className="h-13 w-full rounded-[22px] border border-[var(--color-border-strong)] bg-white px-5 text-sm text-[var(--color-text-primary)] outline-none transition duration-200 placeholder:text-[var(--color-text-muted)] focus:border-orange focus:ring-2 focus:ring-[rgba(243,131,6,0.18)]"
        />
      </div>

      <button
        type="button"
        onClick={onLogout}
        className="h-13 shrink-0 cursor-pointer rounded-[22px] border border-[rgba(243,131,6,0.28)] bg-[rgba(243,131,6,0.10)] px-5 text-sm font-semibold text-orange transition duration-200 hover:-translate-y-0.5 hover:bg-[rgba(243,131,6,0.16)]"
      >
        {logoutText}
      </button>
    </div>
  );
};

export default NavBar;
