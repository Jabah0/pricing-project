import { createSignal, JSX, Show } from "solid-js";
import { Portal } from "solid-js/web";

type Props = {
  modal: ({
    onClose,
  }: {
    onClose: () => void;
  } & any) => JSX.Element;
};

export function createModal(props: Props) {
  const [open, setOpen] = createSignal(false);

  return {
    openModal() {
      setOpen(true);
    },
    Modal() {
      return (
        <Portal>
          <Show when={open()}>
            <div class="absolute inset-0 flex justify-center items-center backdrop-brightness-50">
              <div onClick={(e) => e.preventDefault()}>
                <props.modal onClose={() => setOpen(false)} />
              </div>
            </div>
          </Show>
        </Portal>
      );
    },
  };
}
