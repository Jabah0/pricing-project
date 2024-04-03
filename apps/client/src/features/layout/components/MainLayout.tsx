import { Home } from "lucide-solid";
import { JSX, ParentComponent } from "solid-js";
import { Sidebar } from "./Sidebar";

type Props = {
  title: string;
  icon: JSX.Element;
};

export const SidebarElement = (props: Props) => {
  return (
    <button class="rounded-xl shadow-lg bg-slate-600 w-full">
      <p class="font-bold text-white">{props.title}</p>
      {/* {props.icon} */}
      <Home fill="white" />
    </button>
  );
};

export const MainLayout: ParentComponent = (props) => {
  return (
    <div class="flex bg-gray-400 w-screen h-screen">
      <Sidebar>
        <SidebarElement title="Home" />
      </Sidebar>
      {props.children}
    </div>
  );
};
