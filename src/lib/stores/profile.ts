import { writable } from "svelte/store";

function createProfileDropdown() {
  const { subscribe, update } = writable(false);

  return {
    subscribe,
    open: () => update(() => true),
    close: () => update(() => false),
    toggle: () => update((isOpen) => !isOpen),
  };
}

export const profileDropdownStore = createProfileDropdown();
