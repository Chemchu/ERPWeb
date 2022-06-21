import { ChartData } from "chart.js";

const formatDataset = (data: number[], datasetName: string, labels?: string[]): ChartData<"line"> => ({
    labels: labels,
    datasets: [{
        label: datasetName,
        data: data,
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "square",
        tension: 0.3,
    }]
});

export default formatDataset;