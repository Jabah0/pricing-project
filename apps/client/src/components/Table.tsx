import {
  flexRender,
  getCoreRowModel,
  SortingState,
  ColumnDef,
  createSolidTable,
  Updater,
  Column,
  ColumnFiltersState,
  RowSelectionState,
  Row,
} from "@tanstack/solid-table";

import {
  createEffect,
  createMemo,
  createSignal,
  For,
  Match,
  Show,
  Switch,
} from "solid-js";
import { TableHeader } from "./TableHeader";
import { ContextMenu } from "@kobalte/core";
import { CancelIcon } from "@/assets/icons/CancelIcon";
import { ExcelIcon } from "@/assets/icons/ExcelIcon";
import { ColumnsIcon } from "@/assets/icons/ColumnsIcon";
import { SpinnersBlocksShuffleIcon } from "@/assets/icons/SpinnersBlocksIcon";
import { DotsRotateIcon } from "@/assets/icons/DotsRotateIcon";
import { FilterIcon } from "@/assets/icons/FilterIcon";
import { EditIcon } from "@/assets/icons/EditIcon";
import { EditFeature, type EditState } from "./solid-table";
import { ConfirmIcon } from "@/assets/icons/ConfirmIcon";

type Props<T> = {
  columns: Array<ColumnDef<T>>;
  data: Array<T>;
  isFetching?: boolean;
  isFetchingNextPage?: boolean;
  isFetchSuccess?: boolean;
  onFetchNextData?: () => void;
  onSort?: (sortBy?: string, sortDirection?: "asc" | "desc") => void;
  onFilter?: (filters: ColumnFiltersState) => void;
  onSelect?: (row: T) => void;
  onUpdate?: (values: EditState<T>) => void;
  getRowId?: (row: T) => string;
};

export type NumberFilter = {
  equals?: number;
  not?: number;
  gt?: number;
  gte?: number;
  lt?: number;
  lte?: number;
};

type ColumnsFilter = {
  id: string;
  value: string | number | NumberFilter | undefined;
};

const EditCell = <TData extends object>(props: {
  row: Row<TData>;
  onUpdate: ((data: EditState<TData>) => void) | undefined;
}) => (
  <div class="flex gap-2 items-center justify-center">
    {!props.row.getIsEditing() ? (
      <button
        onClick={(e) => {
          e.stopPropagation();
          props.row.toggleEdit();
        }}
        class="flex items-center justify-center bg-backgroundSec 
        drop-shadow-lg h-6 w-6 border border-gray-700"
      >
        <EditIcon class="text-yellow-600" />
      </button>
    ) : (
      <>
        <button
          onClick={(e) => {
            e.stopPropagation();
            const editValues = props.row.getEditValues();
            props.onUpdate && editValues && props.onUpdate(editValues);
            props.row.toggleEdit();
          }}
          class="flex items-center justify-center bg-backgroundSec 
          drop-shadow-lg h-6 w-6 border border-gray-700"
        >
          <ConfirmIcon class="text-green-700" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            props.row.toggleEdit();
          }}
          class="flex items-center justify-center bg-backgroundSec 
          drop-shadow-lg h-6 w-6 border border-gray-700"
        >
          <CancelIcon class="text-red-700" />
        </button>
      </>
    )}
  </div>
);

export const Table = <T extends object>(props: Props<T>) => {
  const [sorting, setSorting] = createSignal<SortingState>([]);
  const [columnFilters, setColumnFilters] = createSignal<ColumnsFilter[]>([]);
  const [rowSelection, setRowSelection] = createSignal<RowSelectionState>({});
  const [rowEdit, setRowEdit] = createSignal<EditState<T>[]>([]);

  const editColumn: ColumnDef<T> = {
    id: "action",
    header: "",
    enableColumnFilter: false,
    enableSorting: false,
    cell: ({ row }) => <EditCell onUpdate={props.onUpdate} row={row} />,
    meta: {
      title: "Action",
      type: "string",
    },
    size: 6 / 1,
  };

  const [chooserIsVisible, setChooserIsVisible] = createSignal(false);

  const handleSorting = (newSorting: Updater<SortingState>) => {
    setSorting(newSorting);
    if (!sorting()[0]) {
      if (props.onSort) props.onSort(undefined, undefined);
      return;
    }
    const sortBy = sorting()[0].id;
    const sortDirection = sorting()[0].desc ? "desc" : "asc";
    if (props.onSort) props.onSort(sortBy, sortDirection);
  };

  const handleFiltering = (newFilter: ColumnsFilter) => {
    setColumnFilters((pre) => {
      if (!newFilter.value || Number.isNaN(newFilter.value))
        return pre.filter((item) => item.id !== newFilter.id);
      if (!pre.find((item) => item.id === newFilter.id))
        return [...pre, newFilter];
      return pre.map((item) => {
        if (item.id === newFilter.id) return newFilter;
        else return item;
      });
    });
    if (props.onFilter) props.onFilter(columnFilters());
  };

  const clearFiltering = () => {
    setColumnFilters([]);
    if (props.onFilter) props.onFilter(columnFilters());
  };

  const onSelectRow = (row: Row<T>) => {
    row.toggleSelected();
    props.onSelect && props.onSelect(row.original);
  };

  const table = createSolidTable({
    _features: [EditFeature],
    get data() {
      return props.data;
    },
    get columns() {
      return props.onUpdate ? [...props.columns, editColumn] : props.columns;
    },
    state: {
      get sorting() {
        return sorting();
      },
      get rowSelection() {
        return rowSelection();
      },
      get edit() {
        return rowEdit();
      },
    },
    getRowId: props.getRowId,
    onEditChange: setRowEdit,
    onSortingChange: (newSorting) => handleSorting(newSorting),
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    manualFiltering: true,
    manualSorting: true,
    enableMultiRowSelection: false,
  });

  const hiddenHeaders = createMemo(() =>
    table.getAllColumns().filter((item) => !item.getIsVisible())
  );

  const [lastItem, setLastItem] = createSignal<HTMLElement>(
    document.getElementById("lastItem")!
  );

  createEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !props.isFetchingNextPage) {
        if (props.onFetchNextData) {
          props.onFetchNextData();
        }
      }
    });

    if (props.isFetchSuccess) setLastItem(document.getElementById("lastItem")!);

    if (lastItem()) observer.observe(lastItem());

    return () => observer.disconnect();
  });

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger
        as="div"
        class="px-1 pb-1 w-full h-full overflow-auto bg-backPrimary rounded-sm shadow-lg 
        text-gray-400"
      >
        <table class="w-full relative">
          <thead class="sticky top-0 bg-backPrimary z-40">
            <For each={table.getHeaderGroups()}>
              {(headerGroup) => (
                <tr class="shadow-lg h-10 py-4">
                  <For each={headerGroup.headers}>
                    {(header) => {
                      return (
                        <th
                          colSpan={header.colSpan}
                          class={`text-start border-e border-gray-600 px-[0.5rem]`}
                        >
                          <TableHeader
                            isSorted={header.column.getIsSorted()}
                            hide={() => header.column.toggleVisibility()}
                            title={flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            isSortable={header.column.getCanSort()}
                            toggleSort={() => header.column.toggleSorting()}
                            setFilter={(val) => {
                              handleFiltering({
                                id: header.column.id,
                                value: val,
                              });
                            }}
                            filter={
                              columnFilters().find(
                                (item) => item.id === header.column.id
                              )?.value
                            }
                            filterType={header.column.columnDef?.meta?.type}
                            filterOptions={
                              header.column.columnDef.meta?.options
                            }
                            isFilterable={header.column.getCanFilter()}
                          />
                        </th>
                      );
                    }}
                  </For>
                </tr>
              )}
            </For>
          </thead>
          <tbody>
            <For each={table.getRowModel().rows}>
              {(row) => (
                <tr
                  class={`h-10 border-y border-y-background
                  hover:bg-backgroundSec
                  ${row.getIsSelected() && "bg-opacity-75"}
                  ${props.onSelect && "cursor-pointer"}
                  `}
                  onClick={() => onSelectRow(row)}
                >
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
        <Show when={props.isFetching && !props.isFetchingNextPage}>
          <div class="flex items-center justify-center h-full w-full">
            <SpinnersBlocksShuffleIcon class="text-primary w-36 h-36" />
          </div>
        </Show>
        <Show when={props.isFetchingNextPage}>
          <div class="flex justify-center w-full">
            <DotsRotateIcon class="text-primary w-12 h-12" />
          </div>
        </Show>
        <Show when={chooserIsVisible()}>
          <ColumnsChooser
            columns={hiddenHeaders()}
            close={() => setChooserIsVisible(false)}
          />
        </Show>
        <div id="lastItem" />
      </ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Content as={"div"} class="z-50">
          <TableContext
            showChooser={() => {
              setChooserIsVisible(true);
            }}
            clearFiltering={() => clearFiltering()}
            isFiltering={columnFilters().length > 0}
            exportExcel={() => {}}
          />
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
};

const ColumnsChooser = <T extends object>(props: {
  columns: Column<T, unknown>[];
  close: () => void;
}) => {
  return (
    <div
      class="fixed bottom-7 end-5 h-[20rem] w-[15rem] bg-elementBack border 
      border-gray-600 shadow-lg z-50"
    >
      <div class="flex flex-col gap-2 h-full w-full px-2 py-2">
        <button onClick={props.close}>
          <CancelIcon class="h-4 w-4 text-red-700" />
        </button>
        <Switch>
          <Match when={props.columns.length === 0}>
            <div class="flex flex-col justify-center items-center h-full">
              <p class="text-lg font-bold text-center">{"noHiddenColumns"}</p>
            </div>
          </Match>
          <Match when={props.columns.length > 0}>
            <For each={props.columns}>
              {(column) => (
                <button
                  class="flex items-center justify-start w-full px-2 rounded-sm bg-backgroundSec 
                  shadow-lg hover:bg-opacity-50"
                  onClick={() => column.toggleVisibility()}
                >
                  <p>{column.columnDef.meta?.title as string}</p>
                </button>
              )}
            </For>
          </Match>
        </Switch>
      </div>
    </div>
  );
};

const TableContext = (props: {
  showChooser: () => void;
  exportExcel: () => void;
  clearFiltering: () => void;
  isFiltering: boolean;
}) => {
  return (
    <div
      class="flex flex-col gap-2 h-fit w-fit border border-gray-600 bg-backPrimary px-2 py-4 
      text-white"
    >
      <button
        class="flex items-center justify-start gap-2 w-full px-2 bg-backgroundSec 
        shadow-lg"
        onClick={() => props.showChooser()}
      >
        <ColumnsIcon class="text-blue-700" />
        <p>{"columnsChooser"}</p>
      </button>
      <button
        class="flex items-center justify-start gap-2 w-full px-2 bg-backgroundSec 
        shadow-lg"
        onClick={() => props.exportExcel()}
      >
        <ExcelIcon class="text-green-700" />
        <p>{"exportExcel"}</p>
      </button>

      <Show when={props.isFiltering}>
        <button
          class="flex items-center justify-start gap-2 w-full px-2 bg-backgroundSec 
          shadow-lg"
          onClick={() => props.clearFiltering()}
        >
          <FilterIcon class="text-blue-700" />
          <p>{"disableFiltering"}</p>
        </button>
      </Show>
    </div>
  );
};

export const EditableCell = (props: {
  row: Row<any>;
  value: string | number | string[];
}) => (
  <div class="w-full">
    {props.row.getIsEditing() ? (
      <input
        class="flex bg-backgroundSec border border-gray-600 px-2 w-20 drop-shadow-lg"
        type="number"
        value={props.value}
        onInput={(e) => {
          props.row.changeEdit({ price: parseInt(e.target.value) });
        }}
      />
    ) : (
      <p>{props.value}</p>
    )}
  </div>
);
