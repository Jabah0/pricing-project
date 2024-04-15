import { Match, Switch, createSignal } from "solid-js";
import { FaSolidMoon, FaSolidSun } from "solid-icons/fa";

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
            <FaSolidMoon class="fill-moon h-6 w-6" />
          </button>
        </Match>
        <Match when={!isDark()}>
          <button
            class="h-9 w-9 border border-white bg-white rounded-full shadow-lg flex 
            justify-center items-center"
            onClick={onClick}
          >
            <FaSolidSun class="fill-sun h-6 w-6" />
          </button>
        </Match>
      </Switch>
    </div>
  );
};
