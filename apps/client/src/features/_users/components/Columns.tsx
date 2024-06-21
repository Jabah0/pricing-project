import { useLocale } from "@/features/locale/LocaleProvider";
import { ColumnDef } from "@tanstack/solid-table";
import { User } from "api-contract";

export const Columns: () => ColumnDef<User>[] = () => {
  const locale = useLocale();

  return [
    {
      id: "id",
      accessorKey: "id",
      header: () => locale.t("id"),
      meta: { title: "id", headerTitle: "id", type: "string" },
      size: 6 / 1,
    },
    {
      id: "username",
      accessorKey: "username",
      header: () => locale.t("username"),
      cell: (param) => <p>{param.row.original.username}</p>,
      meta: { title: "username", headerTitle: "username", type: "string" },
      size: 6 / 1,
    },
    {
      id: "fullName",
      accessorKey: "fullName",
      header: () => locale.t("fullName"),
      cell: (param) => <p>{param.row.original.fullName}</p>,
      meta: { title: "fullName", headerTitle: "fullName", type: "string" },
      size: 6 / 1,
    },
    {
      id: "role",
      accessorKey: "role",
      header: () => locale.t("role"),
      cell: (param) => <p>{locale.t(param.row.original.role)}</p>,
      meta: {
        title: "role",
        headerTitle: "role",
        type: "select",
        options: [
          { value: "ADMIN", label: "ADMIN" },
          { value: "USER", label: "USER" },
        ],
      },
      size: 6 / 1,
    },
  ];
};
