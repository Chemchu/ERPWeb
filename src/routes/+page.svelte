<script lang="ts">
  import { fade, fly } from "svelte/transition";

  let sidebarOpen = false;
</script>

<svelte:head>
  <title>ERPWeb - Home page</title>
</svelte:head>

<div class="bg-white">
  <header class="absolute inset-x-0 top-0 z-50">
    <div class="mx-auto max-w-7xl">
      <div class="px-6 pt-6 lg:max-w-2xl lg:pl-8 lg:pr-0">
        <nav
          class="flex items-center justify-between lg:justify-start"
          aria-label="Global"
        >
          <a href="#" class="-m-1.5 p-1.5">
            <span class="sr-only">Nosotros</span>
            <img
              alt="Your Company"
              class="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            />
          </a>
          <button
            type="button"
            class="-m-2.5 rounded-md p-2.5 text-gray-700 lg:hidden"
            on:click={() => {
              sidebarOpen = true;
            }}
          >
            <span class="sr-only">Abrir menu principal</span>
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
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
          <div class="hidden lg:ml-12 lg:flex lg:gap-x-14">
            <a
              href="/login"
              class="text-sm font-semibold leading-6 text-gray-900"
              >Iniciar sesión</a
            >
            <a
              href="/about"
              class="text-sm font-semibold leading-6 text-gray-900"
              >Sobre nosotros</a
            >

            <a href="#" class="text-sm font-semibold leading-6 text-gray-900"
              >Envia tu curriculum</a
            >
          </div>
        </nav>
      </div>
    </div>
    {#if sidebarOpen}
      <!-- Mobile menu, show/hide based on menu open state. -->
      <div
        class="lg:hidden"
        role="dialog"
        aria-modal="true"
        transition:fade={{ duration: 250 }}
      >
        <!-- Background backdrop, show/hide based on slide-over state. -->
        <div class="fixed inset-0 z-50" />
        <div
          class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
        >
          <div class="flex items-center justify-between">
            <a href="/" class="-m-1.5 p-1.5">
              <span class="sr-only">ERPWeb</span>
              <img
                class="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
            <button
              type="button"
              class="-m-2.5 rounded-md p-2.5 text-gray-700"
              on:click={() => (sidebarOpen = !sidebarOpen)}
            >
              <span class="sr-only">Close menu</span>
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div class="mt-6 flow-root">
            <div class="-my-6 divide-y divide-gray-500/10">
              <div class="py-6">
                <a
                  href="/login"
                  class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >Iniciar sesión</a
                >
              </div>
              <div class="space-y-2 py-6">
                <a
                  href="/about"
                  class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >Sobre nosotros</a
                >

                <a
                  href="#"
                  class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >Envia tu curriculum</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    {/if}
  </header>

  <div class="relative">
    <div class="mx-auto max-w-7xl">
      <div class="relative z-10 pt-14 lg:w-full lg:max-w-2xl">
        <svg
          class="absolute inset-y-0 right-8 hidden h-full w-80 translate-x-1/2 transform fill-white lg:block"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <polygon points="0,0 90,0 50,100 0,100" />
        </svg>

        <div class="relative px-6 py-32 sm:py-40 lg:px-8 lg:py-56 lg:pr-0">
          <div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
            <div class="hidden sm:mb-10 sm:flex">
              <div
                class="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-500 ring-1 ring-gray-900/10 hover:ring-gray-900/20"
              >
                Somos una cadena con precios imbatibles. <a
                  href="#"
                  class="whitespace-nowrap font-semibold text-indigo-600"
                  ><span class="absolute inset-0" aria-hidden="true" />Leer más
                  <span aria-hidden="true">&rarr;</span></a
                >
              </div>
            </div>
            <h1
              class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"
            >
              Capitan Market
            </h1>
            <p class="mt-6 text-lg leading-8 text-gray-600">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
              lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
              fugiat aliqua.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-gray-50 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
      <img
        class="aspect-[3/2] object-cover lg:aspect-auto lg:h-full lg:w-full"
        src="https://source.unsplash.com/39-6dSUrlyg"
        alt=""
      />
    </div>
  </div>
</div>
