import { createSignal, onMount } from "solid-js";
import { makePersisted } from "@solid-primitives/storage";

export const DarkModService = () => {
  const [isDarkMode, setIsDarkMode] = makePersisted(createSignal(true), {
    storage: localStorage,
  });

  onMount(() => {
    if (isDarkMode()) {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
      setIsDarkMode(true);
    } else {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
      setIsDarkMode(false);
    }
  });

  const toggleDarkMode = () => {
    if (!isDarkMode()) {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
      setIsDarkMode(true);
    } else {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
      setIsDarkMode(false);
    }
  };

  return { toggleDarkMode, isDarkMode };
};
