const NavBar = ({
  logoSrc,
  logoAlt = "logo",
  searchPlaceholder = "Search...",
  searchValue = "",
  onSearchChange,
  logoutText = "Logout",
  onLogout,
}) => {
  return (
    <div className="w-full rounded-2xl  flex items-center gap-4">
      <div className="shrink-0 w-12 h-12 rounded-xl bg-white flex items-center justify-center overflow-hidden border border-slate-200">
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
          className="w-full h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none focus:border-orange-400"
        />
      </div>

      <button
        type="button"
        onClick={onLogout}
        className="h-12 px-5 rounded-xl border border-orange-300 text-orange-500 bg-orange-50 hover:bg-orange-100 transition font-medium"
      >
        {logoutText}
      </button>
    </div>
  );
};

export default NavBar;
