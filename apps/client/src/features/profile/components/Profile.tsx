import {
  AccountIcon,
  CancelIcon,
  ConfirmIcon,
  EditIcon,
  EyeOffIcon,
} from "@/assets/icons";
import { useUser } from "@/features/auth/stores/UserStore";
import { useLocale } from "@/features/locale/LocaleProvider";
import { Match, Switch, createSignal } from "solid-js";

export const Profile = () => {
  const locale = useLocale();

  const [isEditing, setIsEditing] = createSignal(false);

  const [user, _setUser] = useUser();

  return (
    <div class="flex flex-wrap justify-center items-center gap-4 h-full bg-backPrimary overflow-auto py-4">
      <div class="flex flex-col md:basis-1/3 h-full w-full gap-3 justify-between items-center bg-backgroundSec text-text rounded-md shadow-xl py-4 px-4 overflow-auto">
        <div class="flex items-center justify-center gap-4 w-full bg-backPrimary drop-shadow-xl rounded-md">
          <div class="flex justify-center items-center gap-4 w-full py-1">
            <EditIcon class="text-yellow-700 h-[2rem] w-[2rem]" />
            <p class="text-2xl">{locale.t("changePassword")}</p>
          </div>
        </div>
        <div class="flex flex-col gap-4 items-center justify-between">
          <div class="flex items-center px-4 py-2 justify-between gap-4 w-full bg-backPrimary drop-shadow-xl rounded-md text-2xl">
            <input
              class="bg-transparent"
              placeholder={locale.t("oldPassword")}
            />
            <button>
              <EyeOffIcon class="text-text h-[1.5rem] w-[1.5rem]" />
            </button>
          </div>
          <div class="flex items-center px-4 py-2 justify-between gap-4 w-full bg-backPrimary drop-shadow-xl rounded-md text-2xl">
            <input
              class="bg-transparent"
              placeholder={locale.t("newPassword")}
            />
            <button>
              <EyeOffIcon class="text-text h-[1.5rem] w-[1.5rem]" />
            </button>
          </div>
        </div>

        <div class="flex items-center py-2 justify-between gap-4 w-full bg-backPrimary drop-shadow-xl rounded-md text-2xl">
          <button class="flex gap-4 items-center justify-center w-full">
            <EditIcon class="text-yellow-700 h-[2rem] w-[2rem]" />
            <p>Apply Change</p>
          </button>
        </div>
      </div>
      <div class="flex flex-col md:basis-1/3 h-full w-full gap-3 justify-center items-center bg-backgroundSec text-text rounded-md shadow-xl py-4 px-4 overflow-auto">
        <div class="flex justify-center items-center grow bg-backPrimary shadow-xl rounded-md w-full">
          <AccountIcon
            class="text-text
            xl:h-[10rem] xl:w-[22rem] 
            lg:h-[9rem] lg:w-[20rem] 
            sm:h-[8rem] sm:w-[19rem]
            h-[10rem] w-[18rem]"
          />
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
