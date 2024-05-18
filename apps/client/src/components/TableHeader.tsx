import { EyeOffIcon } from "@/assets/icons/EyeOffIcon";
import { FilterIcon } from "@/assets/icons/FilterIcon";
import { MenuIcon } from "@/assets/icons/MenuIcon";
import { SortAscendingIcon } from "@/assets/icons/SortAscendingIcon";
import { SortDescendingIcon } from "@/assets/icons/SortDescendingIcon";
import { DropdownMenu } from "@kobalte/core";
import { SortDirection } from "@tanstack/solid-table";
import { JSX, createEffect, createSignal } from "solid-js";

type Sort = SortDirection | false;

type Props = {
  title: JSX.Element;
  isSorted: Sort;
  toggleSort?: () => void;
  hide: () => void;
  setFilter: (value: string | number) => void;
  filter: () => void;
};

export const TableHeader = (props: Props) => {
  const [isFiltering, setIsFiltering] = createSignal(false);

  const toggleFiltering = () => {
    setIsFiltering(!isFiltering());
  };

  return (
    <div class="flex flex-col gap-2 py-2 px-1">
      <div
        class="flex items-center justify-between gap-4 w-full hover:cursor-pointer"
        onClick={props.toggleSort}
      >
        <div class="flex gap-2">
          <p>{props.title}</p>
        </div>
        <div class="flex items-center">
          {{
            asc: <SortAscendingIcon class="text-primary h-6 w-6 drop-shadow" />,
            desc: (
              <SortDescendingIcon class="text-primary h-6 w-6 drop-shadow" />
            ),
          }[props.isSorted as string] ?? null}
          <MoreOptions
            isFiltering={isFiltering()}
            toggleFiltering={toggleFiltering}
            hide={props.hide}
          />
        </div>
      </div>
      <div>
        <input
          onInput={(e) => props.setFilter(e.currentTarget.value)}
          class="px-2 w-full rounded-sm bg-transparent border border-gray-400"
        />
      </div>
    </div>
  );
};

const MoreOptions = (props: {
  isFiltering: boolean;
  toggleFiltering: () => void;
  hide: () => void;
}) => (
  <DropdownMenu.Root>
    <DropdownMenu.Trigger as="button" onClick={(e) => e.stopPropagation()}>
      <MenuIcon />
    </DropdownMenu.Trigger>
    <DropdownMenu.Portal>
      <DropdownMenu.Content
        as={"div"}
        class="flex flex-col gap-2 bg-backPrimary border border-gray-600 my-4 p-2 w-[12rem] 
        text-white z-50"
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
        <button
          class="flex items-center gap-2 w-full text-start hover:opacity-75 shadow-lg 
            bg-backgroundSec px-2"
          onClick={(e) => {
            e.stopPropagation();
            props.toggleFiltering();
          }}
        >
          <FilterIcon class="text-gray-400" />
          <p>{props.isFiltering ? "cancel Filtering" : "filtering"}</p>
        </button>
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  </DropdownMenu.Root>
);
