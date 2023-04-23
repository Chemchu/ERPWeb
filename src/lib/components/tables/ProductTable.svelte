<script lang="ts">
  import { onMount } from "svelte";
  import type { Producto } from "$lib/types/types";
  import type { LayoutData } from "../../../routes/$types";

  export let data: LayoutData;
  export let paginaSize: number = 10;
  export let pagina = 1;

  let productos: Producto[] = [];

  onMount(async () => {
    const { data: productosData } = await data.supabase
      .from("productos")
      .select("*")
      .range(pagina * paginaSize - paginaSize, pagina * paginaSize);

    productos = productosData as Producto[];
  });
</script>

<div class="mt-8 flow-root">
  <div class="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
    <div class="inline-block min-w-full py-2 align-middle">
      <table class="min-w-full border-separate border-spacing-0">
        <thead>
          <tr>
            <th
              scope="col"
              class="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
              >Nombre</th
            >
            <th
              scope="col"
              class="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
              >Familia</th
            >
            <th
              scope="col"
              class="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
              >IVA</th
            >
            <th
              scope="col"
              class="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-right text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
              >Precio</th
            >
            <th
              scope="col"
              class="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-3 pr-4 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8"
            >
              <span class="sr-only">Editar</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {#each productos as producto}
            <tr>
              <td
                class="whitespace-nowrap border-b border-gray-200 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8"
                >{producto.nombre}</td
              >
              <td
                class="whitespace-nowrap border-b border-gray-200 hidden px-3 py-4 text-sm text-gray-500 sm:table-cell"
                >{producto.familia}</td
              >
              <td
                class="whitespace-nowrap border-b border-gray-200 hidden px-3 py-4 text-sm text-gray-500 lg:table-cell"
                >{producto.iva}%</td
              >
              <td
                class="whitespace-nowrap border-b border-gray-200 px-3 py-4 text-right text-sm text-gray-500"
                >{producto.precio_venta}€</td
              >
              <td
                class="relative whitespace-nowrap border-b border-gray-200 py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-8 lg:pr-8"
              >
                <a
                  href={`/dashboard/products/${producto.id}`}
                  class="text-indigo-600 hover:text-indigo-900"
                  >Editar<span class="sr-only">, {producto.nombre}</span></a
                >
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>
