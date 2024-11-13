import { apiClient } from "@/api/api-client";
import { useUser } from "../stores/UserStore";

export const useWhoAmI = () => {
  const [_user, setUser] = useUser();
  apiClient.auth.whoAmI.createQuery(
    () => ["myInfo"],
    {},
    { onSuccess: (data) => setUser(() => data?.body) }
  );
};
