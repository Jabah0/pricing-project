import { makePersisted } from "@solid-primitives/storage";
import { createSignal } from "solid-js";
type User = {
  fullName: string;
  username: string;
  role: string;
};

const userStore = makePersisted(createSignal<User | undefined>(undefined), {
  storage: localStorage,
});

export const useUser = () => userStore;
