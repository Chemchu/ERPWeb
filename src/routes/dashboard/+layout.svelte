<script lang="ts">
  import SmallProfile from "$lib/components/profile/SmallProfile.svelte";
  import { dashboardOpenerStore } from "$lib/stores/dashboard";
  import { searchStore } from "$lib/stores/search";
  import { page } from "$app/stores";
  import { GenerarGrupo } from "$lib/functions/paths";
  import Sidebar from "$lib/components/sidebar/Sidebar.svelte";
  import { onDestroy } from "svelte";

  let paginaActual = "Inicio";
  let unsuscribe = page.subscribe((p) => {
    paginaActual = GenerarGrupo(p.route.id);
  });

  onDestroy(unsuscribe);
</script>

<Sidebar />
<!-- Main column -->
<div class="flex flex-col lg:pl-64">
  <div class="flex flex-col">
    <!-- Search header -->
    <div
      class="sticky top-0 z-10 flex h-16 flex-shrink-0 border-b border-gray-200 bg-white lg:hidden"
    >
      <!-- Sidebar toggle, controls the 'sidebarOpen' sidebar state. -->
      <button
        type="button"
        class="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 lg:hidden"
        on:click={() => dashboardOpenerStore.toggle()}
      >
        <span class="sr-only">Open sidebar</span>
        <svg
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5"
          />
        </svg>
      </button>
      <div class="flex flex-1 justify-between px-4 sm:px-6 lg:px-8">
        <div class="flex flex-1">
          <form class="flex w-full md:ml-0" action="#" method="GET">
            <label for="search-field" class="sr-only">Buscar</label>
            <div
              class="relative w-full text-gray-400 focus-within:text-gray-600"
            >
              <div
                class="pointer-events-none absolute inset-y-0 left-0 flex items-center"
              >
                <svg
                  class="h-5 w-5"
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
                id="search-field"
                name="search-field"
                class="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 focus:border-transparent focus:outline-none focus:ring-0 focus:placeholder:text-gray-400 sm:text-sm"
                placeholder="Buscar"
                type="search"
                bind:value={$searchStore}
              />
            </div>
          </form>
        </div>
        <div class="flex items-center">
          <!-- Profile dropdown -->
          <SmallProfile />
        </div>
      </div>
    </div>

    <main class="flex-1">
      <!-- Page title & actions -->
      <div
        class="hidden border-b border-gray-200 px-4 py-4 lg:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
      >
        <div class="min-w-0 flex-1">
          <h1 class="text-lg font-medium leading-6 text-gray-900 sm:truncate">
            {paginaActual}
          </h1>
        </div>
      </div>
      <div class="mt-6 px-4 sm:px-6 lg:px-8">
        <slot />
      </div>
    </main>
  </div>
</div>
