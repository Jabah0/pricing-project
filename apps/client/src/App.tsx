import "./App.css";

import { Route, Router } from "@solidjs/router";
import { MainLayout } from "./features/layout/components/MainLayout";
import { MedServiceList } from "./features/med-service/components/MedServiceList";
import { Match, Switch, createSignal, onMount } from "solid-js";
import { locale } from "./features/locale/locale.config";
import { LocaleProvider } from "./features/locale/LocaleProvider";
import i18next from "i18next";
import { AuthLayout } from "./features/layout/components/AuthLayout";
import { Login } from "./features/auth/pages/Login";
import { UsersList } from "./features/_users/components/UsersList";

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
          <Router>
            <Route path="/" component={MainLayout}>
              <Route path="/" component={MedServiceList} />
              <Route path="/users" component={UsersList} />
            </Route>
            <Route path="/auth" component={AuthLayout}>
              <Route path="/login" component={Login} />
            </Route>
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
