import { ParentComponent } from "solid-js";
import { useUser } from "../stores/UserStore";
import { Navigate } from "@solidjs/router";

export const RouteGuard: ParentComponent<{ role?: string }> = (props) => {
  const [user, _setUser] = useUser();

  if (user() && (user()?.role === props.role || !props.role)) {
    console.log("executed");
    return props.children;
  }

  return <Navigate href="/auth/login" />;
};
