import { createSignal } from "solid-js";
import toast from "solid-toast";
import { Roles, User, contract } from "api-contract";
import { InfiniteData, useQueryClient } from "@tanstack/solid-query";
import { apiClient } from "@/api/api-client";
import { SuccessToast } from "@/toasts/SuccessToast";
import { ErrorToast } from "@/toasts/ErrorToast";
import { ColumnFiltersState } from "@tanstack/solid-table";
import { AddUserType } from "../components/UserDrawer";
import { ClientInferResponses } from "@ts-rest/core";
import { useLocale } from "@/features/locale/LocaleProvider";

type Users = ClientInferResponses<typeof contract.users.getAll>;

export const UsersListService = () => {
  const locale = useLocale();
  const queryClient = useQueryClient();

  const [role, setRole] = createSignal<Roles>();
  const [username, setUsername] = createSignal<string>();
  const [fullName, setFullName] = createSignal<string>();

  const QueryKey = () => ["users", role(), username(), fullName()];

  const usersQuery = apiClient.users.getAll.createInfiniteQuery(
    QueryKey,
    ({ pageParam = 1 }) => ({
      query: {
        page: pageParam,
        get role() {
          return role();
        },
        get username() {
          return username();
        },
        get fullName() {
          return fullName();
        },
      },
    }),
    {
      getNextPageParam: (lastPage, _pages) => {
        if (lastPage.body.meta.next === null) return undefined;
        else return lastPage.body.meta.next;
      },
    }
  );

  const users = () => {
    return usersQuery.data?.pages.flatMap((page) => page.body.data) ?? [];
  };

  const addUserMutation = apiClient.users.create.createMutation({
    onMutate: async (newUser): Promise<{ previousData: Users | undefined }> => {
      await queryClient.cancelQueries({
        queryKey: QueryKey(),
      });

      const previousData = queryClient.getQueryData<Users>(QueryKey());

      queryClient.setQueryData<InfiniteData<Users>>(QueryKey(), (old) => {
        if (!old) return undefined;

        old.pages[old.pages.length - 1].body.data.push({
          id: 1000,
          username: newUser.body.username,
          fullName: newUser.body.fullName,
          role: newUser.body.role,
        });

        return {
          ...old,
        };
      });

      users();

      return { previousData };
    },
    onError: (_err, __, context) => {
      const typedContext = context as {
        previousData: Users | undefined;
      };

      queryClient.setQueryData(QueryKey(), typedContext.previousData);

      toast.custom(
        (t) => (
          <ErrorToast
            onDismiss={() => toast.dismiss(t.id)}
            message={locale.t("addUserFailed") || ""}
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
            message={locale.t("addUserSuccess") || ""}
          />
        ),
        {
          duration: 6000,
          unmountDelay: 0,
        }
      );
    },
    // onSettled: () => {
    //   queryClient.invalidateQueries(QueryKey());
    // },
  });

  const onAddUser = (user: AddUserType) => {
    addUserMutation.mutate({ body: { ...user } });
  };

  const updateUserMutation = apiClient.users.patch.createMutation({
    onMutate: async (
      updatedUser
    ): Promise<{ previousData: Users | undefined }> => {
      await queryClient.cancelQueries({
        queryKey: QueryKey(),
      });

      const previousData = queryClient.getQueryData<Users>(QueryKey());

      queryClient.setQueryData<InfiniteData<Users>>(QueryKey(), (old) => {
        if (!old) return undefined;

        const targetUser = old.pages
          .flatMap((item) => item.body.data.flatMap((i) => i))
          .find((item) => item.id === updatedUser.params.id);

        if (targetUser) {
          targetUser.fullName =
            updatedUser.body?.fullName || targetUser.fullName;
          targetUser.role = updatedUser.body?.role || targetUser.role;
        }
        return old;
      });

      return { previousData };
    },
    onError: (_err, __, context) => {
      const typedContext = context as {
        previousData: Users | undefined;
      };

      queryClient.setQueryData(QueryKey(), typedContext.previousData);

      toast.custom(
        (t) => (
          <ErrorToast
            onDismiss={() => toast.dismiss(t.id)}
            message={locale.t("addUserFailed") || ""}
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
            message={locale.t("updateUserSuccess") || ""}
          />
        ),
        {
          duration: 6000,
          unmountDelay: 0,
        }
      );
    },
  });

  const onUpdateUser = (user: Partial<AddUserType>, userId: number) => {
    updateUserMutation.mutate({ body: { ...user }, params: { id: userId } });
  };

  const [currentUser, setCurrentUser] = createSignal<User>();

  const [isOpen, setIsOpen] = createSignal(false);

  const onSelectUser = (props: { user: User }) => {
    setCurrentUser(props.user);
    setIsOpen(true);
  };

  const onFilter = (filters: ColumnFiltersState) => {
    setRole(undefined);
    setUsername(undefined);
    setFullName(undefined);
    filters.map((item) => {
      item.id === "role" && setRole(item.value as Roles);
      item.id === "username" && setUsername(item.value as string);
      item.id === "fullName" && setFullName(item.value as string);
    });
  };

  return {
    onFilter,
    onSelectUser,
    isOpen,
    setIsOpen,
    currentUser,
    onUpdateUser,
    onAddUser,
    users,
    usersQuery,
  };
};
