import { ParentComponent } from "solid-js";

export const Sidebar: ParentComponent = (props) => {
  return (
    <div class="bg-cyan-950 h-full w-24 rounded-r-md shadow-xl p-1">
      {props.children}
    </div>
  );
};
