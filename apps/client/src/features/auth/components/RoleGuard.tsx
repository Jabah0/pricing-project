import { ParentComponent } from "solid-js";
import { useUser } from "../stores/UserStore";

export const RoleGuard: ParentComponent<{ role: string }> = (props) => {
  const [user, _setUser] = useUser();

  return user()?.role === props.role ? <>{props.children}</> : null;
};
