import { DarkModeSetting } from "./DarkModeSetting";
import { LanguageSettings } from "./LanguageSettings";
import { ServicesSetting } from "./ServicesSetting";

export const Settings = () => {
  return (
    <div
      class="flex flex-1 sm:flex-nowrap flex-wrap px-2 py-2 items-center justify-center overflow-auto gap-4 
      h-full bg-backPrimary drop-shadow-xl rounded-sm"
    >
      <ServicesSetting />
      <DarkModeSetting />
      <LanguageSettings />
    </div>
  );
};
