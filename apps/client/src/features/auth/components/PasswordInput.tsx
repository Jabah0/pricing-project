import { WatchIcon } from "@/assets/icons/WatchIcon";
import { WatchOffIcon } from "@/assets/icons/WatchOffIcon";
import { useLocale } from "@/features/locale/LocaleProvider";
import { JSX, Match, Switch, createSignal } from "solid-js";

export const PasswordInput = (
  props: JSX.InputHTMLAttributes<HTMLInputElement>
) => {
  const locale = useLocale();

  const [isWatch, setIsWatch] = createSignal(false);

  const onSwitchVisible = () => {
    setIsWatch((pre) => !pre);
  };

  return (
    <div class="border border-gray-600 w-[20rem] rounded-lg px-2 py-1 shadow-lg flex justify-center items-center gap-3 bg-inputForm">
      <button onClick={onSwitchVisible}>
        <Switch>
          <Match when={!isWatch()}>
            <WatchIcon class="text-text" />
          </Match>
          <Match when={isWatch()}>
            <WatchOffIcon class="text-text" />
          </Match>
        </Switch>
      </button>
      <input
        {...props}
        autocomplete="off"
        class="bg-transparent w-full text-text"
        placeholder={locale.t("enterPassword")}
        type={isWatch() ? "text" : "password"}
      />
    </div>
  );
};
