<script lang="ts">
  import { onMount } from "svelte";
  import type { Producto, Proveedor } from "$lib/types/types";
  import type { PageData } from "../../../routes/$types";
  import { goto } from "$app/navigation";
  import SlideOverProductDetail from "../productos/SlideOverProductDetail.svelte";
  import { tableProductsStore } from "$lib/stores/tableProducts";
  import { paginatorStore } from "$lib/stores/paginator";

  export let data: PageData;
  export let proveedores: Proveedor[] = [];
  export let familias: string[] = [];

  let showDetail = false;
  let currentDetailProduct: Producto;

  onMount(async () => {
    await fetchTableSize();
    await fetchProductos();
  });

  $: if ($paginatorStore.currentPage > 0) {
    fetchProductos();
  }

  const fetchTableSize = async () => {
    const { count } = await data.supabase
      .from("productos")
      .select("*", { count: "exact", head: true });
    paginatorStore.setTableSize(count || 0);
  };

  const fetchProductos = async () => {
    const firstElement =
      $paginatorStore.currentPage * $paginatorStore.range.start - 1;

    const lastElement =
      $paginatorStore.currentPage *
        ($paginatorStore.range.start +
          $paginatorStore.range.elementsPerPage -
          1) -
      1;

    const { data: productosData, count } = await data.supabase
      .from("productos")
      .select("*")
      .range(firstElement, lastElement);

    tableProductsStore.set(productosData as Producto[]);
  };
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
          {#each $tableProductsStore as producto}
            <tr
              class="hover:bg-gray-100 cursor-pointer"
              on:click={(e) => {
                e.stopPropagation();
                goto(`/dashboard/products/${producto.id}`);
              }}
            >
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
                <button
                  class="text-indigo-600 hover:text-indigo-900"
                  on:click={(e) => {
                    e.stopPropagation();
                    showDetail = true;
                    currentDetailProduct = producto;
                  }}
                  >Editar<span class="sr-only">, {producto.nombre}</span
                  ></button
                >
              </td>
            </tr>
          {/each}
          {#if showDetail}
            <SlideOverProductDetail
              bind:showDetail
              {data}
              producto={currentDetailProduct}
              {familias}
              {proveedores}
            />
          {/if}
        </tbody>
      </table>
    </div>
  </div>
</div>
