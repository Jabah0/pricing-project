import {
  CancelIcon,
  CloseToMenuIcon,
  HomeIcon,
  LogoIcon,
  MedicalServicesIcon,
  SettingsIcon,
  UsersIcon,
} from "@/assets/icons";
import { useLocale } from "@/features/locale/LocaleProvider";
import { Drawer } from "corvu/drawer";
import { DrawerSidebarElement } from "./DrawerSidebarElement";
import { useLocation } from "@solidjs/router";
import { createSignal } from "solid-js";
import { RoleGuard } from "@/features/auth/components/RoleGuard";
import { Roles } from "@/features/auth/enums/Roles.enum";

export const DrawerSidebar = () => {
  const locale = useLocale();

  const direct = () => (locale.locale().dir === "rtl" ? "right" : "left");

  const location = useLocation();
  const [isDrawerOpen, setIsDrawerOpen] = createSignal(false);

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <Drawer velocityFunction={() => 1} side={direct()} open={isDrawerOpen()}>
      <Drawer.Trigger
        as="button"
        class="flex lg:hidden items-center justify-center h-9 w-9 bg-primary rounded-full shadow-lg"
        onClick={() => setIsDrawerOpen(true)}
      >
        <CloseToMenuIcon class="text-white h-6 w-6" />
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay
          class="fixed inset-0 z-50 corvu-transitioning:transition-colors backdrop-brightness-75
          corvu-transitioning:duration-500"
          onClick={closeDrawer}
        />
        <Drawer.Content
          class={`fixed bottom-0 ${direct()}-0 z-50 flex flex-col justify-center items-center 
          h-full w-fit after:absolute border-s border-gray-600
          after:top-full after:h-1/2 after:bg-inherit bg-transparent
          corvu-transitioning:transition-transform corvu-transitioning:duration-500 
          overflow-auto`}
        >
          <div class="flex flex-col gap-2 bg-backgroundForm h-full w-[15rem] py-4 px-1">
            <div class="flex justify-between px-2">
              <button onClick={closeDrawer}>
                <CancelIcon class="text-text" />
              </button>
              <LogoIcon class="drop-shadow-lg" />
            </div>
            <div class="flex flex-col w-full gap-2 bg-transparent">
              <button onClick={closeDrawer}>
                <DrawerSidebarElement
                  path="/"
                  active={location.pathname === "/"}
                  title={locale.t("home") || ""}
                  icon={HomeIcon}
                />
              </button>
              <button onClick={closeDrawer}>
                <DrawerSidebarElement
                  active={location.pathname.includes("/services")}
                  path="/services"
                  title={locale.t("services") || ""}
                  icon={MedicalServicesIcon}
                />
              </button>
              <RoleGuard role={Roles.ADMIN}>
                <button onClick={closeDrawer}>
                  <DrawerSidebarElement
                    active={location.pathname.includes("/users")}
                    path="/users"
                    title={locale.t("users") || ""}
                    icon={UsersIcon}
                  />
                </button>
              </RoleGuard>
              <button onClick={closeDrawer}>
                <DrawerSidebarElement
                  active={location.pathname.includes("/settings")}
                  path="/settings"
                  title={locale.t("settings") || ""}
                  icon={SettingsIcon}
                />
              </button>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer>
  );
};
