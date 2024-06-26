import {
  CancelIcon,
  ConfirmIcon,
  EditIcon,
  MedicalServicesIcon,
} from "@/assets/icons";
import { useLocale } from "@/features/locale/LocaleProvider";
import { CardWrapper } from "./CardWrapper";
import { Match, Switch, createSignal } from "solid-js";
import { apiClient } from "@/api/api-client";
import toast from "solid-toast";
import { useQueryClient } from "@tanstack/solid-query";
import { SuccessToast } from "@/toasts/SuccessToast";
import { ErrorToast } from "@/toasts/ErrorToast";

export const ServicesSetting = () => {
  const locale = useLocale();

  const [isEditing, setIsEditing] = createSignal(false);

  const [value, setValue] = createSignal<number>();

  const queryClient = useQueryClient();

  const numberOfPricingQuery =
    apiClient.medServices.numberOfPricing.createQuery(
      () => ["numberOfPricing"],
      {}
    );

  const numberOfPricingMutation =
    apiClient.medServices.updateNumberOfPricing.createMutation({
      onError: () => {
        toast.custom((t) => (
          <ErrorToast
            onDismiss={() => toast.dismiss(t.id)}
            message={
              locale.t("numberOfPricingNotUpdated") ||
              "numberOfPricingNotUpdated"
            }
          />
        ));
      },
      onSuccess: () => {
        toast.custom((t) => (
          <SuccessToast
            onDismiss={() => toast.dismiss(t.id)}
            message={
              locale.t("updateNumberOfPricingSuccessfully") ||
              "updateNumberOfPricingSuccessfully"
            }
          />
        ));
      },
      onSettled: () => {
        queryClient.invalidateQueries(["numberOfPricing"]);
      },
    });

  const [inputRef, setInputRef] = createSignal<HTMLElement | null>(null);

  const onClickEdit = () => {
    setValue(numberOfPricingQuery.data?.body);
    setIsEditing(true);
    inputRef()?.focus();
  };

  const onSaveEdit = () => {
    if (Number.isNaN(value()) && !value()) return;
    numberOfPricingMutation.mutate({ body: { limit: value()! } });
    setIsEditing(false);
  };

  return (
    <CardWrapper>
      <div class="flex flex-col gap-4 min-w-[20rem] min-h-[20rem] px-2">
        <div class="flex justify-center items-center bg-backPrimary h-full drop-shadow-xl rounded-md">
          <MedicalServicesIcon class="h-[20rem] w-[20rem] lg:h-[10rem] lg:w-[10rem] text-secondary drop-shadow-xl" />
        </div>
        <div class="flex justify-center items-center bg-backPrimary drop-shadow-xl px-4 py-2 rounded-md">
          <p class="text-2xl text-text">{locale.t("numberOfPricing")}</p>
        </div>
        <div class="flex justify-center items-center bg-backPrimary drop-shadow-xl px-4 py-2 rounded-md">
          <Switch>
            <Match when={!isEditing()}>
              <p class="text-2xl text-text">
                {numberOfPricingQuery.data?.body}
              </p>
            </Match>
            <Match when={isEditing()}>
              <input
                value={numberOfPricingQuery.data?.body}
                onInput={(e) => setValue(parseInt(e.target.value))}
                type="number"
                class="text-2xl text-text text-center bg-transparent flex justify-center items-center"
                ref={setInputRef}
              />
            </Match>
          </Switch>
        </div>
        <div class="flex justify-center items-center gap-4 bg-backPrimary drop-shadow-xl px-4 py-2 rounded-md">
          <Switch>
            <Match when={!isEditing()}>
              <button
                class="flex justify-center items-center text-3xl w-full text-text py-1"
                onClick={onClickEdit}
              >
                <EditIcon class="text-yellow-700" />
              </button>
            </Match>
            <Match when={isEditing()}>
              <button
                class="flex justify-center items-center text-3xl w-full text-text bg-backgroundSec drop-shadow-xl py-1 rounded-md"
                onClick={onSaveEdit}
              >
                <ConfirmIcon class="text-green-700" />
              </button>
              <button
                class="flex justify-center items-center text-3xl w-full text-text bg-backgroundSec drop-shadow-xl py-1 rounded-md"
                onClick={() => setIsEditing(false)}
              >
                <CancelIcon class="text-red-700" />
              </button>
            </Match>
          </Switch>
        </div>
      </div>
    </CardWrapper>
  );
};
