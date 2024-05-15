import { For, Match, Show, Switch, createEffect, createSignal } from "solid-js";
import { useLocale } from "@/features/locale/locale.context";
import { MedServiceItem } from "./MedServiceItem";
import { MedServiceListService } from "../services/MedServiceListService";
import { SpinnersBlocksShuffleIcon } from "@/assets/icons/SpinnersBlocksIcon";
import { SearchIcon } from "@/assets/icons/SearchIcon";
import { DotsRotateIcon } from "@/assets/icons/DotsRotateIcon";

export const MedServiceList = () => {
  const locale = useLocale();

  const medServicesService = MedServiceListService();

  const [lastItem, setLastItem] = createSignal<HTMLElement>(
    document.getElementById("lastItem")!
  );

  createEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (
        entries[0].isIntersecting &&
        !medServicesService.servicesQuery().isFetchingNextPage
      ) {
        console.log("fetch executed");
        medServicesService.servicesQuery().fetchNextPage();
      }
    });

    if (medServicesService.servicesQuery().isSuccess)
      setLastItem(document.getElementById("lastItem")!);

    if (lastItem()) observer.observe(lastItem());

    return () => observer.disconnect();
  });

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
          <div class="flex justify-center items-center gap-2 bg-backPrimary shadow-lg px-2 rounded-sm">
            <button
              onClick={() => medServicesService.setIsMy(false)}
              class={`flex justify-center items-center h-[2rem] rounded-sm
              ${!medServicesService.isMy() ? "bg-backgroundSec text-white shadow-lg" : "bg-transparent text-gray-400"} 
              p-2 text-center`}
              disabled={!medServicesService.isMy()}
            >
              {locale.t("allServices")}
            </button>
            <button
              onClick={() => medServicesService.setIsMy(true)}
              class={`flex justify-center items-center h-[2rem] rounded-sm
              ${medServicesService.isMy() ? "bg-backgroundSec text-white shadow-lg" : "bg-transparent text-gray-400"} 
              p-2 text-center`}
              disabled={medServicesService.isMy()}
            >
              {locale.t("myServices")}
            </button>
          </div>
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
              <Match when={medServicesService.servicesData().length === 0}>
                <p class="text-white text-center font-bold">
                  {locale.t("noData")}
                </p>
              </Match>
              <Match when={medServicesService.servicesData().length > 0}>
                <div class="flex flex-col gap-2 overflow-auto h-[42rem] md:h-[27rem]">
                  <For each={medServicesService.servicesData()}>
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
                </div>
                <div id="lastItem" />
                <Show
                  when={medServicesService.servicesQuery().isFetchingNextPage}
                >
                  <div class="flex justify-center items-center w-full">
                    <DotsRotateIcon class="text-primary h-[2rem] w-[2rem]" />
                  </div>
                </Show>
              </Match>
            </Switch>
          </div>
        </Match>
      </Switch>
    </div>
  );
};
