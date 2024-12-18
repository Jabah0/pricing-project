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
    meta: { title: "id", headerTitle: "id", type: "string" },
    enableColumnFilter: false,
  },
  {
    id: "name",
    accessorKey: "name",
    header: () => <Header title="service" />,
    meta: { title: "service", headerTitle: "service", type: "string" },
  },
  {
    id: "code",
    accessorKey: "code",
    header: () => <Header title="serviceCode" />,
    meta: { title: "serviceCode", headerTitle: "serviceCode", type: "string" },
  },
  {
    id: "dalilCode",
    accessorKey: "dalilCode",
    header: () => <Header title="dalilCode" />,
    meta: { title: "dalilCode", headerTitle: "dalilCode", type: "string" },
  },
  {
    id: "nationalCode",
    accessorKey: "nationalCode",
    header: () => <Header title="nationalCode" />,
    meta: {
      title: "nationalCode",
      headerTitle: "nationalCode",
      type: "string",
    },
  },
  {
    id: "price",
    accessorKey: "price",
    header: () => <Header title="price" />,
    meta: { title: "price", headerTitle: "price", type: "number" },

    enableColumnFilter: true,
    cell: ({ row }) => (
      <EditableCell
        row={row}
        column="price"
        value={row.original.price as number | string | string[]}
      />
    ),
  },
  {
    id: "unitSize",
    accessorKey: "unitSize",
    header: () => <Header title="unitSize" />,
    meta: { title: "unitSize", headerTitle: "unitSize", type: "number" },

    cell: ({ row }) => (
      <EditableCell
        row={row}
        column="unitSize"
        value={row.original.unitSize as number | string | string[]}
      />
    ),
  },
];
