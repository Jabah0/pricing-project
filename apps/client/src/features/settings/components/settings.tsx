import { RoleGuard } from "@/features/auth/components/RoleGuard";
import { DarkModeSetting } from "./DarkModeSetting";
import { LanguageSettings } from "./LanguageSettings";
import { ProfileSetting } from "./ProfileSetting";
import { ServicesSetting } from "./ServicesSetting";
import { Roles } from "@/features/auth/enums/Roles.enum";

export const Settings = () => {
  return (
    <div
      class="flex flex-wrap gap-4 items-center justify-center py-2 px-2 overflow-auto
      h-full bg-backPrimary shadow-xl rounded-sm"
    >
      <ProfileSetting />
      <div class="flex flex-col gap-2 grow h-full">
        <LanguageSettings />
        <DarkModeSetting />
      </div>
      <RoleGuard role={Roles.ADMIN}>
        <ServicesSetting />
      </RoleGuard>
    </div>
  );
};
