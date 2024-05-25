import "@tanstack/solid-table";

declare module "@tanstack/solid-table" {
  interface ColumnMeta {
    title: string;
    type: "string" | "number" | "select";
    options?: { value: string; label: string }[];
  }
}
