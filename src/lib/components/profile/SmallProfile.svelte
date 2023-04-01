<script lang="ts">
  import { profileDropdownStore } from "$lib/stores/profile";
  import { onDestroy } from "svelte";
  import { scale } from "svelte/transition";

  let profileOpen = false;

  let unsubscribeProfile = profileDropdownStore.subscribe(
    (isOpen) => (profileOpen = isOpen)
  );

  onDestroy(() => {
    unsubscribeProfile();
  });
</script>

<div class="relative ml-3">
  <div>
    <button
      type="button"
      class="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
      id="user-menu-button"
      aria-expanded="false"
      aria-haspopup="true"
      on:click={() => profileDropdownStore.toggle()}
    >
      <span class="sr-only">Open user menu</span>
      <img
        class="h-8 w-8 rounded-full"
        src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        alt=""
      />
    </button>
  </div>
  {#if profileOpen}
    <div
      class="absolute right-0 z-10 mt-2 w-48 origin-top-right divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="user-menu-button"
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
        <a
          href="/dashboard/logout"
          class="text-gray-700 block px-4 py-2 text-sm"
          role="menuitem"
          tabindex="-1"
          id="options-menu-item-5">Cerrar sesion</a
        >
      </div>
    </div>
  {/if}
</div>
