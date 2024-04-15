import { ParentComponent } from "solid-js";

export const Sidebar: ParentComponent = (props) => {
  return (
    <div
      class="flex bg-backPrimary w-[6rem] border-e border-gray-700 rounded-r-sm 
      shadow-xl py-6 md:flex sm:hidden h-screen overflow-auto"
    >
      {props.children}
    </div>
  );
};
