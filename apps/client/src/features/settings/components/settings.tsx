import { DarkModeSetting } from "./DarkModeSetting";
import { ServicesSetting } from "./ServicesSetting";

export const Settings = () => {
  return (
    <div class="flex flex-wrap overflow-auto justify-center gap-4 items-center h-full bg-backPrimary drop-shadow-xl">
      <ServicesSetting />
      <DarkModeSetting />
    </div>
  );
};
