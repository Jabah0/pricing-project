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
    cell: (param) => <p>{param.row.original.username}</p>,
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
    cell: (param) => <p>{param.row.original.fullName}</p>,
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
    cell: (param) => {
      const locale = useLocale();
      return <p>{locale.t(param.row.original.role)}</p>;
    },
    meta: {
      title: "role",
      type: "select",
      options: [
        { value: "ADMIN", label: "ADMIN" },
        { value: "USER", label: "USER" },
      ],
    },
    size: 6 / 1,
  },
];
