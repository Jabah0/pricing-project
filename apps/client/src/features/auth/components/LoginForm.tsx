import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import toast from "solid-toast";
import { apiClient } from "@/api/api-client";
import { useLocale } from "@/features/locale/LocaleProvider";
import { useUser } from "../stores/UserStore";
import { PasswordInput } from "./PasswordInput";
import { UsernameInput } from "./UsernameInput";

export const LoginForm = () => {
  const locale = useLocale();
  const navigator = useNavigate();

  const [password, setPassword] = createSignal("");
  const [username, setUsername] = createSignal("");

  const isEnabled = () => password().length > 0 && username().length > 0;

  const [_user, setUser] = useUser();

  const getUserInfoQuery = apiClient.auth.whoAmI.createQuery(
    () => ["myInfo"],
    {},
    { enabled: false }
  );

  const loginMutation = apiClient.auth.login.createMutation({
    onError: () => {
      toast.error(locale.t("loginFailed"));
    },
    onSuccess: async () => {
      const { data } = await getUserInfoQuery.refetch({});
      setUser(() => data?.body);
      navigator("/");
    },
  });

  const onSubmit = () => {
    if (!isEnabled()) return null;
    loginMutation.mutate({
      body: {
        username: username(),
        password: password(),
      },
    });
  };

  return (
    <div>
      <div class="flex flex-col gap-10">
        <div class="flex flex-col gap-2">
          <p class="text-text text-6xl">{locale.t("welcomeMessage")}</p>
          <p class="text-textSecondary text-xl">
            {locale.t("welcomeSubtextMessage")}
          </p>
        </div>
        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-1">
            <label for="usernameInput" class="text-textSecondary">
              {locale.t("username")}
            </label>
            <UsernameInput
              id="usernameInput"
              value={username()}
              onInput={(e) => setUsername(e.target.value)}
            />
          </div>
          <div class="flex flex-col gap-1">
            <label for="passwordInput" class="text-textSecondary">
              {locale.t("password")}
            </label>
            <PasswordInput
              id="passwordInput"
              value={password()}
              onInput={(e) => setPassword(e.target.value)}
            />
          </div>
          <div class="flex gap-6">
            <button
              onClick={onSubmit}
              class={`rounded-lg w-full h-[2.5rem] bg-primary text-white text-center 
              text-lg font-bold shadow-lg ${isEnabled() ? "hover:opacity-70" : "hover:cursor-not-allowed"}`}
              disabled={!isEnabled()}
            >
              {locale.t("login")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
