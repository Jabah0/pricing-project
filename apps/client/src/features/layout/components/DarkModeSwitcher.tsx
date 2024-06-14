import { Match, Switch } from "solid-js";
import ClearDayFill from "@/assets/icons/ClearDayFill";
import ClearNightFill from "@/assets/icons/ClearNightFill";
import { DarkModService } from "../services/DarkModService";

export const DarkModeSwitcher = () => {
  const service = DarkModService();

  return (
    <div>
      <Switch>
        <Match when={service.isDarkMode()}>
          <button
            class="h-9 w-9 border border-textSecondary bg-elementBack rounded-full drop-shadow-lg 
            flex justify-center items-center"
            onClick={service.toggleDarkMode}
          >
            <ClearNightFill class="object-cover" />
          </button>
        </Match>
        <Match when={!service.isDarkMode()}>
          <button
            class="h-9 w-9 border border-textSecondary bg-elementBack rounded-full drop-shadow-lg 
            flex justify-center items-center"
            onClick={service.toggleDarkMode}
          >
            <ClearDayFill class="object-cover" />
          </button>
        </Match>
      </Switch>
    </div>
  );
};
