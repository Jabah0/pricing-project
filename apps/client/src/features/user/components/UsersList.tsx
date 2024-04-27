import { SpinnersBlocksShuffleIcon } from "@/assets/icons/SpinnersBlocksIcon";
import { BiRegularSearchAlt } from "solid-icons/bi";
import { For, Match, Switch } from "solid-js";
import { UserItem } from "./UserItem";
import { useLocale } from "@/features/locale/locale.context";
import { apiClient } from "@/api/api-client";

const UsersList = () => {
  const locale = useLocale();

  const usersQuery = apiClient.users.getAll.createQuery(() => ["users"], {});

  return (
    <div class="flex flex-col gap-6">
      <div class="flex justify-between">
        <div class="flex gap-2">
          <div
            class="flex items-center border-[0.5px] border-gray-600 rounded-sm 
          shadow-lg h-[2.5rem] w-[16rem] p-2 gap-2"
          >
            <BiRegularSearchAlt class="text-white scale-150" />
            <input
              type="text"
              class="bg-transparent flex-1 text-white w-full"
              placeholder={locale.t("filterServiceName")}
            />
          </div>
          <div
            class="flex items-center  border-[0.5px] border-gray-600 rounded-sm 
          shadow-lg h-[2.5rem] w-[16rem] p-2 gap-2"
          >
            <BiRegularSearchAlt class="text-white scale-150" />
            <input
              type="text"
              class="bg-transparent flex-1 text-white w-full"
              placeholder={locale.t("filterServiceCode")}
            />
          </div>
        </div>
      </div>

      <Switch>
        <Match when={usersQuery.isLoading}>
          <div class="flex justify-center items-center h-full">
            <SpinnersBlocksShuffleIcon class="text-primary h-[12rem] w-[12rem]" />
          </div>
        </Match>
        <Match when={usersQuery.isError && usersQuery.error}>
          <p class="text-white">Error: {usersQuery.error?.body as string}</p>
        </Match>
        <Match when={usersQuery.isSuccess}>
          <div class="flex flex-col gap-4">
            <Switch>
              <Match when={usersQuery.data?.body.length === 0}>
                <p class="text-white text-center font-bold">
                  {locale.t("noData")}
                </p>
              </Match>
              <Match when={usersQuery.data?.body.length !== 0}>
                <For each={usersQuery.data?.body}>
                  {(user) => <UserItem user={user} />}
                </For>
              </Match>
            </Switch>
          </div>
        </Match>
      </Switch>
    </div>
  );
};

export default UsersList;
