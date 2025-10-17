import { createBrowserRouter } from "react-router";
import { Landing, Login } from "@/components/pages";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
  },
  {
    path: "/kirish",
    Component: Login,
  },
]);
