import { ParentComponent } from "solid-js";
import { FaSolidBuildingColumns } from "solid-icons/fa";
import { Sidebar } from "./Sidebar";
import { SidebarElement } from "./SidebarElement";
import { Navbar } from "./Navbar";
import { useLocale } from "@/features/locale/locale.context";
import { Toaster } from "solid-toast";
import { UsersIcon } from "@/assets/icons/UsersIcon";
import { useLocation } from "@solidjs/router";
import { SettingsIcon } from "@/assets/icons/SettingsIcon";
import { MedicalServicesIcon } from "@/assets/icons/MedicalServicesIcon";
import { PersonFilledIcon } from "@/assets/icons/PersonFilledIcon";
import { HomeIcon } from "@/assets/icons/HomeIcon";
import { RoleGuard } from "@/features/auth/components/RoleGuard";
import { Roles } from "@/features/auth/enums/Roles.enum";

export const MainLayout: ParentComponent = (props) => {
  const locale = useLocale();
  const location = useLocation();

  return (
    <div class="flex gap-6 w-screen h-screen">
      <Sidebar>
        <div class="flex flex-col gap-y-8 w-full">
          <div class="flex justify-center">
            <FaSolidBuildingColumns class="w-8 h-8 stroke-white fill-white" />
          </div>
          <div class="flex flex-col justify-center items-center gap-4 w-full">
            <SidebarElement
              path="/"
              active={location.pathname === "/"}
              title={locale.t("home")}
              icon={HomeIcon}
            />
            <SidebarElement
              active={location.pathname.includes("/services")}
              path="/services"
              title={locale.t("services")}
              icon={MedicalServicesIcon}
            />
            <RoleGuard role={Roles.ADMIN}>
              <SidebarElement
                active={location.pathname.includes("/users")}
                path="/users"
                title={locale.t("users")}
                icon={UsersIcon}
              />
            </RoleGuard>
            <SidebarElement
              active={location.pathname.includes("/profile")}
              path="/profile"
              title={locale.t("profile")}
              icon={PersonFilledIcon}
            />
            <SidebarElement
              active={location.pathname.includes("/settings")}
              path="/settings"
              title={locale.t("settings")}
              icon={SettingsIcon}
            />
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
