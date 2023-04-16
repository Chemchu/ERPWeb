<script lang="ts">
  import { enhance } from "$app/forms";
  import SimpleCombobox from "$lib/components/combobox/SimpleCombobox.svelte";
  import { onMount } from "svelte";
  import type { ActionData } from "./$types";

  export let form: ActionData;

  $: console.log(form);

  let history: History;
  onMount(() => {
    history = window.history;
  });

  function goBack() {
    history.go(-1);
  }
</script>

<div class="relative mx-auto">
  <h1 class="sr-only">Order information</h1>
  <div class="flex w-full pb-8">
    <h2
      id="contact-info-heading"
      class="text-lg font-semibold leading-6 text-gray-900 w-full"
    >
      Creando un nuevo empleado
    </h2>
    <button
      class="self-start text-gray-500 hover:text-gray-600"
      on:click={goBack}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
        />
      </svg>
    </button>
  </div>
  <form
    class="px-2 pb-16 pt-4 sm:px-6 lg:px-0 lg:pb-10 lg:pt-0 w-full"
    method="post"
    action="?/createEmployee"
    use:enhance
  >
    <div class="mx-auto max-w-lg lg:max-w-none">
      <section aria-labelledby="payment-heading">
        <h2 id="payment-heading" class="text-lg font-medium text-gray-900">
          Información personal
        </h2>

        <div class="mt-6 grid grid-cols-2 gap-x-4 gap-y-6">
          <div class="col-span-2">
            <label
              for="name-on-card"
              class="block text-sm font-medium text-gray-700">Nombre</label
            >
            <div class="mt-1">
              <input
                type="text"
                id="nombre"
                name="nombre"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div class="col-span-2">
            <label
              for="apellidos"
              class="block text-sm font-medium text-gray-700">Apellidos</label
            >
            <div class="mt-1">
              <input
                type="text"
                id="apellidos"
                name="apellidos"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div class="col-span-2">
            <label for="email" class="block text-sm font-medium text-gray-700"
              >Correo electronico
            </label>
            <div class="mt-1">
              <input
                type="email"
                id="email"
                name="email"
                autocomplete="email"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label for="city" class="block text-sm font-medium text-gray-700"
              >Rol</label
            >
            <SimpleCombobox
              id="rol"
              name="rol"
              items={["Cajero", "Gerente", "Administrador"]}
            />
          </div>

          <div>
            <label for="dni" class="block text-sm font-medium text-gray-700"
              >DNI / NIE</label
            >
            <div class="mt-1">
              <input
                type="text"
                id="dni"
                name="dni"
                autocomplete="address-level1"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
      </section>

      <div
        class="mt-10 border-t border-gray-200 pt-6 sm:flex sm:items-center sm:justify-between"
      >
        <button
          type="submit"
          class="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:order-last sm:ml-6 sm:w-auto"
          >Crear empleado</button
        >
        <p class="mt-4 text-center text-sm text-gray-500 sm:mt-0 sm:text-left">
          El empleado necesita confirmar su cuenta de correo electronico.
        </p>
      </div>
    </div>
  </form>
</div>
