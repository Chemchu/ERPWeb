<script lang="ts">
  import EmployeeTable from "$lib/components/tables/EmployeeTable.svelte";
  import { fade } from "svelte/transition";
</script>

<div in:fade={{ delay: 500 }} out:fade>
  <EmployeeTable />
</div>
