import * as i18n from "@solid-primitives/i18n";
import type * as en from "./translations/en";

export type LocaleType =
  | { title: "English"; short: "EN"; value: "en"; dir: "ltr" }
  | { title: "العربية"; short: "AR"; value: "ar"; dir: "rtl" };
export type RawDictionary = typeof en.dict;
export type Dictionary = i18n.Flatten<RawDictionary>;

export async function fetchDictionary(locale: LocaleType): Promise<Dictionary> {
  const dict: RawDictionary = (
    await import(`./translations/${locale.value}.ts`)
  ).dict;
  return i18n.flatten(dict);
}
