import { Tooltip } from "@kobalte/core";
import { IconTypes } from "solid-icons";

type Props = {
  title: string;
  icon: IconTypes;
  active?: boolean;
};

export const SidebarElement = (props: Props) => {
  return (
    <Tooltip.Root placement="right-start" openDelay={0.1}>
      <Tooltip.Trigger>
        <button
          class={`flex items-center justify-center gap-1 p-2 w-12 h-12
          hover:bg-backgroundSec rounded-2xl font-bold group
          ${props.active ? "bg-backgroundSec" : "bg-transparent"}`}
        >
          <props.icon
            class={`w-6 h-6 group-hover:text-iconStroke
            ${props.active ? "text-iconStroke" : "text-white"}
          `}
          />
        </button>
      </Tooltip.Trigger>
      <Tooltip.Content class="bg-secondary m-0.5 p-2 rounded-md transition-all">
        <Tooltip.Arrow class="w-1 h-1" />
        <p
          class={`text-start text-xs text-white group-hover:text-black hover:font-bold`}
        >
          {props.title}
        </p>
      </Tooltip.Content>
    </Tooltip.Root>
  );
};