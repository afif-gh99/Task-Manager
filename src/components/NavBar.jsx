import { useNavigate } from "react-router";
import { useState } from "react";
import { toast } from "react-toastify";
import ConfirmModal from "./ConfirmModal";
import { authService } from "../services/authService";

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
    authService.logout();
    toast.success("Logged out successfully.");
    setLogoutPending(false);
    navigate("/signin");
  };

  return (
    <>
      <div className="animate-fade-up flex w-full flex-col gap-4 rounded-[28px] bg-(--color-surface-elevated) px-4 py-4 shadow-(--color-shadow-soft) backdrop-blur-sm transition-transform duration-300 sm:px-5 lg:flex-row lg:items-center">
        <div className="flex items-center justify-between gap-3 lg:w-auto lg:shrink-0">
          <div className="w-38 shrink-0 sm:w-44 lg:w-50">
            <img
              src={logoSrc}
              alt={logoAlt}
              className="h-full w-full object-contain"
            />
          </div>

          <button
            type="button"
            onClick={handleLogoutClick}
            className="h-10 shrink-0 cursor-pointer rounded-[18px] border border-[rgba(243,131,6,0.28)] bg-[rgba(243,131,6,0.10)] px-3 text-xs font-semibold text-(--color-orange) transition duration-200 hover:-translate-y-0.5 hover:bg-[rgba(243,131,6,0.16)] sm:px-4 sm:text-sm lg:hidden"
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
            className="h-13 w-full rounded-[22px] border border-(--color-border-strong) bg-white px-5 text-sm text-(--color-text-primary) outline-none transition duration-200 placeholder:text-(--color-text-muted) focus:border-(--color-orange) focus:ring-2 focus:ring-[rgba(243,131,6,0.18)]"
          />
        </div>

        <button
          type="button"
          onClick={handleLogoutClick}
          className="hidden h-13 shrink-0 cursor-pointer rounded-[22px] border border-[rgba(243,131,6,0.28)] bg-[rgba(243,131,6,0.10)] px-5 text-sm font-semibold text-(--color-orange) transition duration-200 hover:-translate-y-0.5 hover:bg-[rgba(243,131,6,0.16)] lg:inline-flex lg:items-center lg:justify-center"
        >
          {logoutText}
        </button>
      </div>

      {logoutPending && (
        <ConfirmModal
          title="Are you sure you want to log out?"
          message="This will clear the stored auth session and take you back to the sign-in page."
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
