import {
  ParentComponent,
  createContext,
  createSignal,
  onMount,
  useContext,
} from "solid-js";
import { makePersisted } from "@solid-primitives/storage";
import { Accessor } from "solid-js";

interface DarkModeContextType {
  isDarkMode: Accessor<boolean>;
  toggleDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextType>();

export const DarkModProvider: ParentComponent = (props) => {
  const [isDarkMode, setIsDarkMode] = makePersisted(createSignal(false), {
    storage: localStorage,
    name: "services_pricing-darkMode",
  });

  onMount(() => {
    if (!isDarkMode()) {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    }
  });

  const toggleDarkMode = () => {
    if (!isDarkMode()) {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    }
    setIsDarkMode((pre) => !pre);
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {props.children}
    </DarkModeContext.Provider>
  );
};

export function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (!context) throw new ReferenceError("DarkMode Context");

  return context;
}
