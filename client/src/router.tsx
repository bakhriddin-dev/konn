import { createBrowserRouter } from "react-router";
import { AnalyticsTab, Dashboard, Landing, LinksTab, Login, NotFound, Privacy, SettingsTab, Terms, ThemesTab, UserProfile } from "@/components/pages";
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
    path: "/privacy",
    Component: Privacy,
  },
  {
    path: "/terms",
    Component: Terms,
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
      },
      {
        path: "analytics",
        Component: AnalyticsTab
      },
      {
        path: "settings",
        Component: SettingsTab
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
