import React from "react";
import ReactDOM from "react-dom/client";
import { setupWorker } from "msw";
import App from "./app";
import { handlers } from "./api/handlers";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";

const worker = setupWorker(...handlers);

async function prepare() {
  if (import.meta.env.DEV) {
    return worker.start();
  }
  return undefined;
}

const queryClient = new QueryClient();

prepare().then(() =>
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </React.StrictMode>
  )
);
