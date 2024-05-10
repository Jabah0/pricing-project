import { apiClient } from "@/api/api-client";
import { useLocale } from "@/features/locale/locale.context";
import toast from "solid-toast";
import { AddUser } from "./AddUser";
import { For, Match, Show, Switch, createEffect, createSignal } from "solid-js";
import { SpinnersBlocksShuffleIcon } from "@/assets/icons/SpinnersBlocksIcon";
import { UserItem } from "./UserItem";
import { useQueryClient } from "@tanstack/solid-query";
import { ClientInferResponses } from "@ts-rest/core";
import { Roles, contract } from "api-contract";
import { SearchIcon } from "@/assets/icons/SearchIcon";
import { SuccessToast } from "@/toasts/SuccessToast";
import { ErrorToast } from "@/toasts/ErrorToast";
import { useUser } from "@/features/auth/stores/UserStore";
import { DotsRotateIcon } from "@/assets/icons/DotsRotateIcon";

export type AddUserType = {
  fullName: string;
  username: string;
  role: Roles;
  password: string;
};

type Users = ClientInferResponses<typeof contract.users.getAll>;

export const UsersList = () => {
  const locale = useLocale();
  const [_authUser, setAuth] = useUser();

  const queryClient = useQueryClient();

  const usersQuery = apiClient.users.getAll.createInfiniteQuery(
    () => ["users"],
    ({ pageParam = 1 }) => ({
      query: {
        page: pageParam,
      },
    }),
    {
      getNextPageParam: (lastPage, _pages) => {
        if (lastPage.body.meta.next === null) return undefined;
        else return lastPage.body.meta.next;
      },
    }
  );

  const users = () =>
    usersQuery.data?.pages.flatMap((page) => page.body.data) ?? [];

  // const addUserMutation = apiClient.users.create.createMutation({
  //   onMutate: async (newUser) => {
  //     await queryClient.cancelQueries({
  //       queryKey: ["users"],
  //     });

  //     const previousData = queryClient.getQueryData<Users>(["users"]);

  //     queryClient.setQueryData<Users>(["users"], (old) => {
  //       if (!old) return undefined;

  //       return {
  //         ...old,
  //         body: [
  //           ...old.body,
  //           {
  //             username: newUser.body.username,
  //             fullName: newUser.body.fullName,
  //             role: newUser.body.role,
  //             hashRefreshToken: "",
  //             lastLogin: new Date(2024, 1, 1),
  //             createDate: new Date(2024, 1, 1),
  //             updatedDate: new Date(2024, 1, 1),
  //             id: 1000,
  //           },
  //         ],
  //       };
  //     });

  //     return { previousData };
  //   },
  //   onError: (_err, __, context) => {
  //     const typedContext = context as {
  //       previousData: Users | undefined;
  //     };

  //     queryClient.setQueryData(["users"], typedContext.previousData);

  //     toast.custom(
  //       (t) => (
  //         <ErrorToast
  //           onDismiss={() => toast.dismiss(t.id)}
  //           message={locale.t("addUserFailed")}
  //         />
  //       ),
  //       {
  //         duration: 6000,
  //         unmountDelay: 0,
  //       }
  //     );
  //   },
  //   onSuccess: () => {
  //     toast.custom(
  //       (t) => (
  //         <SuccessToast
  //           onDismiss={() => toast.dismiss(t.id)}
  //           message={locale.t("addUserSuccess")}
  //         />
  //       ),
  //       {
  //         duration: 6000,
  //         unmountDelay: 0,
  //       }
  //     );
  //   },
  // });

  const onAddUser = (user: AddUserType) => {
    //addUserMutation.mutate({ body: { ...user } });
  };

  const [lastItem, setLastItem] = createSignal<HTMLElement>(
    document.getElementById("lastItem")!
  );

  createEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !usersQuery.isFetchingNextPage) {
        usersQuery.fetchNextPage();
      }
    });

    if (usersQuery.isSuccess) setLastItem(document.getElementById("lastItem")!);

    if (lastItem()) observer.observe(lastItem());

    return () => observer.disconnect();
  });

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

      <div>
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
            <Switch>
              <Match when={(users().length = 0)}>
                <p class="text-white text-center font-bold">
                  {locale.t("noData")}
                </p>
              </Match>
              <Match when={users().length > 0}>
                <div class="flex flex-col gap-1 justify-center items-center overflow-auto h-[29rem]">
                  <For each={users()}>{(user) => <UserItem user={user} />}</For>
                  <div id="lastItem" />
                  <Show when={usersQuery.isFetchingNextPage}>
                    <div>
                      <DotsRotateIcon class="text-primary h-[2rem] w-[2rem]" />
                    </div>
                  </Show>
                </div>
              </Match>
            </Switch>
          </Match>
        </Switch>
      </div>
    </div>
  );
};
