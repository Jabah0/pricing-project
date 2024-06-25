import { ParentComponent } from "solid-js";

export const CardWrapper: ParentComponent = (props) => {
  return (
    <div
      class="flex flex-col items-center justify-center drop-shadow-lg bg-backgroundSec
      h-full w-[34rem] lg:w-[24rem] py-2"
    >
      {props.children}
    </div>
  );
};
