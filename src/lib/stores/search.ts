import { writable } from "svelte/store";

function createSearch() {
  const { subscribe, set } = writable("");

  return {
    subscribe,
    write: (text: string) => set(text),
    clear: () => set(""),
  };
}

export const searchStore = createSearch();
