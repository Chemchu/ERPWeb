import { writable } from "svelte/store";

function createDashboard() {
  const { subscribe, set, update } = writable(false);

  return {
    subscribe,
    open: () => set(true),
    close: () => set(false),
    toggle: () => update((isOpen) => !isOpen),
  };
}

export const dashboardOpenerStore = createDashboard();
