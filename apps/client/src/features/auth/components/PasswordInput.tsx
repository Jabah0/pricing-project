import { WatchIcon } from "@/assets/icons/WatchIcon";
import { WatchOffIcon } from "@/assets/icons/WatchOffIcon";
import { useLocale } from "@/features/locale/locale.context";
import { JSX, Match, Switch, createSignal } from "solid-js";

export const PasswordInput = (
  props: JSX.InputHTMLAttributes<HTMLInputElement>
) => {
  const locale = useLocale();
  const [isWatch, setIsWatch] = createSignal(true);

  const onSwitchVisible = () => {
    setIsWatch((pre) => !pre);
  };

  return (
    <div class="border border-gray-600 w-[20rem] rounded-lg px-2 py-1 shadow-lg flex justify-center items-center gap-3 bg-backPrimary">
      <button onClick={onSwitchVisible}>
        <Switch>
          <Match when={isWatch()}>
            <WatchIcon class="text-white" />
          </Match>
          <Match when={!isWatch()}>
            <WatchOffIcon class="text-white" />
          </Match>
        </Switch>
      </button>
      <input
        {...props}
        class="bg-transparent w-full text-white"
        placeholder={locale.t("enterPassword")}
      />
    </div>
  );
};
