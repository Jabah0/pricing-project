import { Match, Switch, createSignal } from "solid-js";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { DarkModeSwitcher } from "./DarkModeSwitcher";
import { CloseToMenuIcon } from "@/assets/icons/CloseToMenuIcon";
import { MenuToCloseIcon } from "@/assets/icons/MenuToCloseIcon";

export const FloatMenu = () => {
  const [isVisible, setIsVisible] = createSignal(false);

  const onClick = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <div
      class={`bg-secondary rounded-full fixed -top-24 -right-24 h-64 w-64
      ${!isVisible() && "invisible"}`}
    >
      <div class="relative">
        <button
          class="fixed top-4 right-4 h-12 w-12 rounded-full bg-iconStroke
          flex justify-center items-center visible"
          onClick={onClick}
        >
          <Switch>
            <Match when={!isVisible()}>
              <CloseToMenuIcon class="text-white h-6 w-6 transition-all" />
            </Match>
            <Match when={isVisible()}>
              <MenuToCloseIcon class="text-white fill-white h-6 w-6 transition-all" />
            </Match>
          </Switch>
        </button>
        <div class={`fixed top-6 right-28`}>
          <LanguageSwitcher />
        </div>
        <div class={`fixed top-20 right-20`}>
          <DarkModeSwitcher />
        </div>
      </div>
    </div>
  );
};
