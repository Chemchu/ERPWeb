<script lang="ts">
  import type { Empleado } from "$lib/types/types";
  import type { SupabaseClient } from "@supabase/supabase-js";
  import { onMount } from "svelte";

  export let supabase: SupabaseClient;

  let empleados: Empleado[] = [];

  const fetchEmpleados = async (): Promise<Empleado[]> => {
    const { data, error } = await supabase.from("empleados").select("*");
    if (error) {
      console.log(error);
      return [];
    }

    return data as Empleado[];
  };

  onMount(async () => {
    empleados = await fetchEmpleados();
  });
</script>

<div>
  <div class="sm:flex sm:items-center">
    <div class="sm:flex-auto">
      <h1 class="text-lg font-semibold leading-6 text-gray-900">Empleados</h1>
      <p class="mt-2 text-sm text-gray-700">
        Una lista con todos los empleados incluyendo sus nombres, roles y
        correos electronicos
      </p>
    </div>
    <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
      <a
        href="/dashboard/employees/new-employee"
        class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >Agregar empleado</a
      >
      <!-- <button
        type="button"
        class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >Agregar empleado</button
      > -->
    </div>
  </div>
  <div class="mt-8 flow-root">
    <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
        <table class="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th
                scope="col"
                class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                >Nombre</th
              >
              <th
                scope="col"
                class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >DNI</th
              >
              <th
                scope="col"
                class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >Rol</th
              >
              <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
                <span class="sr-only">Editar</span>
              </th>
            </tr>
          </thead>
          {#each empleados as empleado}
            <tbody class="divide-y divide-gray-200 bg-white">
              <tr>
                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">
                  <div class="flex items-center">
                    <div class="h-10 w-10 flex-shrink-0">
                      <img
                        class="h-10 w-10 rounded-full"
                        src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </div>
                    <div class="ml-4">
                      <div class="font-medium text-gray-900">
                        {empleado.nombre}
                      </div>
                      <div class="text-gray-500">
                        {empleado.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <div class="text-gray-900">{empleado.dni}</div>
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                  >{empleado.rol}</td
                >
                <td
                  class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0"
                >
                  <a href="#" class="text-indigo-600 hover:text-indigo-900"
                    >Editar<span class="sr-only">, Lindsay Walton</span></a
                  >
                </td>
              </tr>

              <!-- More people... -->
            </tbody>
          {/each}
        </table>
      </div>
    </div>
  </div>
</div>
