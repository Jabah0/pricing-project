import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  ColumnDef,
  createSolidTable,
  Updater,
} from "@tanstack/solid-table";
import { createEffect, createSignal, For, Show } from "solid-js";

type Props<T> = {
  columns: Array<ColumnDef<T>>;
  data: Array<T>;
  onSort?: (sortBy: string, sortDirection: "asc" | "desc") => void;
};

export const Table = <T extends object>(props: Props<T>) => {
  const [sorting, setSorting] = createSignal<SortingState>([]);

  createEffect(() => {
    console.log(props.data);
  });

  const handleSorting = async (newSorting: Updater<SortingState>) => {
    setSorting(newSorting);
    if (!sorting()[0]) return;
    const sortBy = sorting()[0].id;
    const sortDirection = sorting()[0].desc ? "desc" : "asc";
    if (props.onSort) props.onSort(sortBy, sortDirection);
  };

  const table = createSolidTable({
    get data() {
      return props.data;
    },
    columns: props.columns,
    state: {
      get sorting() {
        return sorting();
      },
    },
    onSortingChange: (newSorting) => handleSorting(newSorting),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div class="px-1 pb-1 w-full h-full overflow-auto bg-backPrimary rounded-md shadow-lg text-gray-400 relative">
      <table class="w-full">
        <thead class="sticky top-0 bg-backPrimary z-10">
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
