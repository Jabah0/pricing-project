import { ColumnsIcon, FilterIcon } from "@/assets/icons";
import { useLocale } from "@/features/locale/LocaleProvider";
import { Show } from "solid-js";

export const TableContext = (props: {
  showChooser: () => void;
  exportExcel: () => void;
  clearFiltering: () => void;
  isFiltering: boolean;
}) => {
  const locale = useLocale();

  return (
    <div
      class="flex flex-col gap-2 h-fit w-fit border border-gray-600 bg-backPrimary px-2 py-4 
      text-text"
    >
      <button
        class="flex items-center justify-start gap-2 w-full px-2 bg-backgroundSec 
        shadow-lg"
        onClick={() => props.showChooser()}
      >
        <ColumnsIcon class="text-blue-700" />
        <p>{locale.t("columnsChooser")}</p>
      </button>

      <Show when={props.isFiltering}>
        <button
          class="flex items-center justify-start gap-2 w-full px-2 bg-backgroundSec 
          shadow-lg"
          onClick={() => props.clearFiltering()}
        >
          <FilterIcon class="text-blue-700" />
          <p>{locale.t("disableFiltering")}</p>
        </button>
      </Show>
    </div>
  );
};
