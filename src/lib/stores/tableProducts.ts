import type { Producto } from "$lib/types/types";
import { writable } from "svelte/store";

function createTableProduct() {
  const { subscribe, set, update } = writable<Producto[]>([]);

  return {
    subscribe,
    set: (products: Producto[]) => set(products),
    delete: (id: string) =>
      update((products) => products.filter((product) => product.id !== id)),
  };
}

export const tableProductsStore = createTableProduct();
