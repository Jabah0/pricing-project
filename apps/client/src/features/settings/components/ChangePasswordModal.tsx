import { apiClient } from "@/api/api-client";
import {
  CancelIcon,
  EditIcon,
  EyeOffIcon,
  EyeOnIcon,
  LockIcon,
} from "@/assets/icons";
import { useLocale } from "@/features/locale/LocaleProvider";
import { createSignal, Match, Switch } from "solid-js";
import toast from "solid-toast";

export const ChangePasswordModal = (props: { onClose: () => void }) => {
  const locale = useLocale();

  const [oldPassword, setOldPassword] = createSignal("");
  const [newPassword, setNewPassword] = createSignal("");

  const onChangePassword = apiClient.auth.updateMyPassword.createMutation({
    onError: () =>
      toast.error("error", {
        style: {
          "background-color": "#292E4E",
          color: "#696b6e",
        },
      }),
    onSuccess: () => props.onClose(),
  });

  const onSubmit = () => {
    if (oldPassword().trim() === "" || newPassword().trim() === "")
      return toast.error("error", {
        style: {
          "background-color": "#292E4E",
          color: "#696b6e",
        },
      });

    onChangePassword.mutate({
      body: {
        newPassword: newPassword().trim(),
        oldPassword: oldPassword().trim(),
      },
    });
  };

  return (
    <form
      onSubmit={() => onSubmit()}
      class="flex flex-col md:basis-1/3 h-full w-[28rem] gap-3 justify-between 
        items-center bg-backgroundSec text-text rounded-sm shadow-xl py-4 px-4"
    >
      <div class="flex items-center justify-center gap-4 w-full bg-backPrimary drop-shadow-xl rounded-md">
        <div class="flex justify-center items-center gap-4 w-full py-1">
          <LockIcon class="text-primary h-[2rem] w-[2rem]" />
          <p class="text-2xl">{locale.t("changePassword")}</p>
        </div>
      </div>
      <div class="flex flex-col gap-4 items-center justify-between w-full">
        <PasswordInput
          placeholder={locale.t("oldPassword")}
          value={oldPassword()}
          onInput={(val) => setOldPassword(val)}
        />
        <PasswordInput
          placeholder={locale.t("newPassword")}
          value={newPassword()}
          onInput={(val) => setNewPassword(val)}
        />
      </div>

      <div class="flex items-center justify-center py-2 gap-4 w-full">
        <button
          class="flex bg-backPrimary gap-4 items-center justify-center rounded-md py-1 px-2 shadow-xl"
          onClick={props.onClose}
        >
          <p>{locale.t("cancel")}</p>
          <CancelIcon class="text-rose-600 h-[2rem] w-[2rem]" />
        </button>
        <button
          type="submit"
          class="flex bg-backPrimary gap-4 items-center justify-center rounded-md py-1 px-2 shadow-xl"
          onClick={onSubmit}
        >
          <p>{locale.t("save")}</p>
          <EditIcon class="text-yellow-700 h-[2rem] w-[2rem]" />
        </button>
      </div>
    </form>
  );
};

const PasswordInput = (props: {
  placeholder?: string;
  value?: string | number;
  onInput?: (value: string) => void;
}) => {
  const [isVisible, setIsVisible] = createSignal<Boolean>(false);

  return (
    <div class="flex items-center px-4 py-2 justify-between gap-2 bg-backPrimary shadow-xl rounded-md text-2xl w-full">
      <input
        class="bg-transparent"
        placeholder={props.placeholder}
        value={props.value ? props.value : ""}
        onInput={(e) => props.onInput?.(e.currentTarget.value)}
        type={isVisible() ? "text" : "password"}
      />
      <button onClick={() => setIsVisible((pre) => !pre)}>
        <Switch>
          <Match when={isVisible()}>
            <EyeOffIcon class="text-text h-[1.5rem] w-[1.5rem]" />
          </Match>

          <Match when={!isVisible()}>
            <EyeOnIcon class="text-text h-[1.5rem] w-[1.5rem]" />
          </Match>
        </Switch>
      </button>
    </div>
  );
};
