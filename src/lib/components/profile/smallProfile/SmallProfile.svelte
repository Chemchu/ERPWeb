<script lang="ts">
  let profileActive = false;
</script>

<div class="relative ml-3">
  <div>
    <button
      type="button"
      class="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
      id="user-menu-button"
      aria-expanded="false"
      aria-haspopup="true"
      on:click={() => (profileActive = !profileActive)}
    >
      <span class="sr-only">Open user menu</span>
      <img
        class="h-8 w-8 rounded-full"
        src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        alt=""
      />
    </button>
  </div>

  <!--
              Dropdown menu, show/hide based on menu state.

              Entering: "transition ease-out duration-100"
                From: "transform opacity-0 scale-95"
                To: "transform opacity-100 scale-100"
              Leaving: "transition ease-in duration-75"
                From: "transform opacity-100 scale-100"
                To: "transform opacity-0 scale-95"
            -->
  {#if profileActive}
    <div
      class="absolute right-0 z-10 mt-2 w-48 origin-top-right divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="user-menu-button"
      tabindex="-1"
    >
      <div class="py-1" role="none">
        <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
        <a
          href="#"
          class="text-gray-700 block px-4 py-2 text-sm"
          role="menuitem"
          tabindex="-1"
          id="user-menu-item-0">View profile</a
        >
        <a
          href="#"
          class="text-gray-700 block px-4 py-2 text-sm"
          role="menuitem"
          tabindex="-1"
          id="user-menu-item-1">Settings</a
        >
        <a
          href="#"
          class="text-gray-700 block px-4 py-2 text-sm"
          role="menuitem"
          tabindex="-1"
          id="user-menu-item-2">Notifications</a
        >
      </div>
      <div class="py-1" role="none">
        <a
          href="#"
          class="text-gray-700 block px-4 py-2 text-sm"
          role="menuitem"
          tabindex="-1"
          id="user-menu-item-3">Get desktop app</a
        >
        <a
          href="#"
          class="text-gray-700 block px-4 py-2 text-sm"
          role="menuitem"
          tabindex="-1"
          id="user-menu-item-4">Support</a
        >
      </div>
      <div class="py-1" role="none">
        <a
          href="#"
          class="text-gray-700 block px-4 py-2 text-sm"
          role="menuitem"
          tabindex="-1"
          id="user-menu-item-5">Logout</a
        >
      </div>
    </div>
  {/if}
</div>
