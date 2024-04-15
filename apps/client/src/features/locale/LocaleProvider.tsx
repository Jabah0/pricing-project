import { JSX } from "solid-js";
import { LocaleContext } from "./locale.context";
import { i18n } from "i18next";

type Props = {
  children: JSX.Element;
  i18n: i18n;
};

export function LocaleProvider(props: Props) {
  return (
    <LocaleContext.Provider value={props.i18n}>
      {props.children}
    </LocaleContext.Provider>
  );
}
