import { useNavigate } from "react-router";
import { useState } from "react";
import ConfirmModal from "./ConfirmModal";

const NavBar = ({
  logoSrc,
  logoAlt = "logo",
  searchPlaceholder = "Search tasks by title...",
  searchValue = "",
  onSearchChange,
  logoutText = "Logout",
}) => {
  const navigate = useNavigate();
  const [logoutPending, setLogoutPending] = useState(false);

  const handleLogoutClick = () => {
    setLogoutPending(true);
  };

  const handleConfirmLogout = () => {
    // TODO: Replace this placeholder with the real logout API flow later.
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setLogoutPending(false);
    navigate("/");
  };

  return (
    <>
      <div className="animate-fade-up flex w-full flex-col gap-4 rounded-[28px] bg-[var(--color-surface-elevated)] px-4 py-4 shadow-[var(--color-shadow-soft)] backdrop-blur-sm transition-transform duration-300 sm:px-5 lg:flex-row lg:items-center">
        <div className="flex items-center justify-between gap-3 lg:w-auto lg:shrink-0">
          <div className="w-[9.5rem] shrink-0 sm:w-[11rem] lg:w-[12.5rem]">
            <img
              src={logoSrc}
              alt={logoAlt}
              className="h-full w-full object-contain"
            />
          </div>

          <button
            type="button"
            onClick={handleLogoutClick}
            className="h-10 shrink-0 cursor-pointer rounded-[18px] border border-[rgba(243,131,6,0.28)] bg-[rgba(243,131,6,0.10)] px-3 text-xs font-semibold text-[var(--color-orange)] transition duration-200 hover:-translate-y-0.5 hover:bg-[rgba(243,131,6,0.16)] sm:px-4 sm:text-sm lg:hidden"
          >
            {logoutText}
          </button>
        </div>

        <div className="w-full lg:flex-1">
          <input
            type="text"
            value={searchValue}
            onChange={onSearchChange}
            placeholder={searchPlaceholder}
            className="h-[3.25rem] w-full rounded-[22px] border border-[var(--color-border-strong)] bg-white px-5 text-sm text-[var(--color-text-primary)] outline-none transition duration-200 placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-orange)] focus:ring-2 focus:ring-[rgba(243,131,6,0.18)]"
          />
        </div>

        <button
          type="button"
          onClick={handleLogoutClick}
          className="hidden h-[3.25rem] shrink-0 cursor-pointer rounded-[22px] border border-[rgba(243,131,6,0.28)] bg-[rgba(243,131,6,0.10)] px-5 text-sm font-semibold text-[var(--color-orange)] transition duration-200 hover:-translate-y-0.5 hover:bg-[rgba(243,131,6,0.16)] lg:inline-flex lg:items-center lg:justify-center"
        >
          {logoutText}
        </button>
      </div>

      {logoutPending && (
        <ConfirmModal
          title="Are you sure you want to log out?"
          message="This will clear the temporary auth state for the current session and take you back to the sign-in page."
          confirmLabel="Log Out"
          type="warning"
          onConfirm={handleConfirmLogout}
          onCancel={() => setLogoutPending(false)}
        />
      )}
    </>
  );
};

export default NavBar;
