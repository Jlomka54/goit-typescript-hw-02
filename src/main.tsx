import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import React from "react";

import "modern-normalize";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
