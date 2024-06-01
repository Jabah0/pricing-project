import { NumberFilter, Table } from "@/components/Table";
import { Columns } from "./Columns";
import { MedServiceListService } from "../services/MedServiceListService";
import { useLocale } from "@/features/locale/locale.context";
import { ColumnFiltersState } from "@tanstack/solid-table";
import { EditState } from "@/components/solid-table";
import { MedService } from "api-contract";

export const MedServicesList = () => {
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
    service.setNationalCode(undefined);
    service.setServicePrice(undefined);
    service.setServiceUnitSize(undefined);
    filters.map((item) => {
      item.id === "name" && service.setServiceName(item.value as string);
      item.id === "code" && service.setServiceCode(item.value as string);
      item.id === "dalilCode" && service.setDalilCode(item.value as string);
      item.id === "nationalCode" &&
        service.setNationalCode(item.value as string);
      item.id === "price" &&
        service.setServicePrice(item.value as NumberFilter);
      item.id === "unitSize" &&
        service.setServiceUnitSize(item.value as NumberFilter);
    });
  };

  const onUpdateService = (updateData: EditState<MedService>) => {
    service.onUpdateService(updateData.rowId, updateData.values);
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
          onUpdate={onUpdateService}
          isFetching={service.servicesQuery().isFetching}
          isFetchingNextPage={service.servicesQuery().isFetchingNextPage}
          isFetchSuccess={service.servicesQuery().isSuccess}
          getRowId={(row: MedService) => row.id}
        />
      </div>
    </div>
  );
};
