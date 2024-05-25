import { ColumnDef } from "@tanstack/solid-table";
import { User } from "api-contract";

export const Columns: ColumnDef<User>[] = [
  {
    id: "id",
    accessorKey: "id",
    header: "ID",
    meta: { title: "ID", type: "string" },
    size: 6 / 1,
  },
  {
    id: "username",
    accessorKey: "username",
    header: "Username",
    meta: { title: "Username", type: "string" },
    size: 6 / 1,
  },
  {
    id: "fullName",
    accessorKey: "fullName",
    header: "Full Name",
    meta: { title: "Full Name", type: "string" },
    size: 6 / 1,
  },
  {
    id: "role",
    accessorKey: "role",
    header: "Role",
    meta: {
      title: "Role",
      type: "select",
      options: [
        { value: "ADMIN", label: "Admin" },
        { value: "USER", label: "User" },
      ],
    },
    size: 6 / 1,
  },
];
