import { AccountIcon } from "@/assets/icons/AccountIcon";
import { useLocale } from "@/features/locale/locale.context";
import { DropdownMenu } from "@kobalte/core";
import { ProfileLogoutButton } from "./LogoutButton";
import { useNavigate } from "@solidjs/router";
import { apiClient } from "@/api/api-client";

export const ProfileButton = () => {
  const locale = useLocale();

  const navigator = useNavigate();

  const logoutMutation = apiClient.auth.logout.createMutation();

  const onLogout = () => {
    logoutMutation.mutate({ body: {} });
    navigator("/auth/login");
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <div
          class="h-9 w-9 border border-white bg-backgroundSec rounded-full shadow-lg 
          flex justify-center items-center"
        >
          <AccountIcon class="text-white" />
        </div>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          class="bg-backPrimary border border-gray-600 
          rounded-lg my-6"
        >
          <div class="flex flex-col gap-3 justify-center items-center my-6 mx-4">
            <div class="flex flex-col gap-3 justify-center items-center">
              <div
                class="h-16 w-16 border border-white bg-elementBack rounded-full shadow-lg 
                flex justify-center items-center p-4"
              >
                <AccountIcon class="text-white h-16 w-16" />
              </div>
              <div class="flex flex-col justify-center items-center">
                <p class="text-white text-lg">Mohammad Jabah</p>
                <p class="text-gray-400">@jabah</p>
              </div>
            </div>
            <button
              class="text-white rounded-lg border border-gray-400 w-full h-[2.5rem] 
              shadow-lg bg-backgroundSec hover:bg-opacity-40"
            >
              {locale.t("manageAccount")}
            </button>
            <ProfileLogoutButton onClick={onLogout} />
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};