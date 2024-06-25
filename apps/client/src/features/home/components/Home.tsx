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

  const [barOptions] = createSignal<ApexOptions>({
    yaxis: {
      opposite: true,
    },
  });

  return (
    <div class="flex justify-center items-center bg-backgroundForm h-full">
      <div class="flex flex-wrap gap-20">
        <div>
          <SolidApexCharts
            width={700}
            type="donut"
            options={options()}
            series={series()}
          />
        </div>
      </div>
    </div>
  );
};
