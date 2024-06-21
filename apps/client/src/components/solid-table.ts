import {
  Row,
  RowData,
  Table,
  OnChangeFn,
  TableFeature,
  Updater,
  functionalUpdate,
  makeStateUpdater,
} from "@tanstack/solid-table";

import { RawDictionary } from "@/features/locale";

declare module "@tanstack/solid-table" {
  interface Table<TData extends RowData> extends EditInstance<TData> {}
  interface TableState extends EditTableState {}
  interface TableOptionsResolved<TData extends RowData> extends EditOptions {}

  interface Row<TData extends RowData> extends EditRow<TData> {}

  interface ColumnMeta<TData extends unknown, TValue> {
    title: keyof RawDictionary;
    headerTitle: keyof RawDictionary;
    type: "string" | "number" | "select";
    options?: { value: string; label: keyof RawDictionary }[];
  }
}

export type EditState<TData extends RowData> = {
  rowId: string;
  values?: Partial<TData>;
};

export type EditValue = {
  id: string;
  value: string;
};

export interface EditInstance<TData extends RowData> {
  setEdit: (updater: Updater<EditState<TData>[]>) => void;
}

export interface EditTableState {
  edit: EditState<any>[];
}

export interface EditOptions {
  enableEdit?: boolean;
  onEditChange?: OnChangeFn<EditState<any>[]>;
}

export interface EditRow<TData extends RowData> {
  toggleEdit: () => void;
  changeEdit: (value?: Partial<TData>) => void;
  getIsEditing: () => boolean;
  getEditValues: () => EditState<TData> | undefined;
}

export const EditFeature: TableFeature<any> = {
  getInitialState: (state): EditTableState => {
    return {
      edit: [],
      ...state,
    };
  },

  getDefaultOptions: <TData extends RowData>(
    table: Table<TData>
  ): EditOptions => {
    return {
      enableEdit: false,
      onEditChange: makeStateUpdater("edit", table),
    };
  },

  createTable: <TData extends RowData>(table: Table<TData>): void => {
    table.setEdit = (updater) => {
      const safeUpdater: Updater<EditState<TData>[]> = (old) => {
        let newState = functionalUpdate(updater, old);
        return newState;
      };
      return table.options.onEditChange?.(safeUpdater);
    };
  },

  createRow: <TData extends RowData>(
    row: Row<TData>,
    table: Table<TData>
  ): void => {
    row.changeEdit = (value?: Partial<TData>) => {
      table.setEdit((old) => {
        if (old.find((item) => item.rowId === row.id))
          return old.map((item) => {
            if (item.rowId !== row.id) return item;
            else {
              return { rowId: row.id, values: { ...item.values, ...value } };
            }
          });
        return [...old, { rowId: row.id, value }];
      });
    };
    row.getIsEditing = () => {
      const edits = table.getState().edit;
      return edits.find((item) => item.rowId === row.id) ? true : false;
    };
    row.getEditValues = () => {
      const edit = table.getState().edit.find((item) => item.rowId === row.id);
      return edit;
    };
    row.toggleEdit = () => {
      table.setEdit((old) => {
        if (old.find((item) => item.rowId === row.id))
          return old.filter((item) => item.rowId !== row.id);
        return [...old, { rowId: row.id }];
      });
    };
  },
};
