import { EyeOffIcon } from "@/assets/icons/EyeOffIcon";
import { FilterIcon } from "@/assets/icons/FilterIcon";
import { MenuIcon } from "@/assets/icons/MenuIcon";
import { SortAscendingIcon } from "@/assets/icons/SortAscendingIcon";
import { SortDescendingIcon } from "@/assets/icons/SortDescendingIcon";
import { DropdownMenu, Popover } from "@kobalte/core";
import { SortDirection } from "@tanstack/solid-table";
import { JSX, Match, Switch, mergeProps } from "solid-js";

type Sort = SortDirection | false;

type Props = {
  title: JSX.Element;
  isSorted: Sort;
  toggleSort?: () => void;
  hide: () => void;
  setFilter: (value: string | number) => void;
  filter: number | string | undefined;
  filterType?: FilterType;
  filterWay?: FilterWay;
  setFilterWay?: () => void;
};

export const TableHeader = (propsWithoutDefault: Props) => {
  const props = mergeProps(
    { filterType: "string" as FilterType },
    propsWithoutDefault
  );

  console.log("filterType ", props.filterType);

  return (
    <div class="flex flex-col gap-2 py-2 px-1 group">
      <div
        class="flex items-center justify-between gap-4 w-full hover:cursor-pointer"
        onClick={props.toggleSort}
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
          <Filter
            filterType={props.filterType}
            filterWay={props.filterWay}
            setFilterWay={props.setFilterWay}
          />
          <MoreOptions hide={props.hide} />
        </div>
      </div>
    </div>
  );
};

type FilterType = "number" | "string";

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

type FilterWay =
  | "equal"
  | "notEqual"
  | "between"
  | "lessThan"
  | "lessThanOrEqual"
  | "greaterThan"
  | "greaterThanOrEqual";

const NumberFilter = (props: {
  filterWay?: FilterWay;
  setFilterWay?: () => void;
}) => {
  return (
    <div class="flex flex-col gap-3">
      <FilterWaySelection
        filterWay={props.filterWay || "between"}
        setFilterWay={props.setFilterWay}
      />
      <div class="flex justify-between items-center gap-2">
        <Switch>
          <Match when={props.filterWay === "between"}>
            <NumberInput />
            <p>{"Between"}</p>
            <NumberInput />
          </Match>
          <Match when={props.filterWay !== "between"}>
            <NumberInput />
          </Match>
        </Switch>
      </div>
    </div>
  );
};

const NumberInput = () => {
  return (
    <div class="flex gap-2">
      <input
        type="number"
        min={0}
        class="bg-backgroundSec shadow-lg rounded-sm border border-background w-[5rem] px-2"
      />
    </div>
  );
};

const FilterWaySelection = (props: {
  filterWay?: FilterWay;
  setFilterWay?: () => void;
}) => {
  return (
    <DropdownMenu.Root placement="bottom-end">
      <DropdownMenu.Trigger as="button" onClick={(e) => e.stopPropagation()}>
        <div
          class="flex items-center gap-2 w-full text-start hover:opacity-75 shadow-lg 
          bg-backgroundSec px-2 border border-background"
        >
          <p>{"Between"}</p>
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
          >
            <p>{"Equal"}</p>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            as={"button"}
            class="flex items-center gap-2 w-full text-start hover:opacity-75 shadow-lg 
            bg-backgroundSec px-2"
          >
            <p>{"Not Equal"}</p>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            as={"button"}
            class="flex items-center gap-2 w-full text-start hover:opacity-75 shadow-lg 
            bg-backgroundSec px-2"
          >
            <p>{"Less Than"}</p>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            as={"button"}
            class="flex items-center gap-2 w-full text-start hover:opacity-75 shadow-lg 
            bg-backgroundSec px-2"
          >
            <p>{"Less Than Or Equal"}</p>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            as={"button"}
            class="flex items-center gap-2 w-full text-start hover:opacity-75 shadow-lg 
            bg-backgroundSec px-2"
          >
            <p>{"Greater Than"}</p>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            as={"button"}
            class="flex items-center gap-2 w-full text-start hover:opacity-75 shadow-lg 
            bg-backgroundSec px-2"
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

const Filter = (props: {
  filterType: FilterType;
  filterWay?: FilterWay;
  setFilterWay?: () => void;
}) => {
  return (
    <Popover.Root placement="bottom-end">
      <Popover.Trigger
        as={"button"}
        class="flex items-center gap-2 w-full text-start hover:opacity-75 shadow-lg px-2 group-hover:visible invisible"
        onClick={(e) => e.stopPropagation()}
      >
        <FilterIcon class="text-gray-400" />
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
                filterWay={props.filterWay}
                setFilterWay={props.setFilterWay}
              />
            </Match>

            <Match when={props.filterType === "string"}>
              <StringFilter />
            </Match>
          </Switch>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};
