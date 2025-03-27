import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { UserProvider } from "./context/Context.jsx";
import { LocalProvider } from "./context/LocalContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <LocalProvider>
        <App />
      </LocalProvider>
    </UserProvider>
  </StrictMode>
);
