import { Drawer } from "corvu/drawer";
import { AddUserType, UserDrawer } from "./UserDrawer";
import { useLocale } from "@/features/locale/LocaleProvider";

type Props = {
  onAdd: (user: AddUserType) => void;
};

export const AddUser = (props: Props) => {
  const locale = useLocale();

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
            class="bg-primary rounded-sm shadow-lg min-h-[2.5rem] min-w-[8rem] text-white hover:opacity-75"
          >
            {locale.t("addUser")}
          </Drawer.Trigger>
          <Drawer.Portal>
            <Drawer.Overlay
              class="fixed inset-0 z-50 corvu-transitioning:transition-colors backdrop-brightness-75
              corvu-transitioning:duration-500 "
            />
            <Drawer.Content
              class="fixed bottom-0 right-0 z-50 flex flex-col justify-center items-center 
              h-full w-fit after:absolute border-s border-gray-600
              after:top-full after:h-1/2 after:bg-inherit bg-transparent
              corvu-transitioning:transition-transform corvu-transitioning:duration-500 
              md:select-none"
            >
              <UserDrawer
                type="insert"
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
