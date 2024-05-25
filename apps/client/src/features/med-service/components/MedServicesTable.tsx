import { NumberFilter, Table } from "@/components/Table";
import { Columns } from "./Columns";
import { MedServiceListService } from "../services/MedServiceListService";
import { useLocale } from "@/features/locale/locale.context";
import { ColumnFiltersState } from "@tanstack/solid-table";

export const MedServicesTable = () => {
  const locale = useLocale();

  const service = MedServiceListService();

  const medServicesData = () => service.servicesData();

  const onOrderChange = (sortBy?: string, sortDirection?: "asc" | "desc") => {
    service.setOrderBy(sortBy);
    service.setOrderDirection(sortDirection);
  };

  const fetchNextData = () => {
    service.servicesQuery().fetchNextPage();
  };

  const onFilter = (filters: ColumnFiltersState) => {
    service.setServiceName(undefined);
    service.setServiceCode(undefined);
    service.setDalilCode(undefined);
    service.setServicePrice(undefined);
    filters.map((item) => {
      item.id === "name" && service.setServiceName(item.value as string);
      item.id === "code" && service.setServiceCode(item.value as string);
      item.id === "dalilCode" && service.setDalilCode(item.value as string);
      item.id === "price" &&
        service.setServicePrice(item.value as NumberFilter);
    });
  };

  return (
    <div class="flex flex-col gap-4 h-full">
      <div class="flex">
        <div class="flex gap-2">
          <div class="flex justify-center items-center gap-2 bg-backPrimary shadow-lg px-2 rounded-sm h-[2.5rem]">
            <button
              onClick={() => service.setIsMy(false)}
              class={`flex justify-center items-center h-[2rem] rounded-sm
              ${
                !service.isMy()
                  ? "bg-backgroundSec text-white shadow-lg"
                  : "bg-transparent text-gray-400"
              } 
              p-2 text-center`}
              disabled={!service.isMy()}
            >
              {locale.t("allServices")}
            </button>
            <button
              onClick={() => service.setIsMy(true)}
              class={`flex justify-center items-center h-[2rem] rounded-sm
              ${
                service.isMy()
                  ? "bg-backgroundSec text-white shadow-lg"
                  : "bg-transparent text-gray-400"
              } 
              p-2 text-center`}
              disabled={service.isMy()}
            >
              {locale.t("myServices")}
            </button>
          </div>
        </div>
      </div>
      <div id="tableContainer" class="flex-grow overflow-auto">
        <Table
          columns={Columns}
          data={medServicesData()}
          onFetchNextData={fetchNextData}
          onSort={onOrderChange}
          onFilter={onFilter}
          isFetchingNextPage={service.servicesQuery().isFetchingNextPage}
          isFetchSuccess={service.servicesQuery().isSuccess}
        />
      </div>
    </div>
  );
};
