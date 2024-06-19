import { DarkModeSwitcher } from "./DarkModeSwitcher";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ProfileButton } from "./ProfileButton";
import { DrawerSidebar } from "./DrawerSidebar";

export const Navbar = () => {
  return (
    <div class="flex items-center justify-between h-fit">
      <div>
        <DrawerSidebar />
      </div>
      <div class="flex gap-4">
        <LanguageSwitcher />
        <DarkModeSwitcher />
        <ProfileButton />
      </div>
    </div>
  );
};
