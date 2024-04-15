import { useLocale } from "@/features/locale/locale.context";
import { Match, Switch } from "solid-js";

export const EditPriceButton = (props: {
  isEdit?: boolean;
  onEdit?: () => void;
  onCancel?: () => void;
  onSave?: () => void;
}) => {
  const locale = useLocale();

  return (
    <Switch>
      <Match when={!props.isEdit}>
        <button
          class="bg-buttonBack rounded-md min-w-16 p-2 border border-gray-400 text-white
          shadow-lg"
          onClick={props.onEdit}
        >
          <p>{locale.t("edit")}</p>
        </button>
      </Match>
      <Match when={props.isEdit}>
        <div class="flex">
          <button
            class="min-w-8 bg-green-600 rounded-s-md text-white p-2 
            border-l border-t border-b border-gray-400"
            onClick={props.onSave}
          >
            <p>{locale.t("save")}</p>
          </button>
          <div class="h-11 w-0.5 bg-gray-400" />
          <button
            class="min-w-8 bg-red-600 rounded-e-md text-white p-2
            border-r border-t border-b border-gray-400"
            onClick={props.onCancel}
          >
            <p>{locale.t("cancel")}</p>
          </button>
        </div>
      </Match>
    </Switch>
  );
};
