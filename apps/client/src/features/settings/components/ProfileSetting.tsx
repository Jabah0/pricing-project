import { apiClient } from "@/api/api-client";
import {
  AccountIcon,
  CancelIcon,
  ConfirmIcon,
  EditIcon,
  LockIcon,
} from "@/assets/icons";
import { useUser } from "@/features/auth/stores/UserStore";
import { useLocale } from "@/features/locale/LocaleProvider";
import { ChangePasswordModal } from "@/features/settings/components/ChangePasswordModal";
import { createModal } from "@/lib/createModal";
import { User } from "api-contract";
import { createSignal, Match, Switch } from "solid-js";

const ChangePassword = () => {
  const { Modal, openModal } = createModal({ modal: ChangePasswordModal });
  const locale = useLocale();

  return (
    <>
      <button
        class="flex gap-4 justify-center items-center w-full py-1"
        onClick={() => openModal()}
      >
        <LockIcon class="text-primary h-[2rem] w-[2rem]" />
        <p>{locale.t("changePassword")}</p>
      </button>
      <Modal />
    </>
  );
};

export const ProfileSetting = () => {
  const locale = useLocale();

  const [isEditing, setIsEditing] = createSignal(false);

  const [user, setUser] = useUser();

  const prevUser = user();

  const onUpdateFullName = (val: string) => {
    setUser((pre) => {
      if (!pre) return;
      return { ...pre, fullName: val };
    });
  };

  const onUpdateUserMutation = apiClient.users.patch.createMutation({
    onError: () => {},
    onSuccess: () => {
      setIsEditing(true);
    },
  });

  const onUpdateUser = () => {
    onUpdateUserMutation.mutate({
      body: { username: user()?.username, fullName: user()?.fullName },
      params: { id: 2 },
    });
  };

  return (
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

      <div class="flex flex-col gap-3 items-start justify-center w-full bg-backPrimary shadow-xl px-4 py-2 rounded-md text-2xl">
        <div class="flex flex-col items-center justify-center w-full bg-backgroundForm shadow-xl px-4 text-2xl">
          <p>{locale.t("fullName")}</p>
        </div>
        <div class="flex flex-col items-center justify-center w-full bg-backgroundForm shadow-xl px-4 text-2xl">
          <Switch>
            <Match when={!isEditing()}>
              <p>{user()?.fullName}</p>
            </Match>
            <Match when={isEditing()}>
              <input
                value={user()?.fullName}
                class="bg-transparent text-center"
                onInput={(e) => onUpdateFullName(e.currentTarget.value)}
              />
            </Match>
          </Switch>
        </div>
      </div>
      <div class="flex flex-col gap-3 items-start justify-center w-full bg-backPrimary shadow-xl px-4 py-2 rounded-md text-2xl">
        <div class="flex flex-col items-center justify-center w-full bg-backgroundForm shadow-xl px-4 text-2xl">
          <p class="">{locale.t("username")}</p>
        </div>
        <div class="flex flex-col items-center justify-center w-full bg-backgroundForm shadow-xl px-4 text-2xl">
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
      <div class="flex items-center justify-center gap-4 w-full bg-backPrimary shadow-xl rounded-md">
        <Switch>
          <Match when={!isEditing()}>
            <button
              class="flex gap-4 justify-center items-center w-full py-1"
              onClick={() => setIsEditing(true)}
            >
              <EditIcon class="text-yellow-700 h-[2rem] w-[2rem]" />
              <p>{locale.t("editData")}</p>
            </button>
          </Match>
          <Match when={isEditing()}>
            <button class="bg-backgroundForm my-1 rounded-md shadow-lg">
              <ConfirmIcon class="text-green-600 h-[2rem] w-[2rem]" />
            </button>
            <button
              class="bg-backgroundForm my-1 rounded-md shadow-lg"
              onClick={() => {
                setIsEditing(false);
                setUser(prevUser);
              }}
            >
              <CancelIcon class="text-red-600 h-[2rem] w-[2rem]" />
            </button>
          </Match>
        </Switch>
      </div>
      <div class="flex items-center justify-center gap-4 p-1 w-full bg-backPrimary shadow-xl rounded-md">
        <ChangePassword />
      </div>
    </div>
  );
};
