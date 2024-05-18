import { ColumnDef } from "@tanstack/solid-table";
import { User } from "api-contract";

export const Columns: ColumnDef<User>[] = [
  {
    id: "id",
    accessorKey: "id",
    header: "ID",
    meta: "ID",
    size: 6 / 1,
  },
  {
    id: "username",
    accessorKey: "username",
    header: "Username",
    meta: "Username",
    size: 6 / 1,
  },
  {
    id: "fullName",
    accessorKey: "fullName",
    header: "Full Name",
    meta: "Full Name",
    size: 6 / 1,
  },
  {
    id: "role",
    accessorKey: "role",
    header: "Role",
    meta: "Role",
    size: 6 / 1,
  },
];
