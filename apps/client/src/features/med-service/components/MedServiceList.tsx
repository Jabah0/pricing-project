import { For, Match, Switch, createSignal } from "solid-js";
import { MedServiceItem } from "./MedServiceItem";
import { useLocale } from "@/features/locale/locale.context";
import { BiRegularSearchAlt } from "solid-icons/bi";
import { apiClient } from "@/api/api-client";

export const MedServiceList = () => {
  const locale = useLocale();

  const [name, setName] = createSignal("");
  const [code] = createSignal("");
  const [dalilCode] = createSignal("");

  console.log("name", name());

  const servicesQuery = apiClient.medServices.getAll.createQuery(
    () => ["services", code(), name(), dalilCode()], // Function returning an array
    { query: { code: code(), name: name(), dalilCode: dalilCode() } }
  );

  return (
    <div class="flex flex-col gap-6">
      <div>
        <div
          class="flex items-center  border-[0.5px] border-gray-600 rounded-sm h-[2.5rem] 
          w-[16rem] p-2 gap-2"
        >
          <BiRegularSearchAlt class="text-white scale-150" />
          <input
            type="text"
            class="bg-transparent flex-1 text-white"
            placeholder={locale.t("filterService")}
            onChange={(e) => {
              console.log("name", name());
              setName(e.currentTarget.value);
            }}
            value={name()}
          />
        </div>
      </div>
      <Switch>
        <Match when={servicesQuery.isLoading}>
          <p class="text-white">isLoading</p>
        </Match>
        <Match when={servicesQuery.isError && servicesQuery.error}>
          <p class="text-white">Error: {servicesQuery.error?.body as string}</p>
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
