import { ParentComponent } from "solid-js";
import { useUser } from "../stores/UserStore";
import { Navigate } from "@solidjs/router";

export const RouteGuard: ParentComponent = (props) => {
  const [user, _setUser] = useUser();

  return user() ? <>{props.children}</> : <Navigate href="/auth/login" />;
};
