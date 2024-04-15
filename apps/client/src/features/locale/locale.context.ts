import { i18n } from "i18next";
import { createContext, useContext } from "solid-js";

export const LocaleContext = createContext<i18n>();

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new ReferenceError("I18nContext");

  return context;
}
