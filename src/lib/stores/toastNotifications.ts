import type { ToastNotification } from "$lib/customTypes";
import { writable, get } from "svelte/store";

function createToastNotification() {
  const { subscribe, set } = writable<ToastNotification[]>([]);

  return {
    subscribe,
    add: (notification: ToastNotification) => {
      const notifications = get(toastNotificationStore);
      notifications.push(notification);
      set(notifications);
    },
    delete: (index: number) => {
      const notifications = get(toastNotificationStore);
      notifications.splice(index, 1);
      set(notifications);
    },
    clear: () => {
      set([]);
    },
  };
}

export const toastNotificationStore = createToastNotification();
