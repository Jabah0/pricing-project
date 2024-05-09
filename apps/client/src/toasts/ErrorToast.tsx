import { CancelCircleIcon } from "@/assets/icons/CancelCircleIcon";

type Props = {
  message: string;
  onDismiss: () => void;
};

export const ErrorToast = (props: Props) => {
  return (
    <div class="px-6 py-3 pr-12 bg-backgroundSec rounded-lg shadow-md font-medium relative">
      <div class="flex justify-center items-center gap-2">
        <CancelCircleIcon class="text-red-500 h-6 w-6" />
        <p class="text-white">{props.message}</p>
      </div>
      <button
        class="bg-gray-200/80 hover:bg-gray-300 flex justify-center top-1/2 -translate-y-1/2 items-center w-5 h-5 right-2.5 absolute rounded-full"
        onClick={props.onDismiss}
      >
        &times;
      </button>
    </div>
  );
};
