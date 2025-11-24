import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// API_KEY=7539921b4a20e0839dc493f4f037a285

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
