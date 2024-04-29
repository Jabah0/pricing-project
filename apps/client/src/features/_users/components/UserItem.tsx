import { AccountIcon } from "@/assets/icons/AccountIcon";
import { User } from "api-contract";
import { UpdateUser } from "./UpdateUser";

type Props = {
  user: User;
};

export const UserItem = (props: Props) => {
  return (
    <div
      class="flex justify-between items-center p-4 shadow-lg bg-backPrimary border-[0.01rem]
    border-gray-600 rounded-lg min-h-16 w-full"
    >
      <div class="flex justify-center items-center">
        <div class="flex justify-center items-center gap-12">
          <div>
            <div
              class="flex justify-center items-center h-12 w-12 rounded-full border border-gray-600
            bg-backgroundSec"
            >
              <AccountIcon class="text-white" />
            </div>
          </div>
          <div>
            <p class="text-gray-400">{props.user.fullName}</p>
          </div>
          <div>
            <p class="text-gray-400">{props.user.username}</p>
          </div>
        </div>
      </div>
      <div>
        <UpdateUser user={props.user} />
      </div>
    </div>
  );
};
