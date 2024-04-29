import { apiClient } from "@/api/api-client";
import { useLocale } from "@/features/locale/locale.context";
import toast from "solid-toast";
import { AddUser } from "./AddUser";
import { For, Match, Switch } from "solid-js";
import { SpinnersBlocksShuffleIcon } from "@/assets/icons/SpinnersBlocksIcon";
import { UserItem } from "./UserItem";
import { useQueryClient } from "@tanstack/solid-query";
import { ClientInferResponses } from "@ts-rest/core";
import { contract } from "api-contract";
import { SearchIcon } from "@/assets/icons/SearchIcon";
import SuccessToast from "@/toasts/SuccessToast";
import ErrorToast from "@/toasts/ErrorToast";

export type AddUserType = {
  fullName: string;
  username: string;
  password: string;
};

type Users = ClientInferResponses<typeof contract.users.getAll>;

export const UsersList = () => {
  const locale = useLocale();

  const queryClient = useQueryClient();

  const usersQuery = apiClient.users.getAll.createQuery(() => ["users"], {});

  const addUserMutation = apiClient.users.create.createMutation({
    onMutate: async (newUser) => {
      await queryClient.cancelQueries({
        queryKey: ["users"],
      });

      const previousData = queryClient.getQueryData<Users>(["users"]);

      queryClient.setQueryData<Users>(["users"], (old) => {
        if (!old) return undefined;

        return {
          ...old,
          body: [
            ...old.body,
            {
              username: newUser.body.username,
              fullName: newUser.body.fullName,
              hashRefreshToken: "",
              lastLogin: new Date(2024, 1, 1),
              createDate: new Date(2024, 1, 1),
              updatedDate: new Date(2024, 1, 1),
              id: 1000,
            },
          ],
        };
      });

      return { previousData };
    },
    onError: (_, __, context) => {
      const typedContext = context as {
        previousData: Users | undefined;
      };

      queryClient.setQueryData(["users"], typedContext.previousData);

      toast.custom(
        (t) => (
          <ErrorToast
            onDismiss={() => toast.dismiss(t.id)}
            message={locale.t("addUserFailed")}
          />
        ),
        {
          duration: 6000,
          unmountDelay: 0,
        }
      );
    },
    onSuccess: () => {
      toast.custom(
        (t) => (
          <SuccessToast
            onDismiss={() => toast.dismiss(t.id)}
            message={locale.t("addUserSuccess")}
          />
        ),
        {
          duration: 6000,
          unmountDelay: 0,
        }
      );
    },
  });

  const onAddUser = (user: AddUserType) => {
    addUserMutation.mutate({ body: { ...user } });
  };

  return (
    <div class="flex flex-col gap-6">
      <div class="flex justify-between">
        <div class="flex gap-2">
          <div class="flex items-center border-[0.5px] border-gray-600 rounded-sm shadow-lg h-[2.5rem] w-[16rem] p-2 gap-2">
            <SearchIcon class="text-white scale-150" />
            <input
              type="text"
              class="bg-transparent flex-1 text-white w-full"
              placeholder={locale.t("searchFullName")}
            />
          </div>
          <div class="flex items-center border-[0.5px] border-gray-600 rounded-sm shadow-lg h-[2.5rem] w-[16rem] p-2 gap-2">
            <SearchIcon class="text-white scale-150" />
            <input
              type="text"
              class="bg-transparent flex-1 text-white w-full"
              placeholder={locale.t("searchUsername")}
            />
          </div>
        </div>
        <AddUser onAdd={onAddUser} />
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
