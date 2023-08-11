import React from "react";
import ReactDOM from "react-dom/client";
import { setupWorker } from "msw";
import App from "./app";
import { handlers } from "./api/handlers";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";

import "@formatjs/intl-datetimeformat/polyfill";
import "@formatjs/intl-datetimeformat/locale-data/en-GB";

import "@formatjs/intl-numberformat/polyfill";
import "@formatjs/intl-numberformat/locale-data/en-GB";

const worker = setupWorker(...handlers);

async function prepare() {
  if (import.meta.env.DEV) {
    return worker.start();
  }
  return undefined;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      refetchIntervalInBackground: false,
    },
  },
});

prepare().then(() =>
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </React.StrictMode>
  )
);
