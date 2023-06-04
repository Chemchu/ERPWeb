<script lang="ts">
  import Paginator from "$lib/components/pagination/Paginator.svelte";
  import SlideOverProductForm from "$lib/components/productos/SlideOverProductForm.svelte";
  import ProductTable from "$lib/components/tables/ProductTable.svelte";
  import { toastNotificationStore } from "$lib/stores/toastNotifications.js";
  import type { PageData } from "./$types.js";

  export let data: PageData;
  export let form;

  $: {
    if (form?.errors) {
      form.errors.forEach((error) => {
        toastNotificationStore.add({
          type: "error",
          title: `Campo inválido`,
          message: `${error.message}`,
        });
      });
    }

    if (!form?.error && form?.error !== undefined) {
      toastNotificationStore.add({
        type: "success",
        title: `Producto creado`,
        message: form?.message || "El producto se ha creado correctamente",
      });
      showForm = false;
    }
  }

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
<ProductTable
  {data}
  familias={data.body?.familias}
  proveedores={data.body?.proveedores}
/>
<Paginator />
{#if showForm}
  <SlideOverProductForm
    bind:showForm
    familias={data.body?.familias}
    proveedores={data.body?.proveedores}
  />
{/if}
