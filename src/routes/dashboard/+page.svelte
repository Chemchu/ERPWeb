<script lang="ts">
  import StatsGroup from "$lib/components/stats/StatsGroup.svelte";
  import { fade } from "svelte/transition";
  import AreaChart from "$lib/components/charts/AreaChart.svelte";
</script>

<div class="flex flex-col gap-8" in:fade={{ delay: 500 }} out:fade>
  <StatsGroup titulo="Hoy" subtitulo="ayer" />
  <StatsGroup titulo="Esta semana" subtitulo="la semana pasada" />
  <StatsGroup titulo="Este mes" subtitulo="el mes pasado" />

  <AreaChart />
</div>
