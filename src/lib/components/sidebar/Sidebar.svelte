<script lang="ts">
  import SidebarSearch from "$lib/components/sidebar/SidebarSearch.svelte";
  import { dashboardOpenerStore } from "$lib/stores/dashboard";
  import { onDestroy } from "svelte";
  import { fade, fly } from "svelte/transition";
  import type { PageData } from "../../../routes/$types";
  import Profile from "../profile/Profile.svelte";
  import SidebarNav from "./SidebarNav.svelte";

  export let data: PageData;

  let sidebarOpen: boolean = false;
  const unsubscribeDashboard = dashboardOpenerStore.subscribe(
    (isOpen) => (sidebarOpen = isOpen)
  );

  onDestroy(() => {
    unsubscribeDashboard();
  });
</script>

<div class="min-h-full">
  <!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. -->
  {#if sidebarOpen}
    <div class="relative z-40 lg:hidden" role="dialog" aria-modal="true">
      <div class="fixed inset-0 bg-gray-600 bg-opacity-75" transition:fade />
      <div
        class="fixed inset-0 z-40 flex"
        transition:fly={{ x: -100, duration: 250, opacity: 0 }}
      >
        <div
          class="relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4"
        >
          <div class="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              class="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              on:click={() => dashboardOpenerStore.close()}
            >
              <span class="sr-only">Close sidebar</span>
              <svg
                class="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div class="flex flex-shrink-0 items-center px-4 text-2xl">
            <h1>ERPWeb</h1>
          </div>
          <div class="mt-5 h-0 flex-1 overflow-y-auto">
            <SidebarNav {data} />
          </div>
        </div>
        <div class="w-14 flex-shrink-0" aria-hidden="true">
          <!-- Dummy element to force sidebar to shrink to fit close icon -->
        </div>
      </div>
    </div>
  {/if}

  <!-- Static sidebar for desktop -->
  <div
    class="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-gray-200 lg:bg-gray-100 lg:pt-5 lg:pb-4"
  >
    <!-- Sidebar component, swap this element with another sidebar if you like -->
    <div class="flex h-0 flex-1 flex-col overflow-y-auto">
      <!-- User account dropdown -->
      <Profile pageData={data} />
      <!-- Sidebar Search -->
      <SidebarSearch {data} />
      <!-- Navigation -->
      <SidebarNav {data} />
    </div>
  </div>
</div>
