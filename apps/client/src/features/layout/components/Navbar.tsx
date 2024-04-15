import { Show, createEffect, createSignal } from "solid-js";
import { DarkModeSwitcher } from "./DarkModeSwitcher";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { FloatMenu } from "./FloatMenu";

export const Navbar = () => {
  const [isVisible, setIsVisible] = createSignal(false);

  let navbarRef: HTMLDivElement | undefined;

  createEffect(() => {
    if (!navbarRef) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          // Navbar is not visible in the viewport
          setIsVisible(true);
          console.log("Navbar disappeared!");
        }
        if (entry.isIntersecting) setIsVisible(false);
      });
    });

    observer.observe(navbarRef);

    return () => observer.disconnect();
  });

  return (
    <div ref={navbarRef} class="flex items-center justify-between h-fit">
      <p class="text-white font-bold">Title</p>
      <div class="flex gap-4">
        <LanguageSwitcher />
        <DarkModeSwitcher />
        <Show when={isVisible()}>
          <FloatMenu />
        </Show>
      </div>
    </div>
  );
};
