<script lang="ts">
  import { Line } from "svelte-chartjs";
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale,
    Filler,
  } from "chart.js";
  import type { Dataset } from "$lib/customTypes";

  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale,
    Filler
  );

  export let titulo = "Ventas";
  export let opacity = 0.75;
  export let dataset: Dataset = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    data: [65, 59, 80, 81, 56, 55, 40],
  };

  const data: any = {
    labels: dataset.labels,
    datasets: [
      {
        label: titulo,
        fill: true,
        lineTension: 0.3,
        backgroundColor: `rgb(74 222 128 / ${opacity})`,
        borderColor: `rgb(22 163 74 / ${opacity}`,
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgb(0, 0, 0)",
        pointBackgroundColor: "rgb(125, 125, 125)",
        pointBorderWidth: 3,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgb(251, 146, 60)",
        pointHoverBorderColor: "rgba(234, 88, 12, 1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: dataset.data,
      },
    ],
  };
</script>

<div class="bg-orange-400" />
<Line {data} options={{ responsive: true }} />
