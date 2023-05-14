<script lang="ts">
  import type { Empleado } from "$lib/types/types";
  import { onDestroy, onMount } from "svelte";
  import defaultProfileIcon from "$lib/assets/profile.jpg";

  export let data: any;
  let empleados: { empleado: Empleado; icono: string }[] = [];

  onMount(async () => {
    const empData: { empleado: Empleado; icono: string | null }[] = await data
      .body.empleados;
    for (let index = 0; index < empData.length; index++) {
      const emp = empData[index];
      if (!emp.icono) {
        empleados.push({
          empleado: emp.empleado,
          icono: defaultProfileIcon,
        });
        continue;
      }
      const blob = new Blob([new Uint8Array(JSON.parse(emp.icono)).buffer], {
        type: "image/jpeg",
      });
      empleados.push({
        empleado: emp.empleado,
        icono: URL.createObjectURL(blob),
      });
    }
    empleados = [...empleados];
  });

  onDestroy(() => {
    empleados.forEach((emp) => {
      if (emp.icono !== defaultProfileIcon) {
        URL.revokeObjectURL(emp.icono);
      }
    });
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
        {#each empleados as empleadoData}
          <tbody class="divide-y divide-gray-200 bg-white">
            <tr>
              <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">
                <div class="flex items-center">
                  <div class="h-10 w-10 flex-shrink-0">
                    <img
                      class="h-10 w-10 rounded-full"
                      src={empleadoData.icono}
                      alt="Profile icon for {empleadoData.empleado
                        .nombre} {empleadoData.empleado.apellidos}"
                    />
                  </div>
                  <div class="ml-4">
                    <div class="font-medium text-gray-900">
                      {empleadoData.empleado.nombre}
                    </div>
                    <div class="text-gray-500">
                      {empleadoData.empleado.email}
                    </div>
                  </div>
                </div>
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                <div class="text-gray-900">{empleadoData.empleado.dni}</div>
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                >{empleadoData.empleado.rol}</td
              >
              <td
                class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0"
              >
                <a
                  href={`/dashboard/employees/${empleadoData.empleado.email}`}
                  class="text-indigo-600 hover:text-indigo-900"
                  >Editar<span class="sr-only"
                    >, {empleadoData.empleado.nombre}
                    {empleadoData.empleado.apellidos}</span
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
