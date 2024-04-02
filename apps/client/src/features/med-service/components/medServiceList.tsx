import { For, Match, Switch } from "solid-js";
import { apiClient } from "../../../api-client";

export const MedServiceList = () => {
  const servicesQuery = apiClient.medServices.getAll.createQuery(
    () => ["medServices"],
    () => {}
  );

  return (
    <div>
      <h1 class="text-2xl text-red-700">Hello</h1>
      <Switch>
        <Match when={servicesQuery.isLoading}>
          <p>isLoading</p>
        </Match>
        <Match when={servicesQuery.isError && servicesQuery.error}>
          <p>Error: {servicesQuery.error?.body as string}</p>
        </Match>
        <Match when={servicesQuery.isSuccess}>
          <For each={servicesQuery.data?.body}>
            {(ser) => <h1>{ser.name}</h1>}
          </For>
        </Match>
      </Switch>
    </div>
  );
};
