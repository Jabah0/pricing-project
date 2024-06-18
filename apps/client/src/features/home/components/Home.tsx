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

  const [series] = createSignal([pricedServices(), notPricedServices()]);
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
            width={400}
            type="donut"
            options={options()}
            series={series()}
          />
        </div>
        <div class="flex flex-col gap-14 bg-backgroundForm drop-shadow rounded-md p-6">
          <div class="bg-secondary rounded-md p-6">
            <p class="text-white drop-shadow-lg">
              {locale.t("pricedServices")}: {pricedServices()}
            </p>
          </div>
          <div class="flex flex-col gap-20 bg-secondary rounded-md p-6">
            <p class="text-white drop-shadow-lg">
              {locale.t("notPricedServices")}: {notPricedServices()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
