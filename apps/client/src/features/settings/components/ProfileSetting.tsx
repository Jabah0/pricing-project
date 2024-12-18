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
import { createSignal, Match, Switch } from "solid-js";
import toast from "solid-toast";

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
      if (!pre) return pre;
      return { ...pre, fullName: val };
    });
  };

  const onUpdateUserMutation = apiClient.auth.updateMyInfo.createMutation({
    onError: () => {
      toast.success(locale.t("updateMyDataError"));
    },
    onSuccess: () => {
      setIsEditing(false);
      toast.success(locale.t("updateMyDataSuccess"));
    },
  });

  const onUpdateUser = () => {
    onUpdateUserMutation.mutate({
      body: { username: user()?.username, fullName: user()?.fullName },
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

      <div
        class="flex flex-col gap-3 items-start justify-center w-full bg-backPrimary shadow-xl 
            px-4 py-2 rounded-md text-2xl"
      >
        <div
          class="flex flex-col items-center justify-center w-full bg-backgroundForm shadow-xl px-4 
              text-2xl"
        >
          <p>{locale.t("fullName")}</p>
        </div>
        <div
          class="flex items-center justify-center gap-4 w-full bg-backgroundForm 
              shadow-xl px-4 text-2xl group"
        >
          <Switch>
            <Match when={!isEditing()}>
              <p>{user()?.fullName}</p>
              <button
                class="flex gap-4 justify-center items-center py-1 invisible group-hover:visible"
                onClick={() => setIsEditing(true)}
              >
                <EditIcon class="text-yellow-700" />
              </button>
            </Match>
            <Match when={isEditing()}>
              <input
                value={user()?.fullName}
                class="bg-transparent w-full"
                onInput={(e) => onUpdateFullName(e.currentTarget.value)}
              />
              <div class="flex gap-1">
                <button
                  class="bg-backPrimary my-1 rounded-md shadow-lg"
                  onClick={() => onUpdateUser()}
                >
                  <ConfirmIcon class="text-green-600" />
                </button>
                <button
                  class="bg-backPrimary my-1 rounded-md shadow-lg"
                  onClick={() => {
                    setIsEditing(false);
                    setUser(prevUser);
                  }}
                >
                  <CancelIcon class="text-red-600" />
                </button>
              </div>
            </Match>
          </Switch>
        </div>
      </div>
      <div class="flex flex-col gap-3 items-start justify-center w-full bg-backPrimary shadow-xl px-4 py-2 rounded-md text-2xl">
        <div class="flex flex-col items-center justify-center w-full bg-backgroundForm shadow-xl px-4 text-2xl">
          <p class="">{locale.t("username")}</p>
        </div>
        <div class="flex flex-col items-center justify-center w-full bg-backgroundForm shadow-xl px-4 text-2xl">
          <p>{user()?.username}</p>
        </div>
      </div>
      <div class="flex items-center justify-center gap-4 p-1 w-full bg-backPrimary shadow-xl rounded-md">
        <ChangePassword />
      </div>
    </div>
  );
};
