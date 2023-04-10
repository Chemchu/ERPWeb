<script lang="ts">
  import { enhance } from "$app/forms";
  import { dashboardOpenerStore } from "$lib/stores/dashboard";
  import { onDestroy, onMount } from "svelte";
  import { scale } from "svelte/transition";
  import type { PageData } from "../../../routes/$types";
  import type { Empleado } from "$lib/types/types";

  export let pageData: PageData;
  let profileOpen: boolean = false;
  let currentProfile: Empleado | null = null;

  const unsubscribe = dashboardOpenerStore.subscribe(
    (isOpen) => (profileOpen = isOpen)
  );

  const fetchCurrentEmpleado = async (): Promise<Empleado> => {
    if (!pageData.session) {
      throw "PageData is null";
    }
    const { data, error } = await pageData.supabase
      .from("empleados")
      .select("*")
      .eq("id", pageData.session.user.id);

    if (error) {
      throw error;
    }

    return data[0] as Empleado;
  };

  onMount(async () => {
    currentProfile = await fetchCurrentEmpleado();
  });

  onDestroy(unsubscribe);
</script>

{#if !pageData.session}
  <div>Cargando...</div>
{:else}
  <div class="relative inline-block px-3 pt-1 text-left">
    <div>
      <button
        on:click={() => (profileOpen = !profileOpen)}
        type="button"
        class="group w-full rounded-md bg-gray-100 px-3.5 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-100"
        id="options-menu-button"
        aria-expanded="false"
        aria-haspopup="true"
      >
        <span class="flex w-full items-center justify-between">
          <span class="flex min-w-0 items-center justify-between space-x-3">
            <img
              class="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"
              src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
              alt=""
            />
            <span class="flex min-w-0 flex-1 flex-col">
              <span class="truncate text-sm font-medium text-gray-900"
                >{currentProfile?.nombre || "Cargando..."}</span
              >
              <span class="truncate text-sm text-gray-500"
                >{currentProfile?.rol || "Cargando..."}</span
              >
            </span>
          </span>
          <svg
            class="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
      </button>
    </div>

    {#if profileOpen}
      <div
        class="absolute right-0 left-0 z-10 mx-3 mt-1 origin-top divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu-button"
        tabindex="-1"
        transition:scale={{ duration: 250 }}
      >
        <div class="py-1" role="none">
          <a
            href="/dashboard/profile"
            class="{profileOpen
              ? 'bg-gray-100 text-gray-900'
              : 'text-gray-700'} text-gray-700 hover:bg-gray-100 hover:text-gray-900 block px-4 py-2 text-sm"
            role="menuitem"
            tabindex="-1"
            id="options-menu-item-0">Perfil</a
          >
          <a
            href="/dashboard/settings"
            class="text-gray-700 block px-4 py-2 text-sm"
            role="menuitem"
            tabindex="-1"
            id="options-menu-item-1">Ajustes</a
          >
        </div>
        <div class="py-1" role="none">
          <form action="/logout" method="post" use:enhance>
            <button
              type="submit"
              class="text-gray-700 block px-4 py-2 text-sm"
              tabindex="-1"
              id="options-menu-item-5">Cerrar sesion</button
            >
          </form>
        </div>
      </div>
    {/if}
  </div>
{/if}
