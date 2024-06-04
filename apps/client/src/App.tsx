import "./App.css";

import { Navigate, Route, Router } from "@solidjs/router";
import { MainLayout } from "./features/layout/components/MainLayout";
import { AuthLayout } from "./features/layout/components/AuthLayout";
import { Login } from "./features/auth/pages/Login";
import { UsersList } from "./features/_users/components/UsersList";
import { RouteGuard } from "./features/auth/components/RouteGuard";
import { MedServicesList } from "./features/med-service/components/MedServicesList";
import { Home } from "./features/home/components/Home";
import { LocaleProvider } from "./features/locale/LocaleProvider";

function App() {
  return (
    <LocaleProvider>
      <Router>
        <Route path="/" component={MainLayout}>
          <Route component={RouteGuard}>
            <Route path="/" component={Home} info={{ label: "Home" }} />
            <Route path="/services" component={MedServicesList} />
          </Route>
          <Route
            component={(props) => (
              <RouteGuard role="ADMIN">{props.children}</RouteGuard>
            )}
          >
            <Route path="/users" component={UsersList} />
          </Route>
        </Route>
        <Route path="/auth" component={AuthLayout}>
          <Route path="/login" component={Login} />
        </Route>
        <Route path="*paramName" component={() => <Navigate href="/" />} />
      </Router>
    </LocaleProvider>
  );
}

export default App;
