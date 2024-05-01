/* @refresh reload */
import { render } from "solid-js/web";
import setupLocatorUI from "@locator/runtime";

import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import App from "./App";
import { apiClient } from "./api/api-client";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: (error: any) => {
        if (error.status === 401) {
          try {
            apiClient.auth.refresh.query();
          } catch (err) {
            window.location.href = "/auth/login";
          }
        }
      },
    },
    mutations: {
      onError: (error: any) => {
        if (error.status === 401) {
          window.location.href = "/auth/login";
        }
      },
    },
  },
});

const root = document.getElementById("root");

if (process.env.NODE_ENV === "development") {
  setupLocatorUI();
}

render(
  () => (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  ),

  root!
);
