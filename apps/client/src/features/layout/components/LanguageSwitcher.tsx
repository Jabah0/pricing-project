import { languages, useLocale } from "@/features/locale/LocaleProvider";

export const LanguageSwitcher = () => {
  const locale = useLocale();

  return (
    <div>
      <button
        class="h-9 w-9 border border-white bg-elementBack rounded-full shadow-lg flex 
        justify-center items-center text-text font-bold"
        onClick={() => {
          if (locale.locale().value === "ar") locale.switchLocale(languages[1]);
          else locale.switchLocale(languages[0]);
        }}
      >
        {locale.locale().short}
      </button>
    </div>
  );
};
