import { ParentComponent } from "solid-js";

export const CardWrapper: ParentComponent = (props) => {
  return (
    <div
      class="flex flex-col grow items-center justify-center drop-shadow-lg bg-backgroundSec
      h-full py-2"
    >
      {props.children}
    </div>
  );
};
