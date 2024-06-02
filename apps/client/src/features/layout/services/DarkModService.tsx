import { createSignal } from "solid-js";

export const DarkModService = () => {
  const [isDarkMode, setIsDarkMode] = createSignal(true);

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
