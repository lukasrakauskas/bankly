import React from "react";
import ReactDOM from "react-dom/client";
import { setupWorker } from "msw";
import App from "./app";
import "./index.css";

import { handlers } from "./api/handlers";

const worker = setupWorker(...handlers);

async function prepare() {
  if (import.meta.env.DEV) {
    return worker.start();
  }
  return undefined;
}

prepare().then(() => ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
));
