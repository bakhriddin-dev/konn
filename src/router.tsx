import { createBrowserRouter } from "react-router";
import { Dashboard, Landing, Login } from "@/components/pages";

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
    Component: Dashboard,
  },
]);
