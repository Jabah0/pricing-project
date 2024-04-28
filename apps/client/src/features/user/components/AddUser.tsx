import { useLocale } from "@/features/locale/locale.context";
import { Drawer } from "corvu/drawer";
import UserDrawer from "./UserDrawer";
import { AddUser as AddUserType } from "./UsersList";

type Props = {
  onAdd: (user: AddUserType) => void;
};

export const AddUser = (props: Props) => {
  const locale = useLocale();

  return (
    <Drawer breakPoints={[0.5]} velocityFunction={() => 1} side="right">
      {(drawerProps) => (
        <>
          <Drawer.Trigger
            as="button"
            class="bg-primary rounded-sm shadow-lg min-w-[6rem] text-white hover:opacity-75"
          >
            {locale.t("addUser")}
          </Drawer.Trigger>
          <Drawer.Portal>
            <Drawer.Overlay
              class="fixed inset-0 z-50 corvu-transitioning:transition-colors backdrop-brightness-75
            corvu-transitioning:duration-500 corvu-transitioning:ease-[cubic-bezier(0.32,0.72,0,1)]"
            />
            <Drawer.Content
              class="fixed bottom-0 right-0 z-50 flex flex-col justify-center items-center 
            h-full w-1/4 after:absolute border-s border-gray-600
            after:top-full after:h-1/2 after:bg-inherit bg-transparent
            corvu-transitioning:transition-transform corvu-transitioning:duration-500 
            corvu-transitioning:ease-[cubic-bezier(0.32,0.72,0,1)] md:select-none"
            >
              <UserDrawer
                onSave={props.onAdd}
                onClose={() => drawerProps.setOpen(false)}
              />
            </Drawer.Content>
          </Drawer.Portal>
        </>
      )}
    </Drawer>
  );
};
