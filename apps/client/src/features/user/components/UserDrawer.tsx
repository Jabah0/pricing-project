import { AccountIcon } from "@/assets/icons/AccountIcon";
import { useLocale } from "@/features/locale/locale.context";
import { User } from "api-contract";
import { createSignal } from "solid-js";

type Props = {
  user?: User;
  onClose: () => void;
  onSave: (param?: any) => void;
};

const UserDrawer = (props: Props) => {
  const locale = useLocale();

  const [username, setUsername] = createSignal("");
  const [fullName, setFullName] = createSignal("");
  const [password, setPassword] = createSignal("");

  const onSave = () => {
    props.onSave({
      username: username(),
      fullName: fullName(),
      password: password(),
    });
  };

  return (
    <div class="flex flex-col justify-between items-center h-full w-full py-10 bg-backgroundSec">
      <div class="flex flex-col gap-6 justify-center items-center">
        <div
          class="flex justify-center items-center text-white h-16 w-16 
          bg-backPrimary rounded-full border border-gray-600"
        >
          <AccountIcon />
        </div>

        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-3 justify-center ">
            <p class="text-gray-300">{locale.t("fullName")}</p>
            <div class="bg-backPrimary rounded-md border border-gray-400 p-1">
              <input
                class="bg-transparent text-white"
                value={props.user?.fullName || ""}
                onInput={(e) => setFullName(e.target.value)}
              />
            </div>
          </div>

          <div class="flex flex-col gap-3 justify-center ">
            <p class="text-gray-300">{locale.t("username")}</p>
            <div class="bg-backPrimary rounded-md border border-gray-400 p-1">
              <input
                class="bg-transparent text-white"
                value={props.user?.username || ""}
                onInput={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div class="flex flex-col gap-3 justify-center ">
            <p class="text-gray-300">{locale.t("password")}</p>
            <div class="bg-backPrimary rounded-md border border-gray-400 p-1">
              <input
                class="bg-transparent text-white"
                onInput={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div class="flex flex-col gap-3 justify-center ">
            <p class="text-gray-300">{locale.t("confirmPassword")}</p>
            <div class="bg-backPrimary rounded-md border border-gray-400 p-1">
              <input class="bg-transparent text-white" />
            </div>
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
          class="p-2 shadow-lg rounded-md bg-buttonBack w-[5rem] text-white"
          onClick={props.onClose}
        >
          {locale.t("cancel")}
        </button>
      </div>
    </div>
  );
};

export default UserDrawer;
