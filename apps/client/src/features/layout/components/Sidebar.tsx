import { ParentComponent } from "solid-js";

export const Sidebar: ParentComponent = (props) => {
  return (
    <div
      class="hidden bg-backPrimary w-[6rem] rounded-r-sm 
      shadow-xl py-6 xl:flex lg:flex h-full overflow-auto"
    >
      {props.children}
    </div>
  );
};
