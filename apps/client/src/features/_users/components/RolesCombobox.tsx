import { ChevronDownIcon } from "@/assets/icons/ChevronDownIcon";
import { ConfirmIcon } from "@/assets/icons/ConfirmIcon";
import { useLocale } from "@/features/locale/LocaleProvider";
import { Combobox } from "@kobalte/core";
import { Roles } from "api-contract";

type RoleType = {
  name: string;
  value: Roles;
};

const ALL_OPTIONS: RoleType[] = [
  { name: "admin", value: "ADMIN" },
  { name: "user", value: "USER" },
];

type Props = {
  role?: Roles;
  onSelect?: (value: Roles) => void;
};

export const RolesCombobox = (props: Props) => {
  const locale = useLocale();

  const roleIndex = ALL_OPTIONS.findIndex((item) => item.value === props.role);

  return (
    <Combobox.Root
      options={ALL_OPTIONS}
      optionValue="value"
      optionTextValue="name"
      optionLabel={(item) => locale.t(item.value) || ""}
      defaultValue={ALL_OPTIONS[roleIndex]}
      placeholder={locale.t("selectRole")}
      onChange={(e) => props.onSelect && props.onSelect(e.value)}
      itemComponent={(props) => (
        <Combobox.Item
          class="flex items-center justify-between px-2 bg-transparent border-b 
          hover:opacity-50 border-gray-400 last:border-none hover:cursor-pointer"
          item={props.item}
        >
          <Combobox.ItemLabel>
            {locale.t(props.item.rawValue.value)}
          </Combobox.ItemLabel>
          <Combobox.ItemIndicator>
            <ConfirmIcon />
          </Combobox.ItemIndicator>
        </Combobox.Item>
      )}
    >
      <Combobox.Control
        class="flex justify-center items-center bg-inputForm border border-gray-400 shadow-lg 
        rounded-md h-[2rem] text-text"
        aria-label="Role"
      >
        <Combobox.Input class="bg-transparent" />
        <Combobox.Trigger>
          <Combobox.Icon>
            <ChevronDownIcon class="scale-150" />
          </Combobox.Icon>
        </Combobox.Trigger>
      </Combobox.Control>
      <Combobox.Portal>
        <Combobox.Content
          class="bg-inputForm shadow-lg z-50 text-text border border-gray-600 
          rounded-md p-2"
        >
          <Combobox.Listbox />
        </Combobox.Content>
      </Combobox.Portal>
    </Combobox.Root>
  );
};
