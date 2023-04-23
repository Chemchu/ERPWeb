<script lang="ts">
  import StatsGroup from "$lib/components/stats/StatsGroup.svelte";
  import { fade } from "svelte/transition";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<div in:fade={{ delay: 500 }} out:fade>
  <StatsGroup titulo="Ultimos 30 dias" />
</div>
