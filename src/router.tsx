import { createBrowserRouter } from "react-router";
import { Dashboard, Landing, Login, OAuthFailure } from "@/components/pages";
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
  },
  {
    path: "/oauth-failure",
    Component: OAuthFailure,
  },
]);
