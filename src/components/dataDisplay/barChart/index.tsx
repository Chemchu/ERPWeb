import { Bar } from "react-chartjs-2";
import formatLineDataset, { formatBarDataset } from "../../../utils/datasetFormater/formatDataset";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const BarChart = (props: { titulo: string, labels?: string[], data: number[] }) => {
    let delayed = false;
    const options = {
        indexAxis: 'y' as const,
        animation: {
            onComplete: () => {
                delayed = true;
            },
            delay: (context: any) => {
                let delay = 0;
                if (context.type === 'data' && context.mode === 'default' && !delayed) {
                    delay = context.dataIndex * 300 + context.datasetIndex * 100;
                }
                return delay;
            },
        },
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: props.titulo
            },
            legend: {
                display: false,
            }
        },

    };
    const data = formatBarDataset(props.data, props.titulo, props.labels);
    return (
        <div className="rounded-lg shadow-lg hover:shadow-xl p-2">
            <Bar data={data} options={options} />
        </div>
    )
}

export default BarChart;