import { User } from "api-contract";
import { Drawer } from "corvu/drawer";
import { UserDrawer } from "./UserDrawer";
import { EditIcon } from "@/assets/icons/EditIcon";

type Props = {
  user: User;
};

export const UpdateUser = (props: Props) => {
  return (
    <Drawer
      breakPoints={[0.5]}
      velocityFunction={() => 1}
      side="right"
      closeOnOutsidePointer={false}
    >
      {(drawerProps) => (
        <>
          <Drawer.Trigger
            as="button"
            class="flex items-center justify-center bg-backgroundSec rounded-md w-[4.5rem] h-8 p-2 border border-gray-700 text-white
          shadow-lg"
          >
            <EditIcon class="text-yellow-300" />
          </Drawer.Trigger>
          <Drawer.Portal>
            <Drawer.Overlay
              class="fixed inset-0 z-50 corvu-transitioning:transition-colors backdrop-brightness-75
              corvu-transitioning:duration-500"
            />
            <Drawer.Content
              class="fixed bottom-0 right-0 z-50 flex flex-col justify-center items-center 
            h-full w-fit after:absolute border-s border-gray-600
            after:top-full after:h-1/2 after:bg-inherit bg-transparent
            corvu-transitioning:transition-transform corvu-transitioning:duration-500 
            md:select-none"
            >
              <UserDrawer
                user={props.user}
                onClose={() => drawerProps.setOpen(false)}
                onSave={() => {}}
              />
            </Drawer.Content>
          </Drawer.Portal>
        </>
      )}
    </Drawer>
  );
};
