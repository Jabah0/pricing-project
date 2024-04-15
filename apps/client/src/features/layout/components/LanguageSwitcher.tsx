import { createSignal } from "solid-js";

type Lang = {
  name: string;
  short: string;
};

export const LanguageSwitcher = () => {
  const languages = [
    {
      name: "Arabic",
      short: "AR",
    },
    {
      name: "English",
      short: "EN",
    },
  ];

  const [lang, setLang] = createSignal<Lang>(languages[0]);

  return (
    <div>
      <button
        class="h-9 w-9 border border-white bg-elementBack rounded-full shadow-lg flex 
        justify-center items-center text-white font-bold"
      >
        {lang().short}
      </button>
    </div>
  );
};
