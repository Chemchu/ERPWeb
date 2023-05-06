<script lang="ts">
  import { enhance } from "$app/forms";
  import Banner from "$lib/components/banner/Banner.svelte";
  import BarcodeInput from "$lib/components/barcode/BarcodeInput.svelte";
  import SimpleCombobox from "$lib/components/combobox/SimpleCombobox.svelte";
  import { BannerType } from "$lib/customEnums.js";
  import { onMount } from "svelte";

  export let data;

  let precioCompra: number = data.props.producto.precio_compra;
  let precioVenta: number = data.props.producto.precio_venta;
  let iva: number = data.props.producto.iva;

  let history: History;

  $: margen = (): number => {
    const precioCompraConIva =
      Number(precioCompra) + Number(precioCompra) * (Number(iva) / 100);

    return (
      ((Number(precioVenta) - precioCompraConIva) / precioCompraConIva) * 100 ||
      0
    );
  };

  $: bannerType = (): [BannerType, string] => {
    if (margen() < 5) {
      return [BannerType.BAD, "El valor es muy bajo"];
    } else if (margen() < 10) {
      return [BannerType.WARNING, "El valor es bajo"];
    } else if (margen() > 50 && margen() < 90) {
      return [BannerType.INFO, "El valor es alto"];
    } else if (margen() > 90) {
      return [BannerType.INFO, "El valor es sospechosamente alto"];
    } else {
      return [BannerType.GOOD, "El valor es bueno"];
    }
  };

  const ganancia = (): number => {
    const precioCompraConIva =
      Number(precioCompra) + Number(precioCompra) * (Number(iva) / 100);

    return Number(precioVenta) - precioCompraConIva;
  };

  onMount(() => {
    history = window.history;
  });

  function goBack() {
    history.go(-1);
  }
</script>

<form
  class="flex h-full flex-col bg-white"
  use:enhance
  action="?/createProduct"
  method="POST"
>
  <div class="flex-1">
    <!-- Header -->
    <div>
      <div class="flex items-start justify-between space-x-3">
        <div class="space-y-1">
          <h2
            class="text-base font-semibold leading-6 text-gray-900"
            id="slide-over-title"
          >
            {data.props.producto.nombre}
          </h2>
          <p class="text-sm text-gray-500">
            {data.props.producto.id}
          </p>
        </div>
      </div>
    </div>

    <!-- Divider container -->
    <div
      class="space-y-6 py-6 sm:space-y-0 sm:divide-y sm:divide-gray-200 sm:py-0"
    >
      <!-- Nombre del producto -->
      <div
        class="space-y-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:py-5"
      >
        <div>
          <label
            for="nombreProducto"
            class="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
            >Nombre del producto</label
          >
        </div>
        <div class="sm:col-span-2">
          <input
            type="text"
            name="nombreProducto"
            id="nombreProducto"
            value={data.props.producto.nombre}
            autocomplete="off"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <!-- Familia del producto -->
      <div
        class="space-y-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:py-5"
      >
        <div>
          <label
            for="familiaProducto"
            class="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
            >Familia</label
          >
        </div>
        <div class="sm:col-span-2">
          <SimpleCombobox
            id="familiaProducto"
            name="familiaProducto"
            defaultItem={data.props.producto.familia || ""}
            items={data.props.familias}
          />
        </div>
      </div>
      <div
        class="space-y-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:py-5"
      >
        <div>
          <label
            for="proveedor"
            class="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
            >Proveedor</label
          >
        </div>
        <div class="sm:col-span-2">
          {#if data.props.proveedores.length == 0}
            <span class="text-gray-500 italic text-sm"
              >No hay registro de proveedores</span
            >
          {:else}
            <SimpleCombobox
              id="provedor"
              name="proveedor"
              defaultItem={data.props.producto.proveedor_id || ""}
              items={data.props.proveedores.map((p) => p.nombre)}
            />
          {/if}
        </div>
      </div>
      <div>
        <div
          class="space-y-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:py-5"
        >
          <div>
            <div>
              <label
                for="precioCompra"
                class="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                >Precio de compra</label
              >
            </div>
            <div class="sm:col-span-2">
              <input
                type="text"
                name="precioCompra"
                id="precioCompra"
                autocomplete="off"
                bind:value={precioCompra}
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <div>
              <label
                for="precioVenta"
                class="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                >Precio de venta</label
              >
            </div>
            <div class="sm:col-span-2">
              <input
                type="text"
                name="precioVenta"
                id="precioVenta"
                autocomplete="off"
                bind:value={precioVenta}
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <div>
              <label
                for="iva"
                class="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                >IVA</label
              >
            </div>
            <div class="sm:col-span-2">
              <input
                type="text"
                name="iva"
                id="iva"
                autocomplete="off"
                bind:value={iva}
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
        {#if precioCompra > 0 && precioVenta > 0}
          <Banner
            canBeClosed={false}
            title={`Margen de ${margen().toFixed(2)}%`}
            subtitle={bannerType()[1] +
              ". El beneficio es de " +
              ganancia().toFixed(2) +
              "€ por cada unidad vendida."}
            bannerType={bannerType()[0]}
          />
        {/if}
      </div>
      <div
        class="space-y-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:py-5"
      >
        <div>
          <label
            for="codigosDeBarra"
            class="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
            >Codigos de barra</label
          >
        </div>
        <div class="sm:col-span-2">
          <BarcodeInput
            id="codigoDeBarras"
            name="codigoDeBarras"
            producto={data.props.producto}
          />
        </div>
      </div>
      <div
        class="space-y-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:py-5"
      >
        <div>
          <label
            for="cantidad"
            class="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
            >Cantidad</label
          >
        </div>
        <div class="sm:col-span-2">
          <input
            type="text"
            name="cantidad"
            id="cantidad"
            value={data.props.producto.cantidad}
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    </div>

    <!-- Action buttons -->
    <div class="flex-shrink-0 border-t border-gray-200 py-5">
      <div class="flex justify-end space-x-3">
        <button
          type="button"
          class="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          on:click={goBack}>Cancelar</button
        >
        <button
          type="submit"
          class="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >Actualizar</button
        >
      </div>
    </div>
  </div>
</form>
