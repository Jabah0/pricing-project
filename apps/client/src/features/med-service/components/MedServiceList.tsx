import { For, Match, Switch, createSignal } from "solid-js";
import { BiRegularSearchAlt } from "solid-icons/bi";
import { useLocale } from "@/features/locale/locale.context";
import { apiClient } from "@/api/api-client";
import { MedServiceItem } from "./MedServiceItem";

export const MedServiceList = () => {
  const locale = useLocale();

  const [serviceName, setServiceName] = createSignal<string>();
  const [serviceCode, setServiceCode] = createSignal<string>();

  const servicesQuery = apiClient.medServices.getAll.createQuery(
    () => ["services", serviceName(), serviceCode()],
    {
      query: {
        get name() {
          return serviceName();
        },
        get code() {
          return serviceCode();
        },
      },
    }
  );

  return (
    <div class="flex flex-col gap-6">
      <div class="flex gap-2">
        <div
          class="flex items-center border-[0.5px] border-gray-600 rounded-sm 
          shadow-lg h-[2.5rem] w-[16rem] p-2 gap-2"
        >
          <BiRegularSearchAlt class="text-white scale-150" />
          <input
            type="text"
            class="bg-transparent flex-1 text-white w-full"
            placeholder={locale.t("filterServiceName")}
            onInput={(e) => {
              setServiceName(e.target.value);
            }}
          />
        </div>
        <div
          class="flex items-center  border-[0.5px] border-gray-600 rounded-sm 
          shadow-lg h-[2.5rem] w-[16rem] p-2 gap-2"
        >
          <BiRegularSearchAlt class="text-white scale-150" />
          <input
            type="text"
            class="bg-transparent flex-1 text-white w-full"
            placeholder={locale.t("filterServiceCode")}
            onInput={(e) => {
              setServiceCode(e.target.value);
            }}
          />
        </div>
      </div>
      <Switch>
        <Match when={servicesQuery.isLoading}>
          <div class="flex justify-center items-center h-full">
            <p class="text-white">isLoading</p>
          </div>
        </Match>
        <Match when={servicesQuery.isError && servicesQuery.error}>
          <p class="text-white">Error: {servicesQuery.error?.body as string}</p>
        </Match>
        <Match when={servicesQuery.isSuccess}>
          <div class="flex flex-col gap-4">
            <Switch>
              <Match when={servicesQuery.data?.body.length === 0}>
                <p class="text-white text-center font-bold">
                  {locale.t("noData")}
                </p>
              </Match>
              <Match when={servicesQuery.data?.body.length !== 0}>
                <For each={servicesQuery.data?.body}>
                  {(ser) => <MedServiceItem medService={ser} />}
                </For>
              </Match>
            </Switch>
          </div>
        </Match>
      </Switch>
    </div>
  );
};
