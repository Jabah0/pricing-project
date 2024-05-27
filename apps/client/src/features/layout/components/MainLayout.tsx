import { ParentComponent } from "solid-js";
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
import { LogoIcon } from "@/assets/icons/LogoIcon";

export const MainLayout: ParentComponent = (props) => {
  const locale = useLocale();
  const location = useLocation();

  return (
    <div class="flex gap-6 w-screen h-screen">
      <Sidebar>
        <div class="flex flex-col gap-y-8 w-full">
          <div class="flex justify-center">
            <LogoIcon class="drop-shadow-lg" />
          </div>
          <div class="flex flex-col gap-4 h-full w-full justify-between">
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
            </div>
            <div class="flex flex-col justify-center items-center gap-4 w-full">
              <SidebarElement
                active={location.pathname.includes("/settings")}
                path="/settings"
                title={locale.t("settings")}
                icon={SettingsIcon}
              />
            </div>
          </div>
        </div>
      </Sidebar>
      <div class="flex flex-col items-center h-full w-full py-4 2xl:px-15 sm:px-2 overflow-auto">
        <div class="flex flex-col gap-6 w-full h-full">
          <Navbar />
          <div class="flex-1 py-2 overflow-auto">{props.children}</div>
        </div>
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
};
