import { useNavigate } from "react-router";
import { useState } from "react";
import { FiLogOut, FiMoon, FiSearch, FiSun } from "react-icons/fi";
import ConfirmModal from "./ConfirmModal";
import { useTheme } from "./AppEntry";

const NavBar = ({
  lightLogoSrc = "/assets/logo-light.png",
  darkLogoSrc = "/assets/logo-dark.png",
  logoAlt = "logo",
  searchPlaceholder = "Search tasks...",
  searchValue = "",
  onSearchChange,
  logoutText = "Logout",
}) => {
  const navigate = useNavigate();
  const [logoutPending, setLogoutPending] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

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
      <header className="sticky top-3 z-40">
        <div className="premium-panel rounded-[28px] px-4 py-3.5 sm:px-5 sm:py-4 lg:px-6">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-[-4%] top-[-22%] h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(124,160,255,0.2)_0%,transparent_72%)] blur-3xl"
          />
          <div className="relative z-10 flex flex-col gap-3 xl:grid xl:grid-cols-[auto_minmax(0,1fr)_auto] xl:items-center xl:gap-4">
            <div className="flex items-center justify-between gap-4 xl:min-w-[11.5rem]">
              <div className="flex min-w-0 items-center gap-3">
                <div className="relative h-10 w-[9.5rem] shrink-0 sm:h-11 sm:w-[10.5rem] lg:h-12 lg:w-[11rem]">
                  <img
                    src={lightLogoSrc}
                    alt={logoAlt}
                    className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-150 [transition-timing-function:var(--ease-standard)] ${
                      isDarkMode ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  <img
                    src={darkLogoSrc}
                    alt=""
                    aria-hidden="true"
                    className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-150 [transition-timing-function:var(--ease-standard)] ${
                      isDarkMode ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 lg:hidden">
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="ui-icon-button h-10 w-10 shrink-0 cursor-pointer"
                  aria-label={
                    isDarkMode ? "Switch to light mode" : "Switch to dark mode"
                  }
                  title={isDarkMode ? "Light mode" : "Dark mode"}
                >
                  {isDarkMode ? (
                    <FiSun className="text-base" />
                  ) : (
                    <FiMoon className="text-base" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleLogoutClick}
                  className="ui-btn-accent inline-flex h-10 shrink-0 cursor-pointer items-center justify-center gap-2 px-3.5 text-sm font-semibold"
                >
                  <FiLogOut className="text-base" />
                  {logoutText}
                </button>
              </div>
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-3 xl:flex-row xl:items-center">
              <label className="group relative block flex-1">
                <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-[var(--text-tertiary)] transition-colors duration-200 group-focus-within:text-[var(--brand-primary-500)]">
                  <FiSearch className="text-lg" />
                </span>

                <input
                  type="search"
                  value={searchValue}
                  onChange={onSearchChange}
                  placeholder={searchPlaceholder}
                  className="ui-control h-[3.25rem] pl-12 pr-5 text-sm font-medium md:text-[0.95rem]"
                />
              </label>
            </div>

            <div className="hidden items-center gap-2 lg:flex">
              <button
                type="button"
                onClick={toggleTheme}
                className="ui-icon-button h-[3.25rem] w-[3.25rem] shrink-0 cursor-pointer"
                aria-label={
                  isDarkMode ? "Switch to light mode" : "Switch to dark mode"
                }
                title={isDarkMode ? "Light mode" : "Dark mode"}
              >
                {isDarkMode ? (
                  <FiSun className="text-lg" />
                ) : (
                  <FiMoon className="text-lg" />
                )}
              </button>

              <button
                type="button"
                onClick={handleLogoutClick}
                className="ui-btn-accent hidden h-[3.25rem] shrink-0 cursor-pointer items-center justify-center gap-2 px-4 text-sm font-semibold lg:inline-flex"
              >
                <FiLogOut className="text-base" />
                {logoutText}
              </button>
            </div>
          </div>
        </div>
      </header>

      {logoutPending && (
        <ConfirmModal
          title="Are you sure you want to log out?"
          message="This will end the current session and return you to sign in."
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
