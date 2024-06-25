import { useLocale } from "@/features/locale/LocaleProvider";
import { CardWrapper } from "./CardWrapper";
import { LanguageCombobox } from "./LanguageCombobox";

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
        <LanguageCombobox />
      </div>
    </CardWrapper>
  );
};
