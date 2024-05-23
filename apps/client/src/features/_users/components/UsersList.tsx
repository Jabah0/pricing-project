import { apiClient } from "@/api/api-client";
import { useLocale } from "@/features/locale/locale.context";
import toast from "solid-toast";
import { AddUser } from "./AddUser";
import { useQueryClient } from "@tanstack/solid-query";
import { ClientInferResponses } from "@ts-rest/core";
import { Roles, contract } from "api-contract";
import { SuccessToast } from "@/toasts/SuccessToast";
import { ErrorToast } from "@/toasts/ErrorToast";
import { useUser } from "@/features/auth/stores/UserStore";
import { Table } from "@/components/Table";
import { Columns } from "./Columns";

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

  return (
    <div class="flex flex-col gap-4 h-full">
      <div class="flex">
        <button class="h-10 w-20 text-white bg-primary shadow-lg rounded-sm">
          {"addUser"}
        </button>
      </div>

      <div id="tableContainer" class="flex-grow overflow-auto">
        <Table
          columns={Columns}
          data={users()}
          isFetching={usersQuery.isFetching}
          onFetchNextData={usersQuery.fetchNextPage}
          isFetchingNextPage={usersQuery.isFetchingNextPage}
          isFetchSuccess={usersQuery.isSuccess}
        />
      </div>
    </div>
  );
};
