<script lang="ts">
  import { fade } from "svelte/transition";

  let currentOpened = "";

  const setCurrentlyOpened = (id: string) => {
    if (currentOpened == id) {
      currentOpened = "";
      return;
    }
    currentOpened = id;
  };
</script>

<nav class="mt-6 px-3">
  <div class="space-y-1">
    <!-- Current: "bg-gray-200 text-gray-900", Default: "text-gray-700 hover:bg-gray-50 hover:text-gray-900" -->
    <a
      href="/dashboard"
      class="bg-gray-200 text-gray-900 group flex items-center rounded-md px-2 py-2 text-sm font-medium"
      aria-current="page"
    >
      <!-- Current: "text-gray-500", Default: "text-gray-400 group-hover:text-gray-500" -->
      <svg
        class="text-gray-500 mr-3 h-6 w-6 flex-shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
        />
      </svg>
      Inicio
    </a>
    <button
      id="Dia a dia"
      class="text-gray-700 hover:bg-gray-50 hover:text-gray-900 group flex items-center rounded-md px-2 py-2 text-sm font-medium w-full"
      on:click={(e) => setCurrentlyOpened(e.currentTarget.id)}
    >
      <svg
        class="text-gray-500 group-hover:text-gray-600 mr-3 h-6 w-6 flex-shrink-0"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
        />
      </svg>
      <span class="w-full text-left">Dia a dia</span>
      {#if currentOpened == "Dia a dia"}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="text-gray-500 group-hover:text-gray-600 mr-3 h-6 w-6 flex-shrink-0"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4.5 15.75l7.5-7.5 7.5 7.5"
          />
        </svg>
      {:else}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="text-gray-500 group-hover:text-gray-600 mr-3 h-6 w-6 flex-shrink-0"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      {/if}
    </button>
    {#if currentOpened == "Dia a dia"}
      <div
        class="flex flex-col justify-center border-l ml-4 hover:border-gray-300"
        transition:fade={{ duration: 300 }}
      >
        <a
          href="/dashboard/tpv"
          class="text-gray-700 hover:bg-gray-50 hover:text-gray-900 pl-4 rounded-md px-2 py-2 text-sm font-medium"
        >
          TPV
        </a>
        <a
          href="/dashboard/products"
          class="text-gray-700 hover:bg-gray-50 hover:text-gray-900 pl-4 rounded-md px-2 py-2 text-sm font-medium"
        >
          Productos
        </a>
        <a
          href="/dashboard/sales"
          class="text-gray-700 hover:bg-gray-50 hover:text-gray-900 pl-4 rounded-md px-2 py-2 text-sm font-medium"
        >
          Ventas
        </a>
        <a
          href="/dashboard/closures"
          class="text-gray-700 hover:bg-gray-50 hover:text-gray-900 pl-4 rounded-md px-2 py-2 text-sm font-medium"
        >
          Cierres
        </a>
      </div>
    {/if}
    <a
      href="/dashboard/statistics"
      class="text-gray-700 hover:bg-gray-50 hover:text-gray-900 group flex items-center rounded-md px-2 py-2 text-sm font-medium"
    >
      <svg
        class="text-gray-500 group-hover:text-gray-600 mr-3 h-6 w-6 flex-shrink-0"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
        />
      </svg>
      Estadisticas
    </a>

    <button
      id="Terceros"
      class="text-gray-700 hover:bg-gray-50 hover:text-gray-900 group flex items-center rounded-md px-2 py-2 text-sm font-medium w-full"
      on:click={(e) => setCurrentlyOpened(e.currentTarget.id)}
    >
      <svg
        class="text-gray-500 group-hover:text-gray-600 mr-3 h-6 w-6 flex-shrink-0"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
        />
      </svg>
      <span class="w-full text-left">Terceros</span>
      {#if currentOpened == "Terceros"}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="text-gray-500 group-hover:text-gray-600 mr-3 h-6 w-6 flex-shrink-0"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4.5 15.75l7.5-7.5 7.5 7.5"
          />
        </svg>
      {:else}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="text-gray-500 group-hover:text-gray-600 mr-3 h-6 w-6 flex-shrink-0"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      {/if}
    </button>
    {#if currentOpened == "Terceros"}
      <div
        class="flex flex-col justify-center border-l ml-4 hover:border-gray-300"
        transition:fade={{ duration: 300 }}
      >
        <a
          href="/dashboard/employees"
          class="text-gray-700 hover:bg-gray-50 hover:text-gray-900 pl-4 rounded-md px-2 py-2 text-sm font-medium"
        >
          Empleados
        </a>
        <a
          href="/dashboard/clients"
          class="text-gray-700 hover:bg-gray-50 hover:text-gray-900 pl-4 rounded-md px-2 py-2 text-sm font-medium"
        >
          Clientes
        </a>
        <a
          href="/dashboard/suppliers"
          class="text-gray-700 hover:bg-gray-50 hover:text-gray-900 pl-4 rounded-md px-2 py-2 text-sm font-medium"
        >
          Proveedores
        </a>
      </div>
    {/if}
  </div>
</nav>
