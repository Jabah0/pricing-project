import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";

type User = {
  fullName: string;
  username: string;
};

const [user, setUser] = createSignal<User>();

export const useUser = () => [user, setUser];
