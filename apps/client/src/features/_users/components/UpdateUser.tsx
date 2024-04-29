import { useLocale } from "@/features/locale/locale.context";
import { User } from "api-contract";
import { Drawer } from "corvu/drawer";
import UserDrawer from "./UserDrawer";

type Props = {
  user: User;
};

export const UpdateUser = (props: Props) => {
  const locale = useLocale();

  return (
    <Drawer breakPoints={[0.5]} velocityFunction={() => 1} side="right">
      {(drawerProps) => (
        <>
          <Drawer.Trigger
            as="button"
            class="h-[2rem] w-[6rem] border border-gray-700 rounded-sm bg-backgroundSec 
            text-white shadow-lg"
          >
            {locale.t("edit")}
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
