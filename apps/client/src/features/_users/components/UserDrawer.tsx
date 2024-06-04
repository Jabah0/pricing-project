import { AccountIcon } from "@/assets/icons/AccountIcon";
import { Roles, User } from "api-contract";
import { createSignal } from "solid-js";
import toast from "solid-toast";
import { TextInput } from "./TextInput";
import { PasswordInput } from "./PasswordInput";
import { RolesCombobox } from "./RolesCombobox";
import { useLocale } from "@/features/locale/LocaleProvider";

type Props = {
  user?: User;
  onClose: () => void;
  onSave: (param?: any) => void;
};

export const UserDrawer = (props: Props) => {
  const locale = useLocale();

  const [username, setUsername] = createSignal("");
  const [fullName, setFullName] = createSignal("");
  const [role, setRole] = createSignal<Roles>();
  const [password, setPassword] = createSignal("");
  const [confirmPassword, setConfirmPassword] = createSignal("");

  const onSave = async () => {
    if (password() !== confirmPassword()) {
      toast.error(locale.t("passwordDoNotMatch"));
      return;
    }
    try {
      await props.onSave({
        username: username(),
        fullName: fullName(),
        password: password(),
        role: role(),
      });
      props.onClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div class="flex flex-col justify-between items-center h-full w-full py-10 px-[3rem] bg-backgroundSec">
      <div class="flex flex-col gap-6 justify-center items-center">
        <div
          class="flex justify-center items-center text-text h-16 w-16 
          bg-backPrimary rounded-full border border-gray-600"
        >
          <AccountIcon />
        </div>

        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-3 justify-center ">
            <p class="text-textSecondary">{locale.t("fullName")}</p>
            <TextInput
              class="bg-transparent text-text"
              value={props.user?.fullName || ""}
              onInput={(e) => setFullName(e.target.value)}
            />
          </div>

          <div class="flex flex-col gap-3 justify-center ">
            <p class="text-textSecondary">{locale.t("username")}</p>
            <TextInput
              onInput={(e) => {
                setUsername(e.target.value);
              }}
              value={props.user?.username || ""}
            />
          </div>

          <div class="flex flex-col gap-3 justify-center ">
            <p class="text-textSecondary">{locale.t("role")}</p>
            <RolesCombobox
              role={props.user?.role}
              onSelect={(val) => {
                setRole(val);
              }}
            />
          </div>

          <div class="flex flex-col gap-3 justify-center ">
            <p class="text-textSecondary">{locale.t("password")}</p>
            <PasswordInput
              onInput={(e) => setPassword(e.target.value)}
              value={password()}
            />
          </div>

          <div class="flex flex-col gap-3 justify-center ">
            <p class="text-textSecondary">{locale.t("confirmPassword")}</p>
            <PasswordInput
              class="bg-transparent text-white"
              onInput={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div class="flex gap-2">
        <button
          class="p-2 shadow-lg rounded-md bg-primary w-[5rem] text-white"
          onClick={onSave}
        >
          {locale.t("save")}
        </button>
        <button
          class="p-2 shadow-lg rounded-md bg-buttonBack w-[5rem] text-text"
          onClick={props.onClose}
        >
          {locale.t("cancel")}
        </button>
      </div>
    </div>
  );
};
