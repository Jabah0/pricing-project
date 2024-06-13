import { WatchIcon } from "@/assets/icons/WatchIcon";
import { WatchOffIcon } from "@/assets/icons/WatchOffIcon";
import { JSX, Show, createSignal } from "solid-js";

export const PasswordInput = (
  props: JSX.InputHTMLAttributes<HTMLInputElement>
) => {
  const [isWatch, setIsWatch] = createSignal(false);

  return (
    <div class="flex items-center gap-2 bg-backgroundSec shadow-lg rounded-md border border-gray-400 py-1 px-2">
      <input
        {...props}
        class="bg-transparent text-text w-full"
        type={isWatch() ? "text" : "password"}
      />
      <Show
        when={isWatch()}
        fallback={
          <button onClick={() => setIsWatch((pre) => !pre)}>
            <WatchIcon class="text-text h-6 w-6" />
          </button>
        }
      >
        <button onClick={() => setIsWatch((pre) => !pre)}>
          <WatchOffIcon class="text-text h-6 w-6" />
        </button>
      </Show>
    </div>
  );
};
