import { ColumnDef } from "@tanstack/solid-table";
import { MedService } from "api-contract";

export const Columns: ColumnDef<MedService>[] = [
  {
    id: "id",
    accessorKey: "id",
    header: "ID",
    meta: { title: "ID", type: "string" },
    size: 6 / 1,
  },
  {
    id: "name",
    accessorKey: "name",
    header: "Name",
    meta: { title: "Name", type: "string" },
    size: 6 / 1,
  },
  {
    id: "code",
    accessorKey: "code",
    header: "Code",
    meta: { title: "Code", type: "string" },
    size: 6 / 1,
  },
  {
    id: "dalilName",
    accessorKey: "dalilName",
    header: "Dalil Name",
    meta: { title: "Dalil Name", type: "sting" },
    size: 6 / 1,
  },
  {
    id: "price",
    accessorKey: "price",
    header: "Price",
    meta: { title: "Price", type: "number" },
    size: 6 / 1,
    enableColumnFilter: true,
  },
  {
    id: "unitSize",
    accessorKey: "unitSize",
    header: "Unit Size",
    meta: { title: "Unit Size", type: "number" },
    size: 6 / 1,
  },
];
