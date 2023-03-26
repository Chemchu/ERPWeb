<script lang="ts">
  import {SidebarProfile} from "../../lib/components/sidebar/sidebarProfile/index.ts"
  import {SidebarSearch} from "../../lib/components/sidebar/sidebarSearch/index.ts"

  let profileActive: boolean = false;
</script>

<div class="min-h-full">
  <!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. -->
  <div class="relative z-40 lg:hidden" role="dialog" aria-modal="true">
    <!--
      Off-canvas menu backdrop, show/hide based on off-canvas menu state.

      Entering: "transition-opacity ease-linear duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "transition-opacity ease-linear duration-300"
        From: "opacity-100"
        To: "opacity-0"
    -->
    <div class="fixed inset-0 bg-gray-600 bg-opacity-75" />

    <div class="fixed inset-0 z-40 flex">
      <!--
        Off-canvas menu, show/hide based on off-canvas menu state.

        Entering: "transition ease-in-out duration-300 transform"
          From: "-translate-x-full"
          To: "translate-x-0"
        Leaving: "transition ease-in-out duration-300 transform"
          From: "translate-x-0"
          To: "-translate-x-full"
      -->
      <div
        class="relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4"
      >
        <!--
          Close button, show/hide based on off-canvas menu state.

          Entering: "ease-in-out duration-300"
            From: "opacity-0"
            To: "opacity-100"
          Leaving: "ease-in-out duration-300"
            From: "opacity-100"
            To: "opacity-0"
        -->
        <div class="absolute top-0 right-0 -mr-12 pt-2">
          <button
            type="button"
            class="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
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
          <nav class="px-2">
            <div class="space-y-1">
              <!-- Current: "bg-gray-100 text-gray-900", Default: "text-gray-600 hover:bg-gray-50 hover:text-gray-900" -->
              <a
                href="#"
                class="bg-gray-100 text-gray-900 group flex items-center rounded-md px-2 py-2 text-base font-medium leading-5"
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
                Home
              </a>

              <a
                href="#"
                class="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center rounded-md px-2 py-2 text-base font-medium leading-5"
              >
                <svg
                  class="text-gray-400 group-hover:text-gray-500 mr-3 h-6 w-6 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                  />
                </svg>
                My tasks
              </a>

              <a
                href="#"
                class="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center rounded-md px-2 py-2 text-base font-medium leading-5"
              >
                <svg
                  class="text-gray-400 group-hover:text-gray-500 mr-3 h-6 w-6 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Recent
              </a>
            </div>
            <div class="mt-8">
              <h3
                class="px-3 text-sm font-medium text-gray-500"
                id="mobile-teams-headline"
              >
                Teams
              </h3>
              <div
                class="mt-1 space-y-1"
                role="group"
                aria-labelledby="mobile-teams-headline"
              >
                <a
                  href="#"
                  class="group flex items-center rounded-md px-3 py-2 text-base font-medium leading-5 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <span
                    class="mr-4 h-2.5 w-2.5 bg-indigo-500 rounded-full"
                    aria-hidden="true"
                  />
                  <span class="truncate">Engineering</span>
                </a>

                <a
                  href="#"
                  class="group flex items-center rounded-md px-3 py-2 text-base font-medium leading-5 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <span
                    class="mr-4 h-2.5 w-2.5 bg-green-500 rounded-full"
                    aria-hidden="true"
                  />
                  <span class="truncate">Human Resources</span>
                </a>

                <a
                  href="#"
                  class="group flex items-center rounded-md px-3 py-2 text-base font-medium leading-5 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <span
                    class="mr-4 h-2.5 w-2.5 bg-yellow-500 rounded-full"
                    aria-hidden="true"
                  />
                  <span class="truncate">Customer Success</span>
                </a>
              </div>
            </div>
          </nav>
        </div>
      </div>

      <div class="w-14 flex-shrink-0" aria-hidden="true">
        <!-- Dummy element to force sidebar to shrink to fit close icon -->
      </div>
    </div>
  </div>

  <!-- Static sidebar for desktop -->
  <div
    class="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-gray-200 lg:bg-gray-100 lg:pt-5 lg:pb-4"
  >
    <!-- Sidebar component, swap this element with another sidebar if you like -->
    <div class="flex h-0 flex-1 flex-col overflow-y-auto">
      <!-- User account dropdown -->
      <SidebarProfile />
      
      <!-- Sidebar Search -->
      <SidebarSearch />
      
      <!-- Navigation -->
      <nav class="mt-6 px-3">
        <div class="space-y-1">
          <!-- Current: "bg-gray-200 text-gray-900", Default: "text-gray-700 hover:bg-gray-50 hover:text-gray-900" -->
          <a
            href="#"
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
            Home
          </a>

          <a
            href="#"
            class="text-gray-700 hover:bg-gray-50 hover:text-gray-900 group flex items-center rounded-md px-2 py-2 text-sm font-medium"
          >
            <svg
              class="text-gray-400 group-hover:text-gray-500 mr-3 h-6 w-6 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
              />
            </svg>
            My tasks
          </a>

          <a
            href="#"
            class="text-gray-700 hover:bg-gray-50 hover:text-gray-900 group flex items-center rounded-md px-2 py-2 text-sm font-medium"
          >
            <svg
              class="text-gray-400 group-hover:text-gray-500 mr-3 h-6 w-6 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Recent
          </a>
        </div>
        <div class="mt-8">
          <!-- Secondary navigation -->
          <h3
            class="px-3 text-sm font-medium text-gray-500"
            id="desktop-teams-headline"
          >
            Teams
          </h3>
          <div
            class="mt-1 space-y-1"
            role="group"
            aria-labelledby="desktop-teams-headline"
          >
            <a
              href="#"
              class="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
            >
              <span
                class="mr-4 h-2.5 w-2.5 bg-indigo-500 rounded-full"
                aria-hidden="true"
              />
              <span class="truncate">Engineering</span>
            </a>

            <a
              href="#"
              class="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
            >
              <span
                class="mr-4 h-2.5 w-2.5 bg-green-500 rounded-full"
                aria-hidden="true"
              />
              <span class="truncate">Human Resources</span>
            </a>

            <a
              href="#"
              class="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
            >
              <span
                class="mr-4 h-2.5 w-2.5 bg-yellow-500 rounded-full"
                aria-hidden="true"
              />
              <span class="truncate">Customer Success</span>
            </a>
          </div>
        </div>
      </nav>
    </div>
  </div>
</div>
  <!-- Main column -->
<div class="flex flex-col lg:pl-64">
  <slot/>
</div>

