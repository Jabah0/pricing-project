import { WatchIcon } from "@/assets/icons/WatchIcon";
import { WatchOffIcon } from "@/assets/icons/WatchOffIcon";
import { JSX, Show, createSignal } from "solid-js";

export const PasswordInput = (
  props: JSX.InputHTMLAttributes<HTMLInputElement>
) => {
  const [isWatch, setIsWatch] = createSignal(false);

  return (
    <div class="flex items-center gap-2 bg-backPrimary shadow-lg rounded-md border border-gray-400 p-1">
      <Show
        when={isWatch()}
        fallback={
          <button onClick={() => setIsWatch((pre) => !pre)}>
            <WatchIcon class="text-white h-6 w-6" />
          </button>
        }
      >
        <button onClick={() => setIsWatch((pre) => !pre)}>
          <WatchOffIcon class="text-white h-6 w-6" />
        </button>
      </Show>
      <input
        {...props}
        class="bg-transparent text-white w-full"
        type={isWatch() ? "text" : "password"}
      />
    </div>
  );
};