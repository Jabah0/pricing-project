import { apiClient } from "@/api/api-client";
import { useLocale } from "@/features/locale/LocaleProvider";
import { ApexOptions } from "apexcharts";
import { createSignal } from "solid-js";

export const HomeService = () => {
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

  return {
    series,
    options,
  };
};
