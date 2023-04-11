<script lang="ts">
  import EmployeeTable from "$lib/components/tables/EmployeeTable.svelte";
  import type { LayoutData } from "../$types";

  export let data: LayoutData;
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
  <EmployeeTable supabase={data.supabase} />
</div>
