import { EditIcon } from "@/assets/icons";
import { useLocale } from "@/features/locale/LocaleProvider";
import { Match, Switch } from "solid-js";

export const LanguageSettings = () => {
  const locale = useLocale();

  return (
    <div
      class="flex flex-col items-center justify-center drop-shadow-lg bg-backgroundSec 
    h-[46rem] w-[34rem] lg:h-[34rem] lg:w-[26rem]"
    >
      <div class="flex flex-col flex-wrap gap-4 min-w-[20rem] px-2">
        <div class="flex justify-center items-center bg-backPrimary drop-shadow-xl rounded-md"></div>
        <div class="flex justify-center items-center bg-backPrimary drop-shadow-xl px-4 py-2 rounded-md">
          <p class="text-2xl text-text">{locale.t("darkMode")}</p>
        </div>
        <div class="flex justify-center items-center bg-backPrimary drop-shadow-xl py-2 rounded-md">
          <button
            class="flex justify-center items-center text-2xl w-full text-text"
            onClick={() => service.toggleDarkMode()}
          >
            <EditIcon class="text-yellow-700" />
          </button>
        </div>
      </div>
    </div>
  );
};
