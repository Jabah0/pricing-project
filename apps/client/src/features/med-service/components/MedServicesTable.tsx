import { Table } from "@/components/Table";
import { Columns } from "./Columns";
import { MedServiceListService } from "../services/MedServiceListService";

export const MedServicesTable = () => {
  const service = MedServiceListService();

  return (
    <div>
      <Table columns={Columns} data={service.servicesData()} />
    </div>
  );
};
