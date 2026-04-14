import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Root from "./Pages/Root";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Dashboard from "./Pages/Dashboard";
import CreateTask from "./Pages/CreateTask";
import EditTask from "./Pages/EditTask";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/dashboard",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/tasks/create",
    element: <CreateTask />,
  },
  {
    path: "/tasks/:taskId/edit",
    element: <EditTask />,
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
        newestOnTop
        pauseOnFocusLoss={false}
        closeOnClick
        draggable
        style={{ zIndex: 9999 }}
        toastStyle={{
          borderRadius: "18px",
          boxShadow: "0 18px 45px rgba(26,36,68,0.18)",
        }}
      />
      <RouterProvider router={router} />
    </>
  </StrictMode>,
);
