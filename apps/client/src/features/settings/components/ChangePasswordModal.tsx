import { CancelIcon, EditIcon, EyeOffIcon, LockIcon } from "@/assets/icons";
import { useLocale } from "@/features/locale/LocaleProvider";

export const ChangePasswordModal = ({ onClose }: { onClose: () => void }) => {
  const locale = useLocale();

  return (
    <div
      class="flex flex-col md:basis-1/3 h-full w-[28rem] gap-3 justify-between 
        items-center bg-backgroundSec text-text rounded-sm shadow-xl py-4 px-4"
    >
      <div class="flex items-center justify-center gap-4 w-full bg-backPrimary drop-shadow-xl rounded-md">
        <div class="flex justify-center items-center gap-4 w-full py-1">
          <LockIcon class="text-primary h-[2rem] w-[2rem]" />
          <p class="text-2xl">{locale.t("changePassword")}</p>
        </div>
      </div>
      <div class="flex flex-col gap-4 items-center justify-between">
        <div class="flex items-center px-4 py-2 justify-between gap-2 bg-backPrimary shadow-xl rounded-md text-2xl">
          <input class="bg-transparent" placeholder={locale.t("oldPassword")} />
          <button>
            <EyeOffIcon class="text-text h-[1.5rem] w-[1.5rem]" />
          </button>
        </div>
        <div class="flex items-center px-4 py-2 justify-between gap-4 w-full bg-backPrimary drop-shadow-xl rounded-md text-2xl">
          <input class="bg-transparent" placeholder={locale.t("newPassword")} />
          <button>
            <EyeOffIcon class="text-text h-[1.5rem] w-[1.5rem]" />
          </button>
        </div>
      </div>

      <div class="flex items-center justify-center py-2 gap-4 w-full">
        <button
          class="flex bg-backPrimary gap-4 items-center justify-center rounded-md py-1 px-2 shadow-xl"
          onClick={onClose}
        >
          <p>{locale.t("cancel")}</p>
          <CancelIcon class="text-rose-600 h-[2rem] w-[2rem]" />
        </button>
        <button class="flex bg-backPrimary gap-4 items-center justify-center rounded-md py-1 px-2 shadow-xl">
          <p>{locale.t("save")}</p>
          <EditIcon class="text-yellow-700 h-[2rem] w-[2rem]" />
        </button>
      </div>
    </div>
  );
};
