<script lang="ts">
  import { searchStore } from "$lib/stores/search";
  import type { LayoutData } from "../../../routes/$types";

  export let data: LayoutData;

  const fullTextSearch = async (event: KeyboardEvent) => {
    if (event.code !== "Enter") return;

    const { data: textSearchResponse } = await data.supabase
      .from("productos")
      .select()
      .textSearch("nombre", $searchStore);

    console.log(textSearchResponse);
  };
</script>

<div class="mt-5 px-3">
  <label for="search" class="sr-only">Buscar</label>
  <div class="relative mt-1 rounded-md shadow-sm">
    <div
      class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
      aria-hidden="true"
    >
      <svg
        class="h-4 w-4 text-gray-400"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
    <input
      type="text"
      name="search"
      id="search"
      class="block w-full rounded-md border-0 py-1.5 pl-9 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      placeholder="Buscar"
      autocomplete="off"
      bind:value={$searchStore}
      on:keydown={fullTextSearch}
    />
  </div>
</div>
