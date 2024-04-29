import { Match, Switch } from "solid-js";
import { ConfirmIcon } from "@/assets/icons/ConfirmIcon";
import { CancelIcon } from "@/assets/icons/CancelIcon";
import { EditIcon } from "@/assets/icons/EditIcon";

export const EditPriceButton = (props: {
  isEdit?: boolean;
  onEdit?: () => void;
  onCancel?: () => void;
  onSave?: () => void;
}) => {
  return (
    <Switch>
      <Match when={!props.isEdit}>
        <button
          class="flex items-center justify-center bg-backgroundSec rounded-md w-[4.5rem] h-8 p-2 border border-gray-700 text-white
          shadow-lg"
          onClick={props.onEdit}
        >
          <EditIcon class="text-yellow-300" />
        </button>
      </Match>
      <Match when={props.isEdit}>
        <div class="flex gap-2">
          <button
            class="flex items-center justify-center w-8 h-8 bg-backgroundSec rounded-md text-white p-2 shadow-lg border border-gray-700"
            onClick={props.onSave}
          >
            <ConfirmIcon class="scale-150 text-green-500" />
          </button>
          <button
            class="flex items-center justify-center w-8 h-8 bg-backgroundSec rounded-md text-white p-2 shadow-lg border border-gray-700"
            onClick={props.onCancel}
          >
            <CancelIcon class="scale-150 text-red-500" />
          </button>
        </div>
      </Match>
    </Switch>
  );
};
