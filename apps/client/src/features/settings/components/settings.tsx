import { EditIcon, MedicalServicesIcon } from "@/assets/icons";
import { useLocale } from "@/features/locale/LocaleProvider";

export const Settings = () => {
  const locale = useLocale();

  return (
    <div class="flex justify-center items-center h-full bg-backPrimary drop-shadow-xl">
      <div class="flex flex-col items-center justify-center drop-shadow-lg bg-backgroundForm h-[46rem] w-[34rem]">
        <MedicalServicesIcon class="h-[20rem] w-[20rem] text-secondary drop-shadow-xl" />
        <div class="flex flex-col flex-wrap gap-4">
          <div class="flex justify-center items-center bg-backPrimary drop-shadow-xl px-4 py-2 rounded-md">
            <p class="text-2xl text-white">{locale.t("numberOfPricing")}</p>
          </div>
          <div class="flex justify-center items-center bg-backPrimary drop-shadow-xl px-4 py-2 rounded-md">
            <p class="text-2xl text-white">{10}</p>
          </div>
          <div class="flex justify-center items-center bg-backPrimary drop-shadow-xl px-4 py-2 rounded-md">
            <button class="flex justify-center items-center text-2xl w-full text-white">
              <EditIcon class="text-yellow-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
