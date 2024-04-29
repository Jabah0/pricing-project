import { For, Match, Switch } from "solid-js";
import { useLocale } from "@/features/locale/locale.context";
import { MedServiceItem } from "./MedServiceItem";
import { MedServiceListService } from "../services/MedServiceListService";
import { SpinnersBlocksShuffleIcon } from "@/assets/icons/SpinnersBlocksIcon";
import { SearchIcon } from "@/assets/icons/SearchIcon";

export const MedServiceList = () => {
  const locale = useLocale();

  const medServicesService = MedServiceListService();

  return (
    <div class="flex flex-col gap-6">
      <div class="flex justify-between">
        <div class="flex gap-2">
          <div
            class="flex items-center border-[0.5px] border-gray-600 rounded-sm 
          shadow-lg h-[2.5rem] w-[16rem] p-2 gap-2"
          >
            <SearchIcon class="text-white scale-150" />
            <input
              type="text"
              class="bg-transparent flex-1 text-white w-full"
              placeholder={locale.t("searchServiceName")}
              onInput={(e) => {
                medServicesService.setServiceName(e.target.value);
              }}
            />
          </div>
          <div
            class="flex items-center  border-[0.5px] border-gray-600 rounded-sm 
            shadow-lg h-[2.5rem] w-[16rem] p-2 gap-2"
          >
            <SearchIcon class="text-white scale-150" />
            <input
              type="text"
              class="bg-transparent flex-1 text-white w-full"
              placeholder={locale.t("searchServiceCode")}
              onInput={(e) => {
                medServicesService.setServiceCode(e.target.value);
              }}
            />
          </div>
        </div>
        <div class="flex gap-2">
          <button
            onClick={() => medServicesService.setIsMy((pre) => !pre)}
            class="h-[2.5rem] rounded-sm shadow-lg bg-backgroundSec text-white text-center
            p-2"
          >
            {locale.t(medServicesService.isMy() ? "allServices" : "myServices")}
          </button>
        </div>
      </div>

      <Switch>
        <Match when={medServicesService.servicesQuery().isLoading}>
          <div class="flex justify-center items-center h-full">
            <SpinnersBlocksShuffleIcon class="text-primary h-[12rem] w-[12rem]" />
          </div>
        </Match>
        <Match
          when={
            medServicesService.servicesQuery().isError &&
            medServicesService.servicesQuery().error
          }
        >
          <p class="text-white">
            Error: {medServicesService.servicesQuery().error?.body as string}
          </p>
        </Match>
        <Match when={medServicesService.servicesQuery().isSuccess}>
          <div class="flex flex-col gap-4">
            <Switch>
              <Match
                when={
                  medServicesService.servicesQuery().data?.body.length === 0
                }
              >
                <p class="text-white text-center font-bold">
                  {locale.t("noData")}
                </p>
              </Match>
              <Match
                when={
                  medServicesService.servicesQuery().data?.body.length !== 0
                }
              >
                <For each={medServicesService.servicesQuery().data?.body}>
                  {(ser) => (
                    <MedServiceItem
                      updateServicePrice={
                        medServicesService.onUpdateServicePrice
                      }
                      updateServiceUnitSize={
                        medServicesService.onUpdateServicePrice
                      }
                      medService={ser}
                    />
                  )}
                </For>
              </Match>
            </Switch>
          </div>
        </Match>
      </Switch>
    </div>
  );
};
