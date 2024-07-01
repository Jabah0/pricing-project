import { apiClient } from "@/api/api-client";
import { useLocale } from "@/features/locale/LocaleProvider";
import { createBreakpoints } from "@solid-primitives/media";
import { ApexOptions } from "apexcharts";
import { createSignal } from "solid-js";

const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1400",
};

export const HomeService = () => {
  const locale = useLocale();

  const matches = createBreakpoints(breakpoints);

  const chartWidth = () => {
    if (matches.xl) return 650;
    else if (matches.lg) return 600;
    else if (matches.md) return 400;
    else if (matches.sm) return 350;
    else return 300;
  };

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
    chartWidth,
  };
};
