import { ChevronDownIcon, ConfirmIcon } from "@/assets/icons";
import { languages, useLocale } from "@/features/locale/LocaleProvider";
import { Combobox } from "@kobalte/core";

export const LanguageCombobox = () => {
  const locale = useLocale();

  return (
    <Combobox.Root
      options={languages}
      optionValue={(item) => item.value}
      optionTextValue="title"
      optionLabel={(item) => item.title || ""}
      defaultValue={locale.locale()}
      placeholder={locale.t("selectLanguage")}
      onChange={(e) => {
        locale.switchLocale(e);
      }}
      itemComponent={(props) => (
        <Combobox.Item
          class="flex items-center justify-between w-full px-2 bg-backgroundSec
          hover:opacity-50 drop-shadow-xl"
          item={props.item}
          as={"button"}
        >
          <Combobox.ItemLabel>{props.item.rawValue.title}</Combobox.ItemLabel>
          <Combobox.ItemIndicator>
            <ConfirmIcon />
          </Combobox.ItemIndicator>
        </Combobox.Item>
      )}
    >
      <Combobox.Control
        class="flex justify-between items-center bg-backPrimary drop-shadow-xl px-4 py-2 rounded-md text-text text-xl"
        aria-label="Language"
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
          class="flex flex-col bg-inputForm shadow-lg z-50 text-text border border-gray-600 
          p-2"
        >
          <Combobox.Listbox class="flex flex-col gap-2" />
        </Combobox.Content>
      </Combobox.Portal>
    </Combobox.Root>
  );
};
