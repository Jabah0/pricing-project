import { JSX, Match, Show, Switch, createSignal } from "solid-js";
import {
  ChevronDownIcon,
  EyeOffIcon,
  FilterIcon,
  MenuIcon,
  SortAscendingIcon,
  SortDescendingIcon,
  ConfirmIcon,
  CancelIcon,
} from "@/assets/icons";
import { Combobox, DropdownMenu, Popover } from "@kobalte/core";
import { SortDirection } from "@tanstack/solid-table";
import { NumberFilter as NumberFilterType } from "./Table";
import { useLocale } from "@/features/locale/LocaleProvider";
import { RawDictionary } from "@/features/locale";

type Sort = SortDirection | false;

type FilterType = "number" | "string" | "select";

export type FilterOptions = Array<{
  label: keyof RawDictionary;
  value: string;
}>;

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
  size: number;
  resizeHandler: (context?: Document) => (event: unknown) => void;
};

export const TableHeader = (props: Props) => {
  const [filterWay, setFilterWay] = createSignal<FilterWay>("equals");

  return (
    <th
      class={`text-start px-[0.5rem] relative group`}
      style={{ width: `${props.size}px` }}
    >
      <div class="flex flex-col gap-2 py-2 px-1 group text-text">
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
                filterType={props.filterType || "string"}
                filterWay={filterWay()}
                setFilterWay={(way) => setFilterWay(way)}
                filterOptions={props.filterOptions}
              />
            </Show>
            <MoreOptions hide={props.hide} />
          </div>
        </div>
      </div>
      <div
        class={`
          w-1 h-full absolute end-0 top-0 bg-gray-500 group-hover:opacity-100
          cursor-col-resize select-none touch-none opacity-0`}
        onMouseDown={props.resizeHandler()}
        onTouchStart={props.resizeHandler()}
      />
    </th>
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
) => {
  const locale = useLocale();

  return (
    <input
      {...props}
      type="text"
      class="px-2 w-full text-text rounded-sm bg-backgroundSec drop-shadow-lg"
      placeholder={locale.t("textSearch")}
    />
  );
};

const BetweenNumberFilter = (props: {
  filter: NumberFilterType;
  onChange: (value: NumberFilterType | undefined) => void;
}) => {
  const locale = useLocale();

  return (
    <div class="flex w-full max-w-[20rem] gap-2">
      <NumberInput
        placeholder={locale.t("from")}
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
      <p>{":"}</p>
      <NumberInput
        placeholder={locale.t("to")}
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
    </div>
  );
};

const NumberFilter = (props: {
  filter: NumberFilterType | undefined;
  setFilter: (value: NumberFilterType | undefined) => void;
  filterWay?: FilterWay;
  setFilterWay?: (way: FilterWay) => void;
}) => {
  const locale = useLocale();

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
              placeholder={locale.t("value")}
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
              placeholder={locale.t("value")}
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
              placeholder={locale.t("value")}
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
              placeholder={locale.t("value")}
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
              placeholder={locale.t("value")}
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
              placeholder={locale.t("value")}
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
        class="bg-backgroundSec text-text shadow-lg rounded-sm border border-background px-2 w-full"
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
  const locale = useLocale();

  return (
    <DropdownMenu.Root placement="bottom-end">
      <DropdownMenu.Trigger as="button" onClick={(e) => e.stopPropagation()}>
        <div
          class="flex items-center justify-between gap-2 w-full text-text text-start hover:opacity-75 shadow-lg 
          bg-backgroundSec px-2 border border-background"
        >
          <p>{locale.t(props.filterWay || "undefined")}</p>
          <ChevronDownIcon class="text-text scale-150" />
        </div>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          as={"div"}
          class="flex flex-col gap-2 bg-backPrimary border border-gray-600 my-4 p-2 w-[12rem] 
          text-text z-50"
          onClick={(e) => e.stopPropagation()}
        >
          <DropdownMenu.Item
            as={"button"}
            class="flex items-center gap-2 w-full text-start hover:opacity-75 shadow-lg 
            bg-backgroundSec px-2"
            onSelect={() => onWayChange("equals")}
          >
            <p>{locale.t("equals")}</p>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            as={"button"}
            class="flex items-center gap-2 w-full text-start hover:opacity-75 shadow-lg 
            bg-backgroundSec px-2"
            onSelect={() => onWayChange("notEqual")}
          >
            <p>{locale.t("notEqual")}</p>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            as={"button"}
            class="flex items-center gap-2 w-full text-start hover:opacity-75 shadow-lg 
            bg-backgroundSec px-2"
            onSelect={() => onWayChange("lessThan")}
          >
            <p>{locale.t("lessThan")}</p>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            as={"button"}
            class="flex items-center gap-2 w-full text-start hover:opacity-75 shadow-lg 
            bg-backgroundSec px-2"
            onSelect={() => onWayChange("lessThanOrEqual")}
          >
            <p>{locale.t("lessThanOrEqual")}</p>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            as={"button"}
            class="flex items-center gap-2 w-full text-start hover:opacity-75 shadow-lg 
            bg-backgroundSec px-2"
            onSelect={() => onWayChange("greaterThan")}
          >
            <p>{locale.t("greaterThan")}</p>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            as={"button"}
            class="flex items-center gap-2 w-export type FilterOptions = Array<{label: string, value: string}>full text-start hover:opacity-75 shadow-lg 
            bg-backgroundSec px-2"
            onSelect={() => onWayChange("greaterThanOrEqual")}
          >
            <p>{locale.t("greaterThanOrEqual")}</p>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            as={"button"}
            class="flex items-center gap-2 w-full text-start hover:opacity-75 shadow-lg 
            bg-backgroundSec px-2"
            onSelect={() => onWayChange("between")}
          >
            <p>{locale.t("between")}</p>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

const MoreOptions = (props: { hide: () => void }) => {
  const locale = useLocale();

  return (
    <DropdownMenu.Root placement="bottom-end">
      <DropdownMenu.Trigger as="button" onClick={(e) => e.stopPropagation()}>
        <MenuIcon class="invisible group-hover:visible" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          as={"div"}
          class="flex flex-col gap-2 bg-backPrimary border border-gray-600 my-4 p-2 w-[12rem] 
          text-text z-50"
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
            <EyeOffIcon class="text-textSecondary" />
            <p>{locale.t("hide")}</p>
          </button>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

const SelectFilter = (props: {
  filterOptions: FilterOptions;
  filter: string | undefined;
  setFilter: (value: string | undefined) => void;
}) => {
  const locale = useLocale();

  const roleIndex = () =>
    props.filterOptions.findIndex((item) => item.value === props.filter);

  return (
    <Combobox.Root
      options={props.filterOptions}
      optionValue="value"
      optionTextValue={(item) => locale.t(item.label) || item.label}
      optionLabel={(item) => locale.t(item.label) || item.label}
      placeholder={locale.t("select")}
      defaultValue={props.filterOptions[roleIndex()]}
      onChange={(e) => props.setFilter && props.setFilter(e.value)}
      itemComponent={(itemProps) => (
        <Combobox.Item
          class="flex items-center justify-between px-2 bg-backgroundSec shadow-lg
          hover:opacity-50 hover:cursor-pointer"
          item={itemProps.item}
        >
          <Combobox.ItemLabel>
            {locale.t(itemProps.item.rawValue.label)}
          </Combobox.ItemLabel>
          <Combobox.ItemIndicator>
            <ConfirmIcon />
          </Combobox.ItemIndicator>
        </Combobox.Item>
      )}
    >
      <Combobox.Control
        class="flex justify-center items-center bg-backgroundSec shadow-lg 
        h-[2rem] px-2 text-text"
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
          class="bg-backPrimary shadow-lg z-50 text-text border 
          border-gray-600 p-2"
        >
          <Combobox.Listbox class="flex flex-col gap-2" />
        </Combobox.Content>
      </Combobox.Portal>
    </Combobox.Root>
  );
};
