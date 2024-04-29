import { createStore } from "solid-js/store";

type User = {
  fullName: string;
  username: string;
};

const [user, setUser] = createStore<User | {}>({});

export const useUser = () => [user, setUser];
