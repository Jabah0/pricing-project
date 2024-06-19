import { createSignal } from "solid-js";
import { SolidApexCharts } from "solid-apexcharts";
import { ApexOptions } from "apexcharts";
import { useLocale } from "@/features/locale/LocaleProvider";
import { apiClient } from "@/api/api-client";

export const Home = () => {
  const locale = useLocale();

  const userStatus = apiClient.users.servicesStatus.createQuery(
    () => ["userStatus"],
    {}
  );

  const pricedServices = () => userStatus.data?.body.pricedServices || 0;
  const totalServices = () => userStatus.data?.body.totalServices || 0;
  const notPricedServices = () => totalServices() - pricedServices();

  const series = () => [pricedServices(), notPricedServices()];
  const [options] = createSignal<ApexOptions>({
    labels: [locale.t("priced") || "", locale.t("notPriced") || ""],
    colors: ["#6365f1", "#3b3d91"],
    legend: {
      position: "bottom",
      labels: {
        colors: ["#fff", "#fff"],
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  });

  return (
    <div class="flex">
      <div class="flex flex-wrap gap-20">
        <div class="bg-backgroundForm drop-shadow-lg rounded-md">
          <SolidApexCharts
            width={350}
            type="donut"
            options={options()}
            series={series()}
          />
        </div>
        <div class="flex flex-col justify-between gap-4">
          <div class="flex justify-between items-center gap-3 bg-backgroundForm drop-shadow rounded-md p-3">
            <div class="flex items-center justify-center border-2 border-textSecondary bg-secondary rounded-md p-3">
              <p class="text-white drop-shadow-lg">{locale.t("allServices")}</p>
            </div>
            <div class="flex items-center justify-center border-2 border-textSecondary bg-secondary rounded-md p-3 min-w-[4rem]">
              <p class="text-white drop-shadow-lg">{totalServices()}</p>
            </div>
          </div>
          <div class="flex justify-between items-center bg-backgroundForm drop-shadow rounded-md p-3">
            <div class="flex items-center justify-center border-2 border-textSecondary bg-secondary rounded-md p-3">
              <p class="text-white drop-shadow-lg">
                {locale.t("pricedServices")}
              </p>
            </div>
            <div class="flex items-center justify-center border-2 border-textSecondary bg-secondary rounded-md p-3 min-w-[4rem]">
              <p class="text-white drop-shadow-lg">{pricedServices()}</p>
            </div>
          </div>
          <div class="flex justify-between items-center gap-3 bg-backgroundForm drop-shadow rounded-md p-3">
            <div class="flex items-center justify-center border-2 border-textSecondary bg-secondary rounded-md p-3">
              <p class="text-white drop-shadow-lg">
                {locale.t("notPricedServices")}
              </p>
            </div>
            <div class="flex items-center justify-center border-2 border-textSecondary bg-secondary rounded-md p-3 min-w-[4rem]">
              <p class="text-white drop-shadow-lg">{notPricedServices()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
