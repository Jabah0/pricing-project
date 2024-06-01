import { PasswordInput } from "./PasswordInput";
import { UsernameInput } from "./UsernameInput";
import { apiClient } from "@/api/api-client";
import toast from "solid-toast";
import { useNavigate } from "@solidjs/router";
import { createSignal } from "solid-js";
import { useUser } from "../stores/UserStore";
import { SuccessToast } from "@/toasts/SuccessToast";

export const LoginForm = () => {
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
      toast.error("loginFailed");
    },
    onSuccess: async () => {
      toast.custom((t) => (
        <SuccessToast
          message={"loginSuccess"}
          onDismiss={() => toast.dismiss(t.id)}
        />
      ));
      const { data } = await getUserInfoQuery.refetch();
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
        <div>
          <p class="text-white text-6xl">{"welcome"}</p>
          <p class="text-gray-400">{"welcomeSubtext"}</p>
        </div>
        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-1">
            <label for="usernameInput" class="text-gray-400">
              {"username"}
            </label>
            <UsernameInput
              id="usernameInput"
              value={username()}
              onInput={(e) => setUsername(e.target.value)}
            />
          </div>
          <div class="flex flex-col gap-1">
            <label for="passwordInput" class="text-gray-400">
              {"password"}
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
              {"login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
