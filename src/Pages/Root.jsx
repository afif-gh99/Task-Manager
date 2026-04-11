import { Outlet, useNavigate } from "react-router";
import { useState } from "react";
import NavBar from "../components/NavBar";

const Root = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [logoutPending, setLogoutPending] = useState(false);

  const handleLogout = () => {
    setLogoutPending(true);
  };

  const confirmLogout = () => {
    // TODO: Replace this placeholder with the real logout API flow later.
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setLogoutPending(false);
    navigate("/");
  };

  return (
    <div className="font-cairo min-h-screen bg-[radial-gradient(circle_at_top_left,var(--color-page-glow),transparent_32%),radial-gradient(circle_at_top_right,rgba(255,221,185,0.25),transparent_28%),var(--color-page-bg)] px-4 py-5 sm:px-6 md:px-10 lg:px-16 lg:py-7">
      <NavBar
        logoSrc="/assets/proteam-text.png"
        searchValue={searchQuery}
        onSearchChange={(event) => setSearchQuery(event.target.value)}
        onLogout={handleLogout}
      />
      <Outlet context={{ searchQuery }} />

      {logoutPending && (
        <div className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-[rgba(20,28,58,0.32)] px-4 backdrop-blur-[2px]">
          <div className="w-full max-w-md rounded-[30px] border border-[var(--color-border-strong)] bg-[var(--color-surface-primary)] p-6 shadow-[0_28px_80px_rgba(31,40,88,0.18)]">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[rgba(243,131,6,0.12)] text-2xl text-[var(--color-orange)]">
              !
            </div>

            <h3 className="text-2xl font-extrabold text-[var(--color-text-primary)]">
              Log Out?
            </h3>
            <p className="mt-3 text-base leading-7 text-[var(--color-text-secondary)]">
              Are you sure you want to log out of the current session? This will
              clear the temporary auth state and send you back to the sign-in
              page.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setLogoutPending(false)}
                className="inline-flex h-12 items-center justify-center rounded-[20px] border border-[var(--color-border-strong)] bg-[var(--color-surface-soft)] px-5 text-sm font-semibold text-[var(--color-text-secondary)] transition duration-200 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmLogout}
                className="inline-flex h-12 items-center justify-center rounded-[20px] bg-[var(--color-orange)] px-5 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:brightness-95"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Root;
