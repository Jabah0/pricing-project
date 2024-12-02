import { RawDictionary } from "@/features/locale";
import { useLocale } from "@/features/locale/LocaleProvider";
import { ColumnDef } from "@tanstack/solid-table";
import { MedServicePrices } from "api-contract";

const Header = ({ title }: { title: keyof RawDictionary }) => {
  const locale = useLocale();
  return locale.t(title);
};

export const ServicePricesColumns: ColumnDef<MedServicePrices>[] = [
  {
    id: "username",
    accessorKey: "user.username",
    header: () => <Header title="username" />,
    meta: { title: "username", headerTitle: "username", type: "string" },
    enableColumnFilter: false,
    enableSorting: false,
  },
  {
    id: "price",
    accessorKey: "price",
    header: () => <Header title="price" />,
    meta: { title: "price", headerTitle: "price", type: "number" },
    enableColumnFilter: false,
    enableSorting: false,
  },
  {
    id: "unitSize",
    accessorKey: "unitSize",
    header: () => <Header title="unitSize" />,
    meta: { title: "unitSize", headerTitle: "unitSize", type: "number" },
    enableColumnFilter: false,
    enableSorting: false,
  },
];
