import { useLocale } from "@/features/locale/locale.context";

export const ProfileLogoutButton = (props: { onClick?: () => void }) => {
  const locale = useLocale();

  return (
    <button
      onClick={props.onClick}
      class="text-white rounded-lg border border-gray-400 w-full h-[2.5rem] 
      shadow-lg bg-backgroundSec hover:bg-opacity-40"
    >
      {locale.t("logout")}
    </button>
  );
};
