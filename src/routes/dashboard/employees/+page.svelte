<script lang="ts">
  import EmployeeTable from "$lib/components/tables/EmployeeTable.svelte";
  import type { LayoutData } from "../$types";

  export let data: LayoutData;
</script>

<div>
  <EmployeeTable supabase={data.supabase} />
</div>
