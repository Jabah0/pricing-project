import { useLocale } from "@/features/locale/locale.context";
import { MedService } from "api-contract";
import { Match, Switch, createSignal } from "solid-js";
import { EditPriceButton } from "./EditPriceButton";

type Props = {
  medService: MedService;
  updateServicePrice: (id: string, price: number) => void;
  updateServiceUnitSize: (id: string, unitSize: number) => void;
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

  const onClickSave = () => {
    setIsEdit(false);
    props.updateServicePrice(
      props.medService.id,
      parseInt(priceInputRef?.value || "0")
    );
  };

  return (
    <div
      class="flex justify-between gap-12 items-center p-4 shadow-lg bg-backPrimary border-[1px]
     border-gray-600 rounded-sm min-h-16 w-full"
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
        <Switch>
          <Match when={!isEdit()}>
            <div class="flex flex-col justify-center items-center">
              <p class="text-white font-bold w-16 text-center">
                {props.medService.price}
              </p>
              <p class="text-gray-400 font-bold">{locale.t("price")}</p>
            </div>
            <div class="w-[0.05rem] h-10 bg-gray-300" />
            <div class="flex flex-col justify-center items-center">
              <p class="text-white font-bold w-16 text-center">
                {props.medService.unitSize}
              </p>
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
            <div class="w-[0.05rem] h-10 bg-gray-300" />
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
        <EditPriceButton
          onEdit={onClickEdit}
          onCancel={onClickCancel}
          onSave={onClickSave}
          isEdit={isEdit()}
        />
      </div>
    </div>
  );
};
