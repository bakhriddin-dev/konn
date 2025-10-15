import { createBrowserRouter } from "react-router";
import { Landing } from "@/components/pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
]);
