import { ParentComponent } from "solid-js";
import { FiHome, FiSettings } from "solid-icons/fi";
import { RiHealthMedicalCapsuleFill } from "solid-icons/ri";
import { FaSolidBuildingColumns } from "solid-icons/fa";
import { BsPersonFill } from "solid-icons/bs";
import { Sidebar } from "./Sidebar";
import { SidebarElement } from "./SidebarElement";
import { Navbar } from "./Navbar";
import { useLocale } from "@/features/locale/locale.context";
import { Toaster } from "solid-toast";

export const MainLayout: ParentComponent = (props) => {
  const locale = useLocale();

  return (
    <div class="flex gap-6 w-screen h-screen">
      <Sidebar>
        <div class="flex flex-col gap-y-8 w-full">
          <div class="flex justify-center">
            <FaSolidBuildingColumns class="w-8 h-8 stroke-white fill-white" />
          </div>
          <div class="flex flex-col justify-center items-center gap-4 w-full">
            <SidebarElement
              active={true}
              title={locale.t("home")}
              icon={FiHome}
            />
            <SidebarElement
              title={locale.t("services")}
              icon={RiHealthMedicalCapsuleFill}
            />
            <SidebarElement title={locale.t("profile")} icon={BsPersonFill} />
            <SidebarElement title={locale.t("settings")} icon={FiSettings} />
          </div>
        </div>
      </Sidebar>
      <div class="flex flex-col items-center w-full h-full py-5 2xl:px-20 sm:px-2  overflow-auto">
        <div class="flex flex-col gap-8 w-full px-4">
          <Navbar />
          <div>{props.children}</div>
        </div>
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
};
