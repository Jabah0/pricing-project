import { MenuIcon } from "@/assets/icons/MenuIcon";
import { SortAscendingIcon } from "@/assets/icons/SortAscendingIcon";
import { SortDescendingIcon } from "@/assets/icons/SortDescendingIcon";
import { DropdownMenu } from "@kobalte/core";
import { createSignal } from "solid-js";

type Sort = "asc" | "desc" | false;

type Props = {
  title: string;
  onSort?: (sort: Sort) => void;
  isSorted: Sort;
};

export const TableHeader = (props: Props) => {
  const [isSorted, setIsSorted] = createSignal<Sort>(false);

  return (
    <div
      class="flex justify-between items-center w-full"
      onClick={() => {
        if (props.isSorted === "asc") setIsSorted("desc");
        else if (props.isSorted === "desc") setIsSorted(false);
        else setIsSorted("asc");
      }}
    >
      <p>{props.title}</p>

      <div class="flex">
        {{
          asc: <SortAscendingIcon class="text-primary h-6 w-6 drop-shadow" />,
          desc: <SortDescendingIcon class="text-primary h-6 w-6 drop-shadow" />,
        }[isSorted() as string] ?? null}

        <MoreOptions />
      </div>
    </div>
  );
};

const MoreOptions = () => (
  <DropdownMenu.Root>
    <DropdownMenu.Trigger as="button">
      <MenuIcon />
    </DropdownMenu.Trigger>
    <DropdownMenu.Portal>
      <DropdownMenu.Content>
        <div
          class="bg-backPrimary border border-gray-600 
          rounded-sm my-4 p-2 w-[12rem] text-white"
        >
          <button class="w-full text-start hover:opacity-75">hide</button>
        </div>
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  </DropdownMenu.Root>
);
