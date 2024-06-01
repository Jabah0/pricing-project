import { Show, createEffect, createSignal } from "solid-js";
import { DarkModeSwitcher } from "./DarkModeSwitcher";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { FloatMenu } from "./FloatMenu";
import { ProfileButton } from "./ProfileButton";
import { useLocation } from "@solidjs/router";

export const Navbar = () => {
  const [isVisible, setIsVisible] = createSignal(false);

  let navbarRef: HTMLDivElement | undefined;

  createEffect(() => {
    if (!navbarRef) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          setIsVisible(true);
        }
        if (entry.isIntersecting) setIsVisible(false);
      });
    });

    observer.observe(navbarRef);

    return () => observer.disconnect();
  });

  const location = useLocation();
  console.log(location);

  return (
    <div ref={navbarRef} class="flex items-center justify-between h-fit">
      <p class="text-white font-bold">{""}</p>
      <div class="flex gap-4">
        <LanguageSwitcher />
        <DarkModeSwitcher />
        <ProfileButton />
        <Show when={isVisible()}>
          <FloatMenu />
        </Show>
      </div>
    </div>
  );
};
