<script lang="ts">
  import StatsGroup from "$lib/components/stats/StatsGroup.svelte";
  import { fade } from "svelte/transition";
  import type { PageData } from "./$types";
  import AreaChart from "$lib/components/charts/AreaChart.svelte";

  export let data: PageData;
</script>

<div class="flex flex-col gap-8" in:fade={{ delay: 500 }} out:fade>
  <StatsGroup titulo="Hoy" subtitulo="ayer" />
  <StatsGroup titulo="Esta semana" subtitulo="la semana pasada" />
  <StatsGroup titulo="Este mes" subtitulo="el mes pasado" />

  <AreaChart />
</div>
