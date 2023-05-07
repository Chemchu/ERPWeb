<script lang="ts">
  import type { Producto } from "$lib/types/types";
  import Etiqueta from "../printable/Etiqueta.svelte";

  export let name: string = "";
  export let id: string = "";
  export let producto: Producto | undefined = undefined;
  export let codigosDeBarra: string[] = [];

  let value = "";

  const removeEan = (ean: string) => {
    codigosDeBarra = codigosDeBarra.filter((e) => e !== ean);
  };
</script>

<div class="flex flex-col gap-1">
  <div
    class="flex px-0.5 w-full rounded-md border-0 py-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
  >
    <input
      {id}
      name={`${name}[0]`}
      class="appearance-none outline-none border-0 w-full text-gray-900 placeholder-gray-400 focus:ring-0"
      type="text"
      bind:value
      autocomplete="off"
    />
    <button
      class="pr-2"
      type="button"
      on:click={() => {
        if (!value) return;

        codigosDeBarra.push(value);
        codigosDeBarra = codigosDeBarra;
        value = "";
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6 stroke-blue-600 hover:stroke-blue-500"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
    </button>
  </div>
  {#if codigosDeBarra.length > 0}
    <div class="overflow-hidden rounded-md border border-gray-300 bg-white">
      <ul class="divide-y divide-gray-300">
        {#each codigosDeBarra as ean, i}
          <li class="flex px-0.5 py-0.5 gap-1 items-center">
            <!-- Your content -->
            {#if producto}
              <Etiqueta {ean} {producto} />
            {/if}
            <input
              class="appearance-none outline-none border-0 w-full text-gray-900 placeholder-gray-400 focus:ring-0"
              id={`${id}[${i}].ean`}
              name={`${name}[${i + 1}]`}
              type="text"
              bind:value={ean}
            />
            <button class="pr-2" on:click={() => removeEan(ean)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 stroke-red-600 hover:stroke-red-500"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 12h-15"
                />
              </svg>
            </button>
          </li>
        {/each}
      </ul>
    </div>
  {/if}
</div>
