import { useLocale } from "@/features/locale/LocaleProvider";
import { ColumnDef } from "@tanstack/solid-table";
import { User } from "api-contract";

export const Columns: ColumnDef<User>[] = [
  {
    id: "id",
    accessorKey: "id",
    header: () => {
      const locale = useLocale();
      return locale.t("id");
    },
    meta: { title: "id", type: "string" },
    size: 6 / 1,
  },
  {
    id: "username",
    accessorKey: "username",
    header: () => {
      const locale = useLocale();
      return locale.t("username");
    },
    meta: { title: "username", type: "string" },
    size: 6 / 1,
  },
  {
    id: "fullName",
    accessorKey: "fullName",
    header: () => {
      const locale = useLocale();
      return locale.t("fullName");
    },
    meta: { title: "fullName", type: "string" },
    size: 6 / 1,
  },
  {
    id: "role",
    accessorKey: "role",
    header: () => {
      const locale = useLocale();
      return locale.t("role");
    },
    cell: ({ row }) => {
      const locale = useLocale();
      return <p>{locale.t(row.original.role)}</p>;
    },
    meta: {
      title: "role",
      type: "select",
      options: [
        { value: "ADMIN", label: "Admin" },
        { value: "USER", label: "User" },
      ],
    },
    size: 6 / 1,
  },
];
