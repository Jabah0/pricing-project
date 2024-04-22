import { Match, Switch, createSignal } from "solid-js";
import ClearDayFill from "@/assets/icons/ClearDayFill";
import ClearNightFill from "@/assets/icons/ClearNightFill";

export const DarkModeSwitcher = () => {
  const [isDark, setIsDark] = createSignal(true);
  const onClick = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <div>
      <Switch>
        <Match when={isDark()}>
          <button
            class="h-9 w-9 border border-white bg-elementBack rounded-full shadow-lg flex 
              justify-center items-center"
            onClick={onClick}
          >
            <ClearNightFill />
          </button>
        </Match>
        <Match when={!isDark()}>
          <button
            class="h-9 w-9 border border-white bg-white rounded-full shadow-lg flex 
            justify-center items-center"
            onClick={onClick}
          >
            <ClearDayFill />
          </button>
        </Match>
      </Switch>
    </div>
  );
};
