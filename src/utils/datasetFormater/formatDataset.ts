import { ChartData } from "chart.js";

const formatLineDataset = (data: number[], datasetName: string, labels?: string[]): ChartData<"line"> => ({
    labels: labels,
    datasets: [{
        label: datasetName,
        data: data,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "square",
        tension: 0.3,
    }]
});

export const formatPieDataset = (data: number[], datasetName: string, labels?: string[]): ChartData<"pie"> => ({
    labels: labels,
    datasets: [{
        label: datasetName,
        data: data,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
    }]
});

export const formatBarDataset = (data: number[], datasetName: string, labels?: string[]): ChartData<"bar"> => ({
    labels: labels,
    datasets: [{
        label: datasetName,
        data: data,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
    }]
});

export default formatLineDataset;