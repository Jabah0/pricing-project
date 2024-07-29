import { For, Match, Switch } from "solid-js";
import { CancelIcon } from "@/assets/icons";
import { RawDictionary } from "@/features/locale";
import { useLocale } from "@/features/locale/LocaleProvider";
import { Column } from "@tanstack/solid-table";
import {
  DragDropProvider,
  DragDropSensors,
  DragOverlay,
  SortableProvider,
  createSortable,
  createDroppable,
  createDraggable,
} from "@thisbeyond/solid-dnd";

export const ColumnsChooser = <T extends object>(props: {
  columns: Column<T, unknown>[];
  close: () => void;
}) => {
  const locale = useLocale();

  return (
    <DragDropProvider>
      <div
        class="sticky bottom-0 end-0 h-[20rem] w-[15rem] bg-elementBack border 
      border-gray-600 drop-shadow-lg z-50"
      >
        <div class="flex flex-col gap-2 h-full w-full px-2 py-2">
          <div class="flex items-center justify-start">
            <button onClick={props.close}>
              <CancelIcon class="h-4 w-4 text-red-700" />
            </button>
          </div>
          <Switch>
            <Match when={props.columns.length === 0}>
              <div class="flex flex-col justify-center items-center h-full">
                <p class="text-lg font-bold text-center">
                  {locale.t("noHiddenColumns")}
                </p>
              </div>
            </Match>
            <Match when={props.columns.length > 0}>
              <For each={props.columns}>
                {(column) => <HiddenColumn column={column} />}
              </For>
            </Match>
          </Switch>
        </div>
      </div>
    </DragDropProvider>
  );
};

const HiddenColumn = <T extends object>({
  column,
}: {
  column: Column<T, unknown>;
}) => {
  const locale = useLocale();

  const droppable = createDraggable(column.id);
  return (
    <div
      use:droppable
      draggable
      class="flex items-center justify-start w-full px-2 rounded-sm bg-buttonBack 
      shadow-lg hover:bg-opacity-50"
      onClick={() => column.toggleVisibility()}
    >
      <p>
        {locale.t(column.columnDef.meta?.title as keyof RawDictionary) || ""}
      </p>
    </div>
  );
};
