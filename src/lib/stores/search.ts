import { writable } from "svelte/store";

function createSearch() {
  const { subscribe, set } = writable("");

  return {
    subscribe,
    set: (text: string) => set(text),
    clear: () => set(""),
  };
}

export const searchStore = createSearch();
