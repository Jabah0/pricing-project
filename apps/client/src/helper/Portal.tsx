import { JSX, Show, createSignal } from "solid-js";
import { Portal } from "solid-js/web";

type PortalProps = {
  openElement: JSX.Element;
  modal: JSX.Element;
};

export function PortalModal(props: PortalProps) {
  const [isOpen, setIsOpen] = createSignal(false);

  return (
    <>
      <div onClick={() => setIsOpen(true)}>{props.openElement}</div>
      <Show when={isOpen()}>
        <Portal>
          <div class="fixed top-0 right-0">
            <div
              class="flex justify-center items-center h-screen w-screen backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            >
              {props.modal}
            </div>
          </div>
        </Portal>
      </Show>
    </>
  );
}
