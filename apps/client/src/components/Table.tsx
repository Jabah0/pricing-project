import {
  flexRender,
  getCoreRowModel,
  SortingState,
  ColumnDef,
  createSolidTable,
  Updater,
  ColumnFiltersState,
  RowSelectionState,
  Row,
} from "@tanstack/solid-table";

import {
  createEffect,
  createMemo,
  createSignal,
  For,
  JSX,
  Show,
} from "solid-js";
import { EditFeature, type EditState } from "./solid-table";
import { TableHeader } from "./TableHeader";
import { ContextMenu } from "@kobalte/core";

import { useLocale } from "@/features/locale/LocaleProvider";
import {
  EditIcon,
  SpinnersBlocksShuffleIcon,
  ConfirmIcon,
  CancelIcon,
  DotsRotateIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@/assets/icons";
import { ColumnsChooser } from "./ColumnChooser";
import { TableContext } from "./TableContext";

type Props<T> = {
  columns: Array<ColumnDef<T>>;
  data: Array<T>;
  isFetching?: boolean;
  isFetchingNextPage?: boolean;
  isFetchSuccess?: boolean;
  SubRow?: (props: { row: Row<T> }) => JSX.Element;
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

  const locale = useLocale();

  const dir = () => locale.locale().dir;

  const editColumn: ColumnDef<T> = {
    id: "action",
    header: "",
    enableColumnFilter: false,
    enableSorting: false,
    cell: ({ row }) => <EditCell onUpdate={props.onUpdate} row={row} />,
    meta: {
      title: "action",
      headerTitle: "",
      type: "string",
    },
  };

  const [chooserIsVisible, setChooserIsVisible] = createSignal(false);

  const ExpandColumn: ColumnDef<T> = {
    id: "expand",
    header: "",
    enableColumnFilter: false,
    enableSorting: false,
    cell: ({ row }) => (
      <button onClick={() => row.toggleExpanded()}>
        {row.getIsExpanded() ? (
          <ChevronUpIcon class="h-6 w-6 text-gray-500" />
        ) : (
          <ChevronDownIcon class="h-6 w-6 text-gray-500" />
        )}
      </button>
    ),
    size: 0.5,
    maxSize: 0.5,
    meta: {
      title: "",
      headerTitle: "",
      type: "string",
    },
  };

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

  const _columns = () =>
    props.SubRow
      ? props.onUpdate
        ? [ExpandColumn, ...props.columns, editColumn]
        : [ExpandColumn, ...props.columns]
      : props.onUpdate
        ? [...props.columns, editColumn]
        : props.columns;

  const table = createSolidTable({
    _features: [EditFeature],
    get data() {
      return props.data;
    },
    get columns() {
      return _columns();
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
    columnResizeDirection: dir(),
    columnResizeMode: "onChange",
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
        class="px-1 pb-1 w-full h-full overflow-auto bg-backPrimary rounded-sm drop-shadow-lg
        text-gray-400 relative"
      >
        <table class="w-full">
          <thead class="sticky top-0 bg-backPrimary z-40">
            <For each={table.getHeaderGroups()}>
              {(headerGroup) => (
                <tr class="shadow-lg h-10 py-4">
                  <For each={headerGroup.headers}>
                    {(header) => {
                      return (
                        <TableHeader
                          resizeHandler={header.getResizeHandler}
                          size={header.getSize()}
                          isSorted={header.column.getIsSorted()}
                          hide={() => header.column.toggleVisibility()}
                          title={locale.t(
                            header.column.columnDef.meta?.headerTitle || ""
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
                          filterOptions={header.column.columnDef.meta?.options}
                          isFilterable={header.column.getCanFilter()}
                        />
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
                <>
                  <tr
                    class={`h-10 border-y border-y-background text-text
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
                  {row.getIsExpanded() && props.SubRow && (
                    <tr>
                      <td colSpan={row.getVisibleCells().length}>
                        {<props.SubRow row={row} />}
                      </td>
                    </tr>
                  )}
                </>
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
          <div class="flex justify-center w-full h-fit">
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

export const EditableCell = (props: {
  row: Row<any>;
  value: string | number | string[];
  column: string;
}) => (
  <div class="w-full">
    {props.row.getIsEditing() ? (
      <input
        class="flex bg-backgroundSec border border-gray-600 px-2 w-20 drop-shadow-lg"
        type="number"
        value={props.value}
        onInput={(e) => {
          props.row.changeEdit({ [props.column]: parseInt(e.target.value) });
        }}
      />
    ) : (
      <p>{props.value}</p>
    )}
  </div>
);
