import { ColumnDef } from "@tanstack/solid-table";
import { MedService } from "api-contract";

export const Columns: ColumnDef<MedService>[] = [
  {
    id: "id",
    accessorKey: "id",
    header: "ID",
    meta: "ID",
    size: 6 / 1,
  },
  {
    id: "name",
    accessorKey: "name",
    header: "Name",
    meta: "Name",
    size: 6 / 1,
  },
  {
    id: "code",
    accessorKey: "code",
    header: "Code",
    meta: "Code",
    size: 6 / 1,
  },
  {
    id: "dalilName",
    accessorKey: "dalilName",
    header: "Dalil Name",
    meta: "Dalil Name",
    size: 6 / 1,
  },
  {
    id: "price",
    accessorKey: "price",
    header: "Price",
    meta: "Price",
  },
  {
    id: "unitSize",
    accessorKey: "unitSize",
    header: "Unit Size",
    meta: "Unit Size",
    size: 6 / 1,
  },
];
