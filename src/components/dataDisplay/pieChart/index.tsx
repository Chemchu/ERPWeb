import { Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    ArcElement
} from 'chart.js';
import { formatPieDataset } from "../../../utils/datasetFormater/formatDataset";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    ArcElement
);


const PieChart = (props: { titulo: string, labels?: string[], data: number[] }) => {
    const options = {
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
    const data = formatPieDataset(props.data, props.titulo, props.labels);

    return (
        <div className="rounded-lg shadow-lg hover:shadow-xl p-2 ">
            <Pie data={data} options={options} />
        </div>
    )
}

export default PieChart;