/* @refresh reload */
import { render } from "solid-js/web";

import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";

const queryClient = new QueryClient();

const root = document.getElementById("root");

render(
  () => (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  ),

  root!
);
