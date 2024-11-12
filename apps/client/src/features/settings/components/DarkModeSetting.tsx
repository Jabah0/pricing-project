import { ClearDayFill, ClearNightFill } from "@/assets/icons";
import { useDarkMode } from "@/features/layout/services/DarkModService";
import { useLocale } from "@/features/locale/LocaleProvider";
import { Switch, Match } from "solid-js";
import { CardWrapper } from "./CardWrapper";

export const DarkModeSetting = () => {
  const locale = useLocale();
  const service = useDarkMode();

  return (
    <CardWrapper>
      <div class="flex flex-col justify-center gap-4 h-full w-full flex-1 px-4 max-w-[25rem]">
        <div class="flex justify-center items-center bg-backPrimary h-full drop-shadow-xl rounded-md">
          <Switch>
            <Match when={service.isDarkMode()}>
              <div
                class="flex justify-center items-center h-[20rem] w-[20rem] lg:h-[10rem] lg:w-[10rem]
                  text-secondary drop-shadow-xl"
              >
                <ClearNightFill class="object-cover h-full w-full" />
              </div>
            </Match>
            <Match when={!service.isDarkMode()}>
              <div
                class="flex justify-center items-center h-[20rem] w-[20rem] lg:h-[10rem] lg:w-[10rem]
                text-secondary drop-shadow-xl"
              >
                <ClearDayFill class="object-cover h-full w-full" />
              </div>
            </Match>
          </Switch>
        </div>
        <div class="flex justify-center items-center bg-backPrimary drop-shadow-xl px-4 py-2 rounded-md">
          <p class="text-2xl text-text">{locale.t("darkMode")}</p>
        </div>
        <div class="flex justify-center items-center bg-backPrimary drop-shadow-xl rounded-md">
          <Switch>
            <Match when={!service.isDarkMode()}>
              <button
                class="flex justify-center items-center text-2xl font-bold w-full h-full 
                py-2 px-4 text-white bg-red-700 rounded-md drop-shadow-xl"
                onClick={() => service.toggleDarkMode()}
              >
                {"OFF"}
              </button>
            </Match>
            <Match when={service.isDarkMode()}>
              <button
                class="flex justify-center items-center text-2xl font-bold w-full h-full 
                py-2 px-4 text-white bg-green-700 rounded-md drop-shadow-xl"
                onClick={() => service.toggleDarkMode()}
              >
                {"ON"}
              </button>
            </Match>
          </Switch>
        </div>
      </div>
    </CardWrapper>
  );
};
