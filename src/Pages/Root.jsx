import { Outlet } from "react-router";
import NavBar from "../components/NavBar";

const Root = () => {
  return (
    <div className="font-cairo min-h-screen bg-[#eef3f8] px-20 py-7">
      <NavBar logoSrc="/public/assets/proteam.logo.png" />
      <Outlet />
    </div>
  );
};

export default Root;
