import { ParentComponent } from "solid-js";
import { Toaster } from "solid-toast";

export const AuthLayout: ParentComponent = (props) => {
  return (
    <div class="flex justify-center items-center h-screen w-screen">
      {props.children}
      <Toaster />
    </div>
  );
};
