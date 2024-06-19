import { User } from "api-contract";
import { Drawer } from "corvu/drawer";
import { AddUserType, UserDrawer } from "./UserDrawer";
import { useLocale } from "@/features/locale/LocaleProvider";

type Props = {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: Partial<AddUserType>, userId: number) => void;
};

export const UpdateUser = (props: Props) => {
  const locale = useLocale();

  const direct = () => (locale.locale().dir === "rtl" ? "right" : "left");

  return (
    <Drawer
      breakPoints={[0.5]}
      velocityFunction={() => 1}
      side={direct()}
      closeOnOutsidePointer={false}
      open={props.isOpen}
    >
      {(drawerProps) => (
        <>
          <Drawer.Portal>
            <Drawer.Overlay
              class="fixed inset-0 z-50 corvu-transitioning:transition-colors backdrop-brightness-75
              corvu-transitioning:duration-500"
            />
            <Drawer.Content
              class={`fixed bottom-0 ${direct()}-0 z-50 flex flex-col justify-center items-center 
              h-full w-fit after:absolute border-s border-gray-600
              after:top-full after:h-1/2 after:bg-inherit bg-transparent
              corvu-transitioning:transition-transform corvu-transitioning:duration-500 
              overflow-auto`}
            >
              <UserDrawer
                type="update"
                user={props.user}
                onClose={() => {
                  drawerProps.setOpen(false);
                  props.onClose();
                }}
                onSave={({
                  user,
                  userId,
                }: {
                  user: Partial<AddUserType>;
                  userId: number;
                }) => props.onSave(user, userId)}
              />
            </Drawer.Content>
          </Drawer.Portal>
        </>
      )}
    </Drawer>
  );
};
