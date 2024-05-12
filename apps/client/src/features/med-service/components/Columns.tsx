import { ColumnDef } from "@tanstack/solid-table";
import { MedService } from "api-contract";

export const Columns: ColumnDef<MedService>[] = [
  {
    id: "id",
    accessorKey: "id",
    header: "ID",
    aggregationFn: () => console.log("ID"),
  },
  {
    id: "name",
    accessorKey: "name",
    header: "Name",
    aggregationFn: () => console.log("Name"),
  },
  {
    id: "code",
    accessorKey: "code",
    header: "Code",
    aggregationFn: () => console.log("Code"),
  },
  {
    id: "dalilName",
    accessorKey: "dalilName",
    header: "Dalil Name",
    aggregationFn: () => console.log("Dalil Name"),
  },
  {
    id: "price",
    accessorKey: "price",
    header: "Price",
    aggregationFn: () => console.log("Price"),
  },
  {
    id: "unitSize",
    accessorKey: "unitSize",
    header: "Unit Size",
    aggregationFn: () => console.log("Unit Size"),
  },
];
