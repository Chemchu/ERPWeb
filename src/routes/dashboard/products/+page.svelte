<script lang="ts">
  import SlideOverProductForm from "$lib/components/productos/SlideOverProductForm.svelte";
  import ProductTable from "$lib/components/tables/ProductTable.svelte";
  import type { LayoutData } from "../$types";

  export let data: LayoutData;

  let showForm = false;
</script>

<div class="sm:flex sm:items-center">
  <div class="sm:flex-auto">
    <h1 class="text-base font-semibold leading-6 text-gray-900">Productos</h1>
    <p class="mt-2 text-sm text-gray-700">
      Una lista de todos los productos que se encuentran en el sistema.
    </p>
  </div>
  <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
    <button
      type="button"
      class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      on:click={() => {
        showForm = true;
      }}>Nuevo producto</button
    >
  </div>
</div>
<ProductTable {data} />
{#if showForm}
  <SlideOverProductForm bind:showForm />
{/if}
