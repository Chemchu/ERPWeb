import { Line } from "react-chartjs-2";
import formatLineDataset from "../../../utils/datasetFormater/formatDataset";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const LineChart = (props: { titulo: string, labels?: string[], data: number[] }) => {
    let delayed = false;
    const options = {
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
    const data = formatLineDataset(props.data, props.titulo, props.labels);

    return (
        <div className="rounded-lg shadow-lg hover:shadow-xl p-2 ">
            <Line
                options={options}
                data={data}
            />
        </div>
    )
}

export default LineChart;