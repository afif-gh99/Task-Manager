import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Root from "./Pages/Root";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [],
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
