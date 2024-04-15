import { ParentComponent } from "solid-js";

export const Sidebar: ParentComponent = (props) => {
  return (
    <div
      class="flex bg-backPrimary flex-1 w-20 border-e border-gray-700 rounded-r-sm 
    shadow-xl p-2 md:flex sm:hidden"
    >
      {props.children}
    </div>
  );
};
