import { For, Match, Switch } from "solid-js";
import { apiClient } from "../../../api/api-client";
import { MedServiceItem } from "./MedServiceItem";

export const MedServiceList = () => {
  const servicesQuery = apiClient.medServices.getAll.createQuery(
    () => ["medServices"],
    () => {}
  );

  return (
    <div>
      <Switch>
        <Match when={servicesQuery.isLoading}>
          <p>isLoading</p>
        </Match>
        <Match when={servicesQuery.isError && servicesQuery.error}>
          <p>Error: {servicesQuery.error?.body as string}</p>
        </Match>
        <Match when={servicesQuery.isSuccess}>
          <div class="flex flex-col gap-4">
            <For each={servicesQuery.data?.body}>
              {(ser) => <MedServiceItem medService={ser} />}
            </For>
          </div>
        </Match>
      </Switch>
    </div>
  );
};
