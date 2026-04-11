import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Root from "./Pages/Root";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Dashboard from "./Pages/Dashboard";
import CreateTask from "./Pages/CreateTask";
import EditTask from "./Pages/EditTask";

const router = createBrowserRouter([
  {
    path: "",
    element: <Root />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
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
    element: <Dashboard />,
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
    <RouterProvider router={router} />
  </StrictMode>,
);
