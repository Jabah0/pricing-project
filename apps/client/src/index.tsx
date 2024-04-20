/* @refresh reload */
import { render } from "solid-js/web";
import setupLocatorUI from "@locator/runtime";

import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import App from "./App";
const queryClient = new QueryClient();

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
