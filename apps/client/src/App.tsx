import "./App.css";

import { Route, Router } from "@solidjs/router";
import { MainLayout } from "./features/layout/components/MainLayout";
import { MedServiceList } from "./features/med-service/components/MedServiceList";
import { Match, Switch, createSignal, onMount } from "solid-js";
import { locale } from "./features/locale/locale.config";
import { LocaleProvider } from "./features/locale/LocaleProvider";
import i18next from "i18next";

function App() {
  const [loaded, setLoaded] = createSignal(false);

  onMount(async () => {
    await locale;
    setLoaded(true);
  });

  return (
    <Switch>
      <Match when={loaded()}>
        <LocaleProvider i18n={i18next}>
          <Router root={MainLayout}>
            <Route path="/" component={MedServiceList} />
          </Router>
        </LocaleProvider>
      </Match>
      <Match when={!loaded()}>
        <p>Loading</p>
      </Match>
    </Switch>
  );
}

export default App;
