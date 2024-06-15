import { createSignal, onMount } from "solid-js";
import { makePersisted } from "@solid-primitives/storage";

export const DarkModService = () => {
  const [isDarkMode, setIsDarkMode] = makePersisted(createSignal(false), {
    storage: localStorage,
    name: "darkMode",
  });

  onMount(() => {
    console.log("onMount", isDarkMode());

    if (!isDarkMode()) {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    }
  });

  const toggleDarkMode = () => {
    console.log("toggle dark mode executed");
    if (!isDarkMode()) {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    }
    setIsDarkMode((pre) => !pre);
  };

  return { toggleDarkMode, isDarkMode };
};
