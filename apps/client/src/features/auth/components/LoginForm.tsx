import { useLocale } from "@/features/locale/locale.context";
import { PasswordInput } from "./PasswordInput";
import { UsernameInput } from "./UsernameInput";
import { apiClient } from "@/api/api-client";
import toast from "solid-toast";
import { useNavigate } from "@solidjs/router";

export const LoginForm = () => {
  const navigator = useNavigate();

  const locale = useLocale();

  const loginMutation = apiClient.auth.login.createMutation({
    onError: () => {
      console.log("onError");
      toast.error("loginFailed");
    },
    onSuccess: () => {
      toast.success("loginSuccess");
      navigator("/");
    },
  });

  const onSubmit = () => {
    console.log("onSubmit executed");
    loginMutation.mutate({
      body: {
        username: "user",
        password: "password",
      },
    });
  };

  return (
    <div>
      <div class="flex flex-col gap-10">
        <div>
          <p class="text-white text-6xl">{locale.t("welcome")}</p>
          <p class="text-gray-400">{locale.t("welcomeSubtext")}</p>
        </div>
        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-1">
            <label for="usernameInput" class="text-gray-400">
              {locale.t("username")}
            </label>
            <UsernameInput id="usernameInput" />
          </div>
          <div class="flex flex-col gap-1">
            <label for="passwordInput" class="text-gray-400">
              {locale.t("password")}
            </label>
            <PasswordInput id="passwordInput" />
          </div>
          <div class="flex gap-6">
            <button
              onClick={onSubmit}
              class="rounded-lg w-full h-[2.5rem] bg-primary text-white text-center text-lg font-bold shadow-lg"
            >
              {locale.t("login")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
