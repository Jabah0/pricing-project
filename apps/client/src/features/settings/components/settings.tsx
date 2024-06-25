import { DarkModeSetting } from "./DarkModeSetting";
import { LanguageSettings } from "./LanguageSettings";
import { ServicesSetting } from "./ServicesSetting";

export const Settings = () => {
  return (
    <div
      class="flex flex-wrap gap-4 items-center justify-center py-2 px-2 overflow-auto
      h-full bg-backPrimary drop-shadow-xl rounded-sm"
    >
      <ServicesSetting />
      <DarkModeSetting />
      <LanguageSettings />
    </div>
  );
};
