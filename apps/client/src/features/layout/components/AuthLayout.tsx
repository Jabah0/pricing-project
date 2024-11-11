import { ParentComponent } from "solid-js";

export const AuthLayout: ParentComponent = (props) => {
  return (
    <div class="flex justify-center items-center h-screen w-screen">
      {props.children}
    </div>
  );
};
