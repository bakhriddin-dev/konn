import { createBrowserRouter } from "react-router";
import { Dashboard, Landing, LinksTab, Login, OAuthFailure } from "@/components/pages";
import { PrivateRoute } from "./components/layouts";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
  },
  {
    path: "/kirish",
    Component: Login,
  },
  {
    path: "/boshqaruv-paneli",
    Component: () => (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "havolalar",
        Component: LinksTab,
      },
    ],
  },
  {
    path: "/oauth-failure",
    Component: OAuthFailure,
  },
]);
