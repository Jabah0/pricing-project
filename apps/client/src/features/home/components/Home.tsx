import { SolidApexCharts } from "solid-apexcharts";
import { HomeService } from "../services/HomeService";

export const Home = () => {
  const service = HomeService();

  return (
    <div class="flex justify-center items-center bg-backgroundForm h-full">
      <div class="flex flex-wrap gap-20">
        <div>
          <SolidApexCharts
            width={700}
            type="donut"
            options={service.options()}
            series={service.series()}
          />
        </div>
      </div>
    </div>
  );
};
