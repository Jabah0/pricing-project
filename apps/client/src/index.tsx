/* @refresh reload */
import { render } from "solid-js/web";
import setupLocatorUI from "@locator/runtime";

import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import { apiClient } from "./api/api-client";
import { LocaleProvider } from "./features/locale/LocaleProvider";
import { DarkModProvider } from "./features/layout/services/DarkModService";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: (error: any) => {
        if (error.status === 401) {
          apiClient.auth.refresh.query().then((res: any) => {
            if (res.status === 401) window.location.href = "/auth/login";
          });
        }
      },
    },
    mutations: {
      onError: (error: any) => {
        if (error.status === 401) {
          apiClient.auth.refresh.query().then((res: any) => {
            if (res.status === 401) window.location.href = "/auth/login";
          });
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
      <LocaleProvider>
        <DarkModProvider>
          <App />
        </DarkModProvider>
      </LocaleProvider>
    </QueryClientProvider>
  ),

  root!
);
