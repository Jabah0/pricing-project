import {
  AccountIcon,
  CancelIcon,
  ConfirmIcon,
  EditIcon,
  EyeOffIcon,
} from "@/assets/icons";
import { useUser } from "@/features/auth/stores/UserStore";
import { useLocale } from "@/features/locale/LocaleProvider";
import { Match, Show, Switch, createSignal } from "solid-js";

export const Profile = () => {
  const locale = useLocale();

  const [isEditing, setIsEditing] = createSignal(false);
  const [isEditPassword, setIsEditPassword] = createSignal(false);

  const [user, _setUser] = useUser();

  return (
    <div class="flex justify-center items-center h-full bg-backPrimary">
      <div class="flex flex-col gap-3 justify-center items-center bg-backgroundSec text-text rounded-md drop-shadow-xl py-4 px-4">
        <div class="bg-backPrimary shadow-xl rounded-md">
          <AccountIcon class="text-text h-[20rem] w-[25rem]" />
        </div>

        <div class="flex flex-col gap-3 items-start justify-center w-full bg-backPrimary drop-shadow-xl px-4 py-2 rounded-md text-2xl">
          <div class="flex flex-col items-center justify-center w-full bg-backgroundForm drop-shadow-xl px-4 text-2xl">
            <p>{locale.t("fullName")}</p>
          </div>
          <div class="flex flex-col items-center justify-center w-full bg-backgroundForm drop-shadow-xl px-4 text-2xl">
            <Switch>
              <Match when={!isEditing()}>
                <p>{user()?.fullName}</p>
              </Match>
              <Match when={isEditing()}>
                <input
                  value={user()?.fullName}
                  class="bg-transparent text-center"
                />
              </Match>
            </Switch>
          </div>
        </div>
        <div class="flex flex-col gap-3 items-start justify-center w-full bg-backPrimary drop-shadow-xl px-4 py-2 rounded-md text-2xl">
          <div class="flex flex-col items-center justify-center w-full bg-backgroundForm drop-shadow-xl px-4 text-2xl">
            <p class="">{locale.t("username")}</p>
          </div>
          <div class="flex flex-col items-center justify-center w-full bg-backgroundForm drop-shadow-xl px-4 text-2xl">
            <Switch>
              <Match when={!isEditing()}>
                <p>{user()?.username}</p>
              </Match>
              <Match when={isEditing()}>
                <input
                  value={user()?.username}
                  class="bg-transparent text-center"
                />
              </Match>
            </Switch>
          </div>
        </div>
        <Show when={isEditing()}>
          <Switch>
            <Match when={isEditPassword()}>
              <div class="flex items-center px-4 py-2 justify-between gap-4 w-full bg-backPrimary drop-shadow-xl rounded-md text-2xl">
                <input class="bg-transparent" placeholder="oldPassword" />
                <button>
                  <EyeOffIcon class="text-text h-[1.5rem] w-[1.5rem]" />
                </button>
              </div>
              <div class="flex items-center px-4 py-2 justify-between gap-4 w-full bg-backPrimary drop-shadow-xl rounded-md text-2xl">
                <input class="bg-transparent" placeholder="newPassword" />
                <button>
                  <EyeOffIcon class="text-text h-[1.5rem] w-[1.5rem]" />
                </button>
              </div>
            </Match>
            <Match when={!isEditPassword()}>
              <div class="flex items-center justify-center gap-4 w-full bg-backPrimary drop-shadow-xl rounded-md">
                <button
                  class="flex justify-center items-center gap-4 w-full py-1"
                  onClick={() => setIsEditPassword(true)}
                >
                  <EditIcon class="text-yellow-700 h-[2rem] w-[2rem]" />
                  <p class="text-2xl">{locale.t("changePassword")}</p>
                </button>
              </div>
            </Match>
          </Switch>
        </Show>
        <div class="flex items-center justify-center gap-4 w-full bg-backPrimary drop-shadow-xl rounded-md">
          <Switch>
            <Match when={!isEditing()}>
              <button
                class="flex justify-center items-center w-full py-1"
                onClick={() => setIsEditing(true)}
              >
                <EditIcon class="text-yellow-700 h-[3rem] w-[3rem]" />
              </button>
            </Match>
            <Match when={isEditing()}>
              <button class="bg-backgroundForm my-1 rounded-md drop-shadow-lg">
                <ConfirmIcon class="text-green-600 h-[3rem] w-[3rem]" />
              </button>
              <button
                class="bg-backgroundForm my-1 rounded-md drop-shadow-lg"
                onClick={() => {
                  setIsEditPassword(false);
                  setIsEditing(false);
                }}
              >
                <CancelIcon class="text-red-600 h-[3rem] w-[3rem]" />
              </button>
            </Match>
          </Switch>
        </div>
      </div>
    </div>
  );
};
