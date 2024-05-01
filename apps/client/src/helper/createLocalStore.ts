import { Accessor, Setter, createEffect, createSignal } from "solid-js";

export function createLocalStore<T>(initState: T): [Accessor<T>, Setter<T>] {
  const [state, setState] = createSignal(initState);

  if (localStorage.myStore) {
    try {
      setState(JSON.parse(localStorage.myStore));
    } catch (error) {
      setState(() => initState);
    }
  }

  createEffect(() => {
    localStorage.myStore = JSON.stringify(state());
  });

  return [state, setState];
}
