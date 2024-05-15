import { Table } from "@/components/Table";
import { Columns } from "./Columns";
import { MedServiceListService } from "../services/MedServiceListService";

export const MedServicesTable = () => {
  const service = MedServiceListService();

  const medServicesData = () => service.servicesData();

  const onOrderChange = (sortBy: string, sortDirection: "asc" | "desc") => {
    service.setOrderBy(sortBy);
    service.setOrderDirection(sortDirection);
  };

  return (
    <div class="h-[47rem] md:h-[30rem]">
      <Table
        columns={Columns}
        data={medServicesData()}
        onSort={onOrderChange}
      />
    </div>
  );
};
