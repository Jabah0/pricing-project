import { useLocale } from "@/features/locale/LocaleProvider";

export const ProfileLogoutButton = (props: { onClick?: () => void }) => {
  const locale = useLocale();

  return (
    <button
      onClick={props.onClick}
      class="text-text rounded-sm border border-gray-700 w-full h-[2.5rem] 
      shadow-lg bg-backgroundSec hover:bg-opacity-40"
    >
      {locale.t("logout")}
    </button>
  );
};
