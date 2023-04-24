<script lang="ts">
  import StatsCard from "./StatsCard.svelte";

  export let titulo: string = "Hoy";
  export let subtitulo: string = "ayer";
  export let tituloCard1: string = "Ventas";
  export let tituloCard2: string = "Efectivo";
  export let tituloCard3: string = "Tarjeta";
</script>

<div>
  <div class="flex flex-col">
    <h3 class="text-base font-semibold leading-6 text-gray-900">
      {titulo}
    </h3>
    <span class="text-sm font-thin text-gray-600">vs. {subtitulo}</span>
  </div>
  <dl
    class="mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-3 md:divide-x md:divide-y-0"
  >
    <StatsCard titulo={tituloCard1} simbolo="€" />
    <StatsCard titulo={tituloCard2} simbolo="€" />
    <StatsCard titulo={tituloCard3} simbolo="€" />
  </dl>
</div>
