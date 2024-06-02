import { EditableCell } from "@/components/Table";
import { RawDictionary } from "@/features/locale";
import { useLocale } from "@/features/locale/LocaleProvider";
import { ColumnDef } from "@tanstack/solid-table";
import { MedService } from "api-contract";

const Header = ({ title }: { title: keyof RawDictionary }) => {
  const locale = useLocale();
  return locale.t(title);
};

export const Columns: ColumnDef<MedService>[] = [
  {
    id: "id",
    accessorKey: "id",
    header: () => <Header title="id" />,
    meta: { title: "id", type: "string" },
    size: 6 / 1,
    enableColumnFilter: false,
  },
  {
    id: "name",
    accessorKey: "name",
    header: () => <Header title="service" />,
    meta: { title: "service", type: "string" },
    size: 6 / 1,
  },
  {
    id: "code",
    accessorKey: "code",
    header: () => <Header title="serviceCode" />,
    meta: { title: "serviceCode", type: "string" },
    size: 6 / 1,
  },
  {
    id: "dalilCode",
    accessorKey: "dalilCode",
    header: () => <Header title="dalilCode" />,
    meta: { title: "dalilCode", type: "string" },
    size: 6 / 1,
  },
  {
    id: "nationalCode",
    accessorKey: "nationalCode",
    header: () => <Header title="nationalCode" />,
    meta: { title: "nationalCode", type: "string" },
    size: 6 / 1,
  },
  {
    id: "price",
    accessorKey: "price",
    header: () => <Header title="price" />,
    meta: { title: "price", type: "number" },
    size: 6 / 1,
    enableColumnFilter: true,
    cell: ({ row, getValue }) => (
      <EditableCell
        row={row}
        value={getValue() as number | string | string[]}
      />
    ),
  },
  {
    id: "unitSize",
    accessorKey: "unitSize",
    header: () => <Header title="unitSize" />,
    meta: { title: "unitSize", type: "number" },
    size: 6 / 1,
    cell: ({ row, getValue }) => (
      <EditableCell
        row={row}
        value={getValue() as number | string | string[]}
      />
    ),
  },
];
