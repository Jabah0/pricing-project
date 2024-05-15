import { MenuIcon } from "@/assets/icons/MenuIcon";
import { SortAscendingIcon } from "@/assets/icons/SortAscendingIcon";
import { SortDescendingIcon } from "@/assets/icons/SortDescendingIcon";
import { DropdownMenu } from "@kobalte/core";
import { Show, createSignal } from "solid-js";

type Sort = "asc" | "desc" | false;

type Props = {
  title: string;
  onSort?: (sort: Sort) => void;
  isSorted: Sort;
  toggleSort?: () => void;
  onHide?: () => void;
};

export const TableHeader = (props: Props) => {
  const [isFiltering, setIsFiltering] = createSignal(false);

  const toggleFiltering = () => {
    setIsFiltering(!isFiltering());
  };

  return (
    <div
      class="flex items-center justify-between gap-4 w-full"
      onClick={props.toggleSort}
    >
      <div class="flex gap-2">
        <p>{props.title}</p>
        <Show when={isFiltering()}>
          <input
            placeholder="Enter Text"
            class="px-2 m-0 bg-transparent border border-gray-600 rounded-sm"
            onClick={(e) => e.stopPropagation()}
          />
        </Show>
      </div>
      <div class="flex items-center">
        {{
          asc: <SortAscendingIcon class="text-primary h-6 w-6 drop-shadow" />,
          desc: <SortDescendingIcon class="text-primary h-6 w-6 drop-shadow" />,
        }[props.isSorted as string] ?? null}
        <MoreOptions
          isFiltering={isFiltering()}
          toggleFiltering={toggleFiltering}
          hide={props.onHide}
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
    <DropdownMenu.Trigger as="button">
      <MenuIcon />
    </DropdownMenu.Trigger>
    <DropdownMenu.Portal>
      <DropdownMenu.Content>
        <div class="bg-backPrimary border border-gray-600 rounded-sm my-4 p-2 w-[12rem] text-white">
          <button
            onClick={(e) => {
              e.stopPropagation();
              props.hide();
            }}
            class="w-full text-start hover:opacity-75"
          >
            hide
          </button>
          <button
            class="w-full text-start hover:opacity-75"
            onClick={(e) => {
              e.stopPropagation();
              props.toggleFiltering();
            }}
          >
            {props.isFiltering ? "cancel Filtering" : "filtering"}
          </button>
        </div>
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  </DropdownMenu.Root>
);
