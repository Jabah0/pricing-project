import { EditIcon } from "@/assets/icons";
import { useLocale } from "@/features/locale/LocaleProvider";
import { Match, Switch } from "solid-js";
import { CardWrapper } from "./CardWrapper";

export const LanguageSettings = () => {
  const locale = useLocale();

  return (
    <CardWrapper>
      <div class="flex flex-col gap-4 min-w-[20rem] min-h-[20rem] px-2">
        <div class="flex justify-center items-center bg-backPrimary h-full drop-shadow-xl rounded-md">
          <p class="text-2xl text-text">{locale.locale().title}</p>
        </div>
        <div class="flex justify-center items-center bg-backPrimary drop-shadow-xl px-4 py-2 rounded-md">
          <p class="text-2xl text-text">{locale.t("language")}</p>
        </div>
        <div class="flex justify-center items-center bg-backPrimary drop-shadow-xl py-2 rounded-md">
          <button
            class="flex justify-center items-center text-2xl w-full text-text"
            onClick={() => {}}
          >
            <EditIcon class="text-yellow-700" />
          </button>
        </div>
      </div>
    </CardWrapper>
  );
};
