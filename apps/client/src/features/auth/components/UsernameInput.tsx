import { AccountIcon } from "@/assets/icons/AccountIcon";
import { useLocale } from "@/features/locale/locale.context";
import { JSX } from "solid-js";

export const UsernameInput = (
  props: JSX.InputHTMLAttributes<HTMLInputElement>
) => {
  const locale = useLocale();

  return (
    <div class="border border-gray-600 w-[20rem] rounded-lg px-2 py-1 shadow-lg flex justify-center items-center gap-3 bg-backPrimary">
      <AccountIcon class="text-white" />
      <input
        {...props}
        id="usernameInput"
        class="bg-transparent w-full text-white"
        placeholder={locale.t("enterUsername")}
      />
    </div>
  );
};
