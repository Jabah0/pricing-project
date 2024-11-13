import { ParentComponent } from "solid-js";
import { Toaster } from "solid-toast";

export const BaseLayout: ParentComponent = (props) => {
  return (
    <>
      {props.children}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#292E4E",
            color: "#d1d5db",
          },
        }}
      />
    </>
  );
};
