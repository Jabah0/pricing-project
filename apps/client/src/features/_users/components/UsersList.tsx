import { Show, createEffect } from "solid-js";
import { User } from "api-contract";
import { Table } from "@/components/Table";
import { Columns } from "./Columns";
import { AddUser } from "./AddUser";
import { UpdateUser } from "./UpdateUser";
import { UsersListService } from "../services/UsersListService";

export const UsersList = () => {
  const service = UsersListService();

  return (
    <div class="flex flex-col gap-4 h-full">
      <div class="flex">
        <AddUser onAdd={service.onAddUser} />
      </div>

      <div id="tableContainer" class="flex-grow overflow-auto">
        <Table
          columns={Columns}
          data={service.users()}
          isFetching={service.usersQuery.isFetching}
          onFetchNextData={service.usersQuery.fetchNextPage}
          isFetchingNextPage={service.usersQuery.isFetchingNextPage}
          isFetchSuccess={service.usersQuery.isSuccess}
          onSelect={(user: User) => service.onSelectUser({ user })}
          onFilter={(filters) => service.onFilter(filters)}
        />
      </div>
      <Show when={service.currentUser() !== undefined}>
        <UpdateUser
          onClose={() => {
            service.setIsOpen(false);
          }}
          onSave={(user, userId) => service.onUpdateUser(user, userId)}
          user={service.currentUser()!}
          isOpen={service.isOpen()}
        />
      </Show>
    </div>
  );
};
