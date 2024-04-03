/* @refresh reload */
import { render } from "solid-js/web";

import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import { Route, Router } from "@solidjs/router";
import { MainLayout } from "./features/layout/components/MainLayout";
import { MedServiceList } from "./features/med-service/components/medServiceList";

const queryClient = new QueryClient();

const root = document.getElementById("root");

render(
  () => (
    <QueryClientProvider client={queryClient}>
      <Router root={MainLayout}>
        <Route path="/" component={MedServiceList} />
      </Router>
    </QueryClientProvider>
  ),

  root!
);
