import { ChevronDownIcon } from "@/assets/icons/ChevronDownIcon";
import { EyeOffIcon } from "@/assets/icons/EyeOffIcon";
import { FilterIcon } from "@/assets/icons/FilterIcon";
import { MenuIcon } from "@/assets/icons/MenuIcon";
import { SortAscendingIcon } from "@/assets/icons/SortAscendingIcon";
import { SortDescendingIcon } from "@/assets/icons/SortDescendingIcon";
import { Combobox, DropdownMenu, Popover } from "@kobalte/core";
import { SortDirection } from "@tanstack/solid-table";
import { JSX, Match, Show, Switch, createSignal, mergeProps } from "solid-js";
import { NumberFilter as NumberFilterType } from "./Table";
import { ConfirmIcon } from "@/assets/icons/ConfirmIcon";
import { CancelIcon } from "@/assets/icons/CancelIcon";

type Sort = SortDirection | false;

type FilterType = "number" | "string" | "select";

export type FilterOptions = Array<{ label: string; value: string }>;

type FilterWay =
  | "equals"
  | "notEqual"
  | "between"
  | "lessThan"
  | "lessThanOrEqual"
  | "greaterThan"
  | "greaterThanOrEqual";

type Props = {
  title: JSX.Element;
  isSorted: Sort;
  isSortable: boolean;
  toggleSort?: () => void;
  hide: () => void;
  setFilter: (value: string | number | NumberFilterType | undefined) => void;
  isFilterable: boolean;
  filter: number | string | NumberFilterType | undefined;
  filterType?: FilterType;
  filterOptions?: FilterOptions;
};

export const TableHeader = (propsWithoutDefault: Props) => {
  const props = mergeProps(
    { filterType: "string" as FilterType },
    propsWithoutDefault
  );
  const [filterWay, setFilterWay] = createSignal<FilterWay>("equals");

  return (
    <div class="flex flex-col gap-2 py-2 px-1 group">
      <div
        class="flex items-center justify-between gap-4 w-full"
        classList={{ "hover:cursor-pointer": props.isSortable }}
        onClick={props.isSortable ? props.toggleSort : undefined}
      >
        <div class="flex gap-2">
          <p>{props.title}</p>
        </div>
        <div class="flex items-center">
          {{
            asc: (
              <SortAscendingIcon class="text-primary h-6 w-6 drop-shadow scale-150" />
            ),
            desc: (
              <SortDescendingIcon class="text-primary h-6 w-6 drop-shadow scale-150" />
            ),
          }[props.isSorted as string] ?? null}
          <Show when={props.isFilterable}>
            <Filter
              filter={props.filter}
              setFilter={props.setFilter}
              filterType={props.filterType}
              filterWay={filterWay()}
              setFilterWay={(way) => setFilterWay(way)}
              filterOptions={props.filterOptions}
            />
          </Show>
          <MoreOptions hide={props.hide} />
        </div>
      </div>
    </div>
  );
};

const Filter = (props: {
  filter: number | string | NumberFilterType | undefined;
  setFilter: (value: string | number | NumberFilterType | undefined) => void;
  filterType: FilterType;
  filterWay?: FilterWay;
  setFilterWay?: (way: FilterWay) => void;
  filterOptions?: FilterOptions;
}) => {
  const onInputChange = (
    val: number | string | NumberFilterType | undefined
  ) => {
    props.setFilter(val);
  };

  return (
    <Popover.Root placement="bottom-end">
      <Popover.Trigger
        as={"button"}
        class={`flex items-center gap-2 w-full text-start hover:opacity-75 drop-shadow-lg px-2 group-hover:visible ${props.filter ? "visible" : "invisible"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <FilterIcon
          class={`${props.filter ? "text-primary" : "text-gray-400"}`}
        />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          as={"div"}
          class="w-fit text-white px-2 py-4 bg-backPrimary border border-gray-600 z-50 top-4"
          onClick={(e) => e.stopPropagation()}
        >
          <Switch>
            <Match when={props.filterType === "number"}>
              <NumberFilter
                filter={props.filter as NumberFilterType}
                setFilter={(val) => onInputChange(val)}
                filterWay={props.filterWay}
                setFilterWay={(val) => {
                  if (props.setFilterWay) props.setFilterWay(val);
                }}
              />
            </Match>

            <Match when={props.filterType === "string"}>
              <StringFilter
                value={(props.filter as string) || ""}
                onInput={(e) => onInputChange(e.target.value)}
              />
            </Match>
            <Match when={props.filterType === "select"}>
              <SelectFilter
                filterOptions={props.filterOptions || []}
                setFilter={props.setFilter}
                filter={props.filter as string}
              />
            </Match>
          </Switch>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

const StringFilter = (
  props: Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "type">
) => (
  <input
    {...props}
    type="text"
    class="px-2 w-full rounded-sm bg-backgroundSec drop-shadow-lg"
    placeholder={"textSearch..."}
  />
);

const BetweenNumberFilter = (props: {
  filter: NumberFilterType;
  onChange: (value: NumberFilterType | undefined) => void;
}) => {
  return (
    <>
      <NumberInput
        placeholder={"From"}
        value={props.filter?.gt}
        onInput={(e) => {
          if (e.target.value === undefined && !props.filter.lt)
            return props.onChange(undefined);

          props.onChange({
            gt: Number.isNaN(parseInt(e.target.value))
              ? undefined
              : parseInt(e.target.value),
            lt: props.filter?.lt || undefined,
          });
        }}
      />
      <p>{"Between"}</p>
      <NumberInput
        placeholder="To"
        value={props.filter?.lt}
        onInput={(e) => {
          if (e.target.value === undefined && !props.filter.gt)
            return props.onChange(undefined);

          props.onChange({
            gt: props.filter?.gt || undefined,
            lt: Number.isNaN(parseInt(e.target.value))
              ? undefined
              : parseInt(e.target.value),
          });
        }}
      />
    </>
  );
};

const NumberFilter = (props: {
  filter: NumberFilterType | undefined;
  setFilter: (value: NumberFilterType | undefined) => void;
  filterWay?: FilterWay;
  setFilterWay?: (way: FilterWay) => void;
}) => {
  const onChange = (value: NumberFilterType | undefined) => {
    props.setFilter(value);
  };

  return (
    <div class="flex flex-col gap-3">
      <FilterWaySelection
        filterWay={props.filterWay || "between"}
        setFilterWay={props.setFilterWay}
      />
      <div class="flex justify-between items-center gap-2">
        <Switch>
          <Match when={props.filterWay === "between"}>
            <BetweenNumberFilter
              filter={props.filter as NumberFilterType}
              onChange={(value) => onChange(value)}
            />
          </Match>
          <Match when={props.filterWay === "equals"}>
            <NumberInput
              placeholder="Value"
              value={props.filter?.equals}
              onInput={(e) => {
                if (e.target.value)
                  props.setFilter({ equals: parseInt(e.target.value) });
                else props.setFilter(undefined);
              }}
            />
          </Match>
          <Match when={props.filterWay === "notEqual"}>
            <NumberInput
              placeholder="Value"
              value={props.filter?.equals}
              onInput={(e) => {
                if (e.target.value)
                  props.setFilter({ not: parseInt(e.target.value) });
                else props.setFilter(undefined);
              }}
            />
          </Match>
          <Match when={props.filterWay === "greaterThan"}>
            <NumberInput
              placeholder="Value"
              value={props.filter?.gt}
              onInput={(e) => {
                if (e.target.value)
                  props.setFilter({ gt: parseInt(e.target.value) });
                else props.setFilter(undefined);
              }}
            />
          </Match>
          <Match when={props.filterWay === "greaterThanOrEqual"}>
            <NumberInput
              placeholder="Value"
              value={props.filter?.gte}
              onInput={(e) => {
                if (e.target.value)
                  props.setFilter({ gte: parseInt(e.target.value) });
                else props.setFilter(undefined);
              }}
            />
          </Match>
          <Match when={props.filterWay === "lessThan"}>
            <NumberInput
              placeholder="Value"
              value={props.filter?.lt}
              onInput={(e) => {
                if (e.target.value)
                  props.setFilter({ lt: parseInt(e.target.value) });
                else props.setFilter(undefined);
              }}
            />
          </Match>
          <Match when={props.filterWay === "lessThanOrEqual"}>
            <NumberInput
              placeholder="Value"
              value={props.filter?.lte}
              onInput={(e) => {
                if (e.target.value)
                  props.setFilter({ lte: parseInt(e.target.value) });
                else props.setFilter(undefined);
              }}
            />
          </Match>
        </Switch>
      </div>
    </div>
  );
};

const NumberInput = (
  props: Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "type">
) => {
  return (
    <div class="flex gap-2">
      <input
        {...props}
        type="number"
        min={0}
        class="bg-backgroundSec shadow-lg rounded-sm border border-background w-[5rem] px-2"
      />
    </div>
  );
};

const FilterWaySelection = (props: {
  filterWay?: FilterWay;
  setFilterWay?: (way: FilterWay) => void;
}) => {
  const onWayChange = (val: FilterWay) => {
    if (props.setFilterWay) props.setFilterWay(val);
  };

  return (
    <DropdownMenu.Root placement="bottom-end">
      <DropdownMenu.Trigger as="button" onClick={(e) => e.stopPropagation()}>
        <div
          class="flex items-center justify-between gap-2 w-full text-start hover:opacity-75 shadow-lg 
          bg-backgroundSec px-2 border border-background"
        >
          <p>{props.filterWay}</p>
          <ChevronDownIcon class="text-background scale-150" />
        </div>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          as={"div"}
          class="flex flex-col gap-2 bg-backPrimary border border-gray-600 my-4 p-2 w-[12rem] 
        text-white z-50"
          onClick={(e) => e.stopPropagation()}
        >
          <DropdownMenu.Item
            as={"button"}
            class="flex items-center gap-2 w-full text-start hover:opacity-75 shadow-lg 
            bg-backgroundSec px-2"
            onSelect={() => onWayChange("between")}
          >
            <p>{"Between"}</p>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            as={"button"}
            class="flex items-center gap-2 w-full text-start hover:opacity-75 shadow-lg 
            bg-backgroundSec px-2"
            onSelect={() => onWayChange("equals")}
          >
            <p>{"Equal"}</p>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            as={"button"}
            class="flex items-center gap-2 w-full text-start hover:opacity-75 shadow-lg 
            bg-backgroundSec px-2"
            onSelect={() => onWayChange("notEqual")}
          >
            <p>{"Not Equal"}</p>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            as={"button"}
            class="flex items-center gap-2 w-full text-start hover:opacity-75 shadow-lg 
            bg-backgroundSec px-2"
            onSelect={() => onWayChange("lessThan")}
          >
            <p>{"Less Than"}</p>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            as={"button"}
            class="flex items-center gap-2 w-full text-start hover:opacity-75 shadow-lg 
            bg-backgroundSec px-2"
            onSelect={() => onWayChange("lessThanOrEqual")}
          >
            <p>{"Less Than Or Equal"}</p>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            as={"button"}
            class="flex items-center gap-2 w-full text-start hover:opacity-75 shadow-lg 
            bg-backgroundSec px-2"
            onSelect={() => onWayChange("greaterThan")}
          >
            <p>{"Greater Than"}</p>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            as={"button"}
            class="flex items-center gap-2 w-export type FilterOptions = Array<{label: string, value: string}>full text-start hover:opacity-75 shadow-lg 
            bg-backgroundSec px-2"
            onSelect={() => onWayChange("greaterThanOrEqual")}
          >
            <p>{"Greater Than Or Equal"}</p>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

const MoreOptions = (props: { hide: () => void }) => (
  <DropdownMenu.Root placement="bottom-end">
    <DropdownMenu.Trigger as="button" onClick={(e) => e.stopPropagation()}>
      <MenuIcon />
    </DropdownMenu.Trigger>
    <DropdownMenu.Portal>
      <DropdownMenu.Content
        as={"div"}
        class="flex flex-col gap-2 bg-backPrimary border border-gray-600 my-4 p-2 w-[12rem] 
        text-white z-50"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            props.hide();
          }}
          class="flex items-center gap-2 w-full text-start hover:opacity-75 shadow-lg 
            bg-backgroundSec px-2"
        >
          <EyeOffIcon class="text-gray-400" />
          <p>{"hide"}</p>
        </button>
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  </DropdownMenu.Root>
);

const SelectFilter = (props: {
  filterOptions: FilterOptions;
  filter: string | undefined;
  setFilter: (value: string | undefined) => void;
}) => {
  const roleIndex = () =>
    props.filterOptions.findIndex((item) => item.value === props.filter);

  return (
    <Combobox.Root
      options={props.filterOptions}
      optionValue="value"
      optionTextValue="label"
      optionLabel="label"
      placeholder="Select"
      defaultValue={props.filterOptions[roleIndex()]}
      onChange={(e) => props.setFilter && props.setFilter(e.value)}
      itemComponent={(itemProps) => (
        <Combobox.Item
          class="flex items-center justify-between px-2 bg-backgroundSec shadow-lg
          hover:opacity-50 hover:cursor-pointer"
          item={itemProps.item}
        >
          <Combobox.ItemLabel>
            {itemProps.item.rawValue.label}
          </Combobox.ItemLabel>
          <Combobox.ItemIndicator>
            <ConfirmIcon />
          </Combobox.ItemIndicator>
        </Combobox.Item>
      )}
    >
      <Combobox.Control
        class="flex justify-center items-center bg-backgroundSec shadow-lg 
        h-[2rem] px-2 text-white"
      >
        <Combobox.Input class="bg-transparent" />
        <Show when={props.filter}>
          <button onClick={() => props.setFilter(undefined)}>
            <CancelIcon class="text-red-700" />
          </button>
        </Show>
        <Combobox.Trigger>
          <Combobox.Icon>
            <ChevronDownIcon class="scale-150" />
          </Combobox.Icon>
        </Combobox.Trigger>
      </Combobox.Control>
      <Combobox.Portal>
        <Combobox.Content
          class="bg-backPrimary shadow-lg z-50 text-white border 
          border-gray-600 p-2"
        >
          <Combobox.Listbox class="flex flex-col gap-2" />
        </Combobox.Content>
      </Combobox.Portal>
    </Combobox.Root>
  );
};
