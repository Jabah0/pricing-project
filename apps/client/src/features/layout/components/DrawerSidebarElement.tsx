import { A } from "@solidjs/router";
import { JSX, JSXElement } from "solid-js";

type Props = {
  title: string;
  icon: (props: JSX.IntrinsicElements["svg"]) => JSXElement;
  active?: boolean;
  path: string;
};

export const DrawerSidebarElement = (props: Props) => {
  return (
    <A
      href={props.path}
      class={`flex items-center justify-start gap-1 p-2 w-full h-12
      hover:bg-background rounded-md font-bold group
      ${props.active ? "bg-background drop-shadow-lg" : "bg-transparent"}`}
    >
      <props.icon
        class={`w-7 h-7 group-hover:text-iconStroke 
        ${props.active ? "text-iconStroke" : "text-text"}`}
      />
      <p class="text-text">{props.title}</p>
    </A>
  );
};
