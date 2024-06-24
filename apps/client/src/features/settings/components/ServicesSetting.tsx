import { EditIcon, MedicalServicesIcon } from "@/assets/icons";
import { useLocale } from "@/features/locale/LocaleProvider";

export const ServicesSetting = () => {
  const locale = useLocale();

  return (
    <div
      class="flex flex-col items-center justify-center drop-shadow-lg bg-backgroundSec
        h-[46rem] w-[34rem] lg:h-[34rem] lg:w-[26rem]"
    >
      <div class="flex flex-col flex-wrap gap-4 min-w-[20rem] px-2">
        <div class="flex justify-center items-center bg-backPrimary drop-shadow-xl rounded-md">
          <MedicalServicesIcon
            class="h-[20rem] w-[20rem] 
              lg:h-[10rem] lg:w-[10rem]
              text-secondary drop-shadow-xl"
          />
        </div>
        <div class="flex justify-center items-center bg-backPrimary drop-shadow-xl px-4 py-2 rounded-md">
          <p class="text-2xl text-white">{locale.t("numberOfPricing")}</p>
        </div>
        <div class="flex justify-center items-center bg-backPrimary drop-shadow-xl px-4 py-2 rounded-md">
          <p class="text-2xl text-text">{10}</p>
        </div>
        <div class="flex justify-center items-center bg-backPrimary drop-shadow-xl px-4 py-2 rounded-md">
          <button class="flex justify-center items-center text-2xl w-full text-text">
            <EditIcon class="text-yellow-700" />
          </button>
        </div>
      </div>
    </div>
  );
};
