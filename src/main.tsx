import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { store } from "./store/store";
import { App } from "./app";
import "./styles/index.css";

const root = createRoot(document.getElementById("root")!);
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

root.render(
  <GoogleOAuthProvider clientId={CLIENT_ID}>
    <Provider store={store}>
      <App />
    </Provider>
  </GoogleOAuthProvider>
);
