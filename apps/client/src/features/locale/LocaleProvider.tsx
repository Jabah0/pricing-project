import {
  Accessor,
  ParentComponent,
  createContext,
  createResource,
  createSignal,
  onMount,
  useContext,
} from "solid-js";
import { type LocaleType, fetchDictionary, RawDictionary } from ".";
import * as i18n from "@solid-primitives/i18n";
import { makePersisted } from "@solid-primitives/storage";

interface LocaleContextType {
  locale: Accessor<LocaleType>;
  switchLocale: (locale: LocaleType) => void;
  t: i18n.NullableTranslator<RawDictionary, string>;
}

export const languages: LocaleType[] = [
  {
    title: "العربية",
    short: "AR",
    value: "ar",
    dir: "rtl",
  },
  {
    title: "English",
    short: "EN",
    value: "en",
    dir: "ltr",
  },
];

const LocaleContext = createContext<LocaleContextType>();

export const LocaleProvider: ParentComponent = (props) => {
  const [locale, setLocale] = makePersisted(
    createSignal<LocaleType>(languages[1]),
    { storage: localStorage }
  );

  onMount(() => {
    document.dir = locale().dir;
  });

  const [dict] = createResource(locale, fetchDictionary);

  function switchLocale(locale: LocaleType) {
    document.dir = locale.dir;
    setLocale(locale);
  }

  const t = i18n.translator(dict, i18n.resolveTemplate);

  return (
    <LocaleContext.Provider value={{ locale, switchLocale, t }}>
      {props.children}
    </LocaleContext.Provider>
  );
};

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new ReferenceError("I18nContext");

  return context;
}
