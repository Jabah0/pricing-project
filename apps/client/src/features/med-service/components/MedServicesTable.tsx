import { Table } from "@/components/Table";
import { Columns } from "./Columns";
import { MedServiceListService } from "../services/MedServiceListService";

export const MedServicesTable = () => {
  const service = MedServiceListService();

  const medServicesData = () => service.servicesData();

  return (
    <div class="">
      <Table columns={Columns} data={medServicesData()} />
    </div>
  );
};
