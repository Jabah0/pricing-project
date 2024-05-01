import { createLocalStore } from "@/helper/createLocalStore";
type User = {
  fullName: string;
  username: string;
};

const userStore = createLocalStore<User | undefined>(undefined);

export const useUser = () => userStore;
