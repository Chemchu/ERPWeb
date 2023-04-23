<script lang="ts">
  import StatsCard from "./StatsCard.svelte";

  export let titulo: string = "Ultimos 30 dias";
  export let tituloCard1: string = "Ultimos 30 dias";
  export let tituloCard2: string = "Ultimos 30 dias";
  export let tituloCard3: string = "Ultimos 30 dias";
</script>

<div>
  <h3 class="text-base font-semibold leading-6 text-gray-900">
    {titulo}
  </h3>
  <dl
    class="mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-3 md:divide-x md:divide-y-0"
  >
    <StatsCard titulo={tituloCard1} />
    <StatsCard titulo={tituloCard2} />
    <StatsCard titulo={tituloCard3} />
  </dl>
</div>
