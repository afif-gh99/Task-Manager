import { Outlet } from "react-router";
import { useState } from "react";
import NavBar from "../components/NavBar";

const Root = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="font-cairo min-h-screen bg-[radial-gradient(circle_at_top_left,var(--color-page-glow),transparent_32%),radial-gradient(circle_at_top_right,rgba(255,221,185,0.25),transparent_28%),var(--color-page-bg)] px-4 py-5 sm:px-6 md:px-10 lg:px-16 lg:py-7">
      <NavBar
        logoSrc="/public/assets/proteam-text.png"
        searchValue={searchQuery}
        onSearchChange={(event) => setSearchQuery(event.target.value)}
      />
      <Outlet context={{ searchQuery }} />
    </div>
  );
};

export default Root;
