import { createBrowserRouter } from "react-router";
import { Dashboard, Landing, LinksTab, Login, NotFound, ThemesTab, UserProfile } from "@/components/pages";
import { PrivateRoute } from "./components/layouts";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/dashboard",
    Component: () => (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "links",
        Component: LinksTab,
      },
      {
        path: "design",
        Component: ThemesTab
      }
    ],
  },
  {
    path: "/:username",
    Component: UserProfile,
  },
  {
    path: "/not-found",
    Component: NotFound,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
