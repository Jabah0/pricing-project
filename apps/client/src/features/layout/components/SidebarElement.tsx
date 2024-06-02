import { Tooltip } from "@kobalte/core";
import { A } from "@solidjs/router";
import { JSXElement, JSX } from "solid-js";

type Props = {
  title: string;
  icon: (props: JSX.IntrinsicElements["svg"]) => JSXElement;
  active?: boolean;
  path: string;
};

export const SidebarElement = (props: Props) => {
  return (
    <Tooltip.Root placement="right-start" openDelay={0.1}>
      <Tooltip.Trigger>
        <A
          href={props.path}
          class={`flex items-center justify-center gap-1 p-2 w-12 h-12
          hover:bg-backgroundSec rounded-2xl font-bold group
          ${props.active ? "bg-backgroundSec drop-shadow-lg" : "bg-transparent"}`}
        >
          <props.icon
            class={`w-7 h-7 group-hover:text-iconStroke
            ${props.active ? "text-iconStroke" : "text-text"}
          `}
          />
        </A>
      </Tooltip.Trigger>
      <Tooltip.Content class="bg-iconStroke m-0.5 p-2 rounded-sm drop-shadow-lg z-50 ">
        <Tooltip.Arrow class="w-1 h-1" />
        <p class={`text-start text-lg text-white font-bold`}>{props.title}</p>
      </Tooltip.Content>
    </Tooltip.Root>
  );
};
