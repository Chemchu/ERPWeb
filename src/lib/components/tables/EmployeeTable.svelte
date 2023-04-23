<script lang="ts">
  import type { Empleado } from "$lib/types/types";
  import type { SupabaseClient } from "@supabase/supabase-js";
  import { onMount } from "svelte";
  import defaultProfileIcon from "$lib/assets/profile.jpg";

  export let supabase: SupabaseClient;
  export let paginaSize: number = 10;
  export let pagina = 1;

  let empleados: Empleado[] = [];
  let empleadosIcons: Map<string, string> = new Map();

  $: {
    empleados.forEach(async (empleado) => {
      const res = await supabase.storage
        .from("avatars")
        .download(empleado.id + "/profile");

      empleadosIcons.set(
        empleado.id,
        res.data ? URL.createObjectURL(res.data) : defaultProfileIcon
      );
      empleadosIcons = empleadosIcons; // Infinite loop calling itself.
    });
  }

  const fetchEmpleados = async (): Promise<Empleado[]> => {
    const { data, error } = await supabase
      .from("empleados")
      .select("*")
      .range(pagina * paginaSize - paginaSize, pagina * paginaSize);

    if (error) {
      console.log(error);
      return [];
    }

    return data as Empleado[];
  };

  onMount(async () => {
    empleados = await fetchEmpleados();
    console.log(empleadosIcons);
  });
</script>

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
                      src={empleadosIcons.get(empleado.id)}
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
                <a
                  href={`/dashboard/employees/${empleado.email}`}
                  class="text-indigo-600 hover:text-indigo-900"
                  >Editar<span class="sr-only"
                    >, {empleado.nombre} {empleado.apellidos}</span
                  ></a
                >
              </td>
            </tr>
          </tbody>
        {/each}
      </table>
    </div>
  </div>
</div>
