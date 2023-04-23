<script lang="ts">
  import { enhance } from "$app/forms";
  import { profileDropdownStore } from "$lib/stores/profile";
  import type { Empleado } from "$lib/types/types";
  import { onDestroy, onMount } from "svelte";
  import { scale } from "svelte/transition";
  import type { PageData } from "../../../routes/$types";
  import defaultProfileIcon from "$lib/assets/profile.jpg";

  export let pageData: PageData;

  let profileOpen = false;
  let profile: Empleado | null = null;
  let profileImage: string | null = null;

  let unsubscribeProfile = profileDropdownStore.subscribe(
    (isOpen) => (profileOpen = isOpen)
  );

  const fetchCurrentEmpleado = async (): Promise<[Empleado, string | null]> => {
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

    const iconResponse = await pageData.supabase.storage
      .from("avatars")
      .download(pageData.session.user.id + "/profile");

    const profileImage = iconResponse.data
      ? URL.createObjectURL(iconResponse.data)
      : null;

    return [data[0] as Empleado, profileImage];
  };

  onMount(async () => {
    [profile, profileImage] = await fetchCurrentEmpleado();
  });

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
        src={profileImage || defaultProfileIcon}
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
