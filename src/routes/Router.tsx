import { Root } from "../Root";
import { AuthLayout, DashboardLayout } from "../layouts";
import {
  LoginPage,
  DashboardPage,
  ProjectPage,
  NewProjectPage,
  EditProjectPage
} from "../pages";

import { createBrowserRouter } from "react-router-dom";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "dashboard",
        element: <DashboardLayout />,

        children: [
          {
            path: "",
            element: <DashboardPage />,
          },
          {
            path: "projects",
            element: <ProjectPage />,
          },
          {
            path: "new-project",
            element: <NewProjectPage />,
          },
          {
            path: "edit-project",
            element: <EditProjectPage />,
          }
        ],
      },

      {
        path: "auth",
        element: <AuthLayout />,
        children: [
          {
            path: "login",
            element: <LoginPage />,
          },
        ],
      },
    ],
  },
]);
