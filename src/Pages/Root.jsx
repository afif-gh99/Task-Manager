import { Outlet } from "react-router";
import { useState } from "react";
import NavBar from "../components/NavBar";

const Root = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="font-cairo relative min-h-screen overflow-x-clip bg-[var(--page-background)]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-x-0 top-0 h-[22rem]"
          style={{ background: "var(--page-shell-top-wash)" }}
        />
        <div
          className="absolute left-[-6rem] top-[-2rem] h-[20rem] w-[20rem] rounded-full blur-[84px]"
          style={{ backgroundColor: "var(--page-shell-primary-glow)" }}
        />
        <div
          className="absolute right-[-5rem] top-[-1rem] h-[18rem] w-[18rem] rounded-full blur-[88px]"
          style={{ backgroundColor: "var(--page-shell-warm-glow)" }}
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[80rem] flex-col px-4 py-4 sm:px-6 md:px-8 lg:px-10 lg:py-6">
        <NavBar
          searchValue={searchQuery}
          onSearchChange={(event) => setSearchQuery(event.target.value)}
        />

        <main className="relative flex-1 pb-8 pt-4 sm:pt-5 lg:pt-6">
          <Outlet context={{ searchQuery }} />
        </main>
      </div>
    </div>
  );
};

export default Root;
