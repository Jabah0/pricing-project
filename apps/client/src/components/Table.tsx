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
    //debugTable: true,
  });

  return (
    <div class="p-1 w-full bg-backPrimary rounded-md shadow-lg text-gray-400">
      <table class="w-full">
        <thead>
          <For each={table.getHeaderGroups()}>
            {(headerGroup) => (
              <tr class="shadow-lg h-10 py-4">
                <For each={headerGroup.headers}>
                  {(header) => (
                    <th
                      colSpan={header.colSpan}
                      class="text-start border-e border-gray-600 px-[0.5rem]"
                    >
                      <Show when={!header.isPlaceholder}>
                        <div
                          class={`flex gap-1 items-center
                            ${
                              header.column.getCanSort()
                                ? "cursor-pointer select-none"
                                : undefined
                            }`}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
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
                    <td class="px-[0.5rem]">
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
