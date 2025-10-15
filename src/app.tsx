import { RouterProvider } from "react-router/dom";
import { router } from "./router";
import { ThemeProvider } from "./hooks/use-theme";

export const App = () => {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />;
    </ThemeProvider>
  );
};
