import ChevronDownIcon from "@/assets/icons/ChevronDownIcon";
import { ConfirmIcon } from "@/assets/icons/ConfirmIcon";
import { Combobox } from "@kobalte/core";
import { Roles } from "api-contract";

const ALL_OPTIONS = [
  { name: "admin", value: "ADMIN" },
  { name: "user", value: "USER" },
];

type Props = {
  role?: Roles;
};

const RolesCombobox = (props: Props) => {
  const roleIndex = ALL_OPTIONS.findIndex((item) => item.value === props.role);

  return (
    <Combobox.Root
      options={ALL_OPTIONS}
      optionValue="value"
      optionTextValue="name"
      optionLabel="name"
      defaultValue={ALL_OPTIONS[roleIndex]}
      placeholder="Search a Role"
      itemComponent={(props) => (
        <Combobox.Item
          class="flex items-center justify-between px-2 bg-backPrimary border-b 
          hover:opacity-75 border-gray-400 last:border-none"
          item={props.item}
        >
          <Combobox.ItemLabel>{props.item.rawValue.name}</Combobox.ItemLabel>
          <Combobox.ItemIndicator>
            <ConfirmIcon />
          </Combobox.ItemIndicator>
        </Combobox.Item>
      )}
    >
      <Combobox.Control
        class="flex justify-center items-center bg-backPrimary border border-gray-400 shadow-lg 
        rounded-md h-[2rem] text-white"
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
          class="bg-backPrimary shadow-lg z-50 text-white border border-gray-600 
          rounded-md p-2"
        >
          <Combobox.Listbox />
        </Combobox.Content>
      </Combobox.Portal>
    </Combobox.Root>
  );
};

export default RolesCombobox;
