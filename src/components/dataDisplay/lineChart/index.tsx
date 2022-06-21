import { Line } from "react-chartjs-2";
import formatDataset from "../../../utils/datasetFormater/formatDataset";
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
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            }
        },

    };
    const data = formatDataset(props.data, props.titulo, props.labels);

    return (
        <Line
            options={options}
            data={data}
        />
    )
}

export default LineChart;