import { useLocale } from "@/features/locale/locale.context";
import { MedService } from "api-contract";
import { FaSolidPlus, FaSolidMinus } from "solid-icons/fa";
import { Match, Show, Switch, createSignal } from "solid-js";
import { EditPriceButton } from "./EditPriceButton";

type Props = {
  medService: MedService;
};

export const MedServiceItem = (props: Props) => {
  const locale = useLocale();

  const [isEdit, setIsEdit] = createSignal(false);

  let priceInputRef: HTMLInputElement | undefined;

  const onClickEdit = () => {
    setIsEdit(true);
    priceInputRef?.focus();
  };

  const onClickCancel = () => {
    setIsEdit(false);
  };

  return (
    <div
      class="flex justify-between gap-12 items-center p-4 bg-backPrimary border
     border-gray-400 rounded-lg min-h-16"
    >
      <div class="flex gap-8">
        <div class="flex flex-col justify-center items-center">
          <p class="text-white font-bold">{props.medService.name}</p>
          <p class="text-gray-400 font-bold">{locale.t("name")}</p>
        </div>
        <div class="flex flex-col justify-center items-center">
          <p class="text-white font-bold">{props.medService.code}</p>
          <p class="text-gray-400 font-bold">{locale.t("code")}</p>
        </div>
        <div class="flex flex-col justify-center items-center">
          <p class="text-white font-bold">{props.medService.nationalCode}</p>
          <p class="text-gray-400 font-bold">{locale.t("nationalCode")}</p>
        </div>
      </div>
      <div class="flex justify-center items-center gap-4">
        <Show when={isEdit()}>
          <div class="flex flex-col gap-2">
            <button class="bg-iconStroke rounded-md p-0.5 shadow-lg">
              <FaSolidPlus class="text-white" />
            </button>
            <button class="bg-iconStroke rounded-md p-0.5 shadow-lg">
              <FaSolidMinus class="text-white" />
            </button>
          </div>
        </Show>
        <Switch>
          <Match when={!isEdit()}>
            <div class="flex flex-col justify-center items-center">
              <p class="text-white font-bold">{props.medService.price}</p>
              <p class="text-gray-400 font-bold">{locale.t("price")}</p>
            </div>
            <div class="w-[0.05rem] h-10 bg-gray-300"></div>
            <div class="flex flex-col justify-center items-center">
              <p class="text-white font-bold">{props.medService.unitSize}</p>
              <p class="text-gray-400 font-bold">{locale.t("unitSize")}</p>
            </div>
          </Match>
          <Match when={isEdit()}>
            <div class="flex flex-col justify-center items-center">
              <input
                ref={priceInputRef}
                class="text-white font-bold w-16 bg-transparent 
                border border-gray-400 rounded-md text-center shadow-lg"
                value={props.medService.price}
                type="number"
              />
              <p class="text-gray-400 font-bold">{locale.t("price")}</p>
            </div>
            <div class="w-[0.05rem] h-10 bg-gray-300"></div>
            <div class="flex flex-col justify-center items-center">
              <input
                class="text-white font-bold w-16 bg-transparent 
                border border-gray-400 rounded-md text-center shadow-lg"
                value={props.medService.unitSize}
                type="number"
              />
              <p class="text-gray-400 font-bold">{locale.t("unitSize")}</p>
            </div>
          </Match>
        </Switch>
        <Show when={isEdit()}>
          <div class="flex flex-col gap-2">
            <button class="bg-iconStroke rounded-md p-0.5 shadow-lg">
              <FaSolidPlus class="text-white" />
            </button>
            <button class="bg-iconStroke rounded-md p-0.5 shadow-lg">
              <FaSolidMinus class="text-white" />
            </button>
          </div>
        </Show>
        <EditPriceButton
          onEdit={onClickEdit}
          onCancel={onClickCancel}
          isEdit={isEdit()}
        />
      </div>
    </div>
  );
};
