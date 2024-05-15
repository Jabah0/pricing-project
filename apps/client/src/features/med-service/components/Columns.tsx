import { TableHeader } from "@/components/TableHeader";
import { ColumnDef } from "@tanstack/solid-table";
import { MedService } from "api-contract";

export const Columns: ColumnDef<MedService>[] = [
  {
    id: "id",
    accessorKey: "id",
    size: 6 / 1,
    header: (param) => (
      <TableHeader
        title="ID"
        isSorted={param.column.getIsSorted()}
        toggleSort={() => param.column.toggleSorting()}
        onHide={() => param.column.toggleVisibility()}
      />
    ),
  },
  {
    id: "name",
    accessorKey: "name",
    header: "Name",
    size: 6 / 1,
  },
  {
    id: "code",
    accessorKey: "code",
    header: "Code",
    size: 6 / 1,
  },
  {
    id: "dalilName",
    accessorKey: "dalilName",
    header: "Dalil Name",
    size: 6 / 1,
  },
  {
    id: "price",
    accessorKey: "price",
    header: (param) => (
      <TableHeader
        title="Price"
        isSorted={param.column.getIsSorted()}
        toggleSort={() => param.column.toggleSorting()}
      />
    ),
  },
  {
    id: "unitSize",
    accessorKey: "unitSize",
    header: "Unit Size",
    size: 6 / 1,
  },
];
