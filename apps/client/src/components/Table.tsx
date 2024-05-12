import { SortAscendingIcon } from "@/assets/icons/SortAscendingIcon";
import { SortDescendingIcon } from "@/assets/icons/SortDescendingIcon";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  ColumnDef,
  createSolidTable,
} from "@tanstack/solid-table";
import { createSignal, For, Show } from "solid-js";

type Props<T> = {
  columns: Array<ColumnDef<T>>;
  data: Array<T>;
};

export const Table = <T extends object>(props: Props<T>) => {
  const [sorting, setSorting] = createSignal<SortingState>([]);

  const table = createSolidTable({
    data: props.data,
    columns: props.columns,
    state: {
      get sorting() {
        return sorting();
      },
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  return (
    <div class="p-1 w-full h-full bg-backPrimary rounded-md shadow-lg text-white">
      <table class="w-full h-full">
        <thead>
          <For each={table.getHeaderGroups()}>
            {(headerGroup) => (
              <tr class="shadow-lg h-10">
                <For each={headerGroup.headers}>
                  {(header) => (
                    <th colSpan={header.colSpan} class="text-start">
                      <Show when={!header.isPlaceholder}>
                        <div
                          class={`flex gap-1 items-center
                            ${
                              header.column.getCanSort()
                                ? "cursor-pointer select-none"
                                : undefined
                            }`}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: (
                              <SortAscendingIcon class="text-primary h-6 w-6 drop-shadow" />
                            ),
                            desc: (
                              <SortDescendingIcon class="text-primary h-6 w-6 drop-shadow" />
                            ),
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      </Show>
                    </th>
                  )}
                </For>
              </tr>
            )}
          </For>
        </thead>
        <tbody>
          <For each={table.getRowModel().rows}>
            {(row) => (
              <tr class="h-10 border-y border-y-background">
                <For each={row.getVisibleCells()}>
                  {(cell) => (
                    <td>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  )}
                </For>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </div>
  );
};
