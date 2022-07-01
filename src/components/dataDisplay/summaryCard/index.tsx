import { Summary } from "../../../tipos/Summary";
import SkeletonCard from "../../Skeletons/skeletonCard";

const SummaryCard = (props: { titulo: string, data: Summary | undefined }) => {
    // Incremento porcentual: ((valorFinal - valorInicial) / valorInicial ) * 100

    if (!props.data) {
        return (
            <div className="w-full border rounded-xl mx-auto">
                <div className="flex animate-pulse items-center h-full px-6 py-3 gap-10">
                    <div className="bg-gray-300 w-8 h-8 rounded-lg" />
                    <div className="w-full h-8 bg-gray-300 rounded-lg" />
                </div>
            </div>
        )
    }

    return (
        <div className="md:p-6 p-4 bg-white shadow-lg hover:shadow-xl rounded-lg flex justify-between dark:bg-gray-800 md:items-center md:flex-row flex-col gap-12">
            <div className="flex justify-between w-full">
                <div>
                    <span className="text-bold text-gray-700 dark:text-gray-400 block">
                        {props.titulo}
                    </span>
                    <span className="text-black text-4xl md:text-5xl mt-2 font-black block">
                        {(props.data.totalVentas).toFixed(2)}
                        <span className="text-xl">
                            €
                        </span>
                    </span>
                </div>
                <div>
                    <span className="text-left md:block">
                        Efectivo
                    </span>
                    <span className="text-black text-4xl md:text-5xl mt-2 font-black block">
                        {(props.data.totalEfectivo).toFixed(2)}
                        <span className="text-xl">
                            €
                        </span>
                    </span>
                </div>
                <div>
                    <span className="text-left md:block">
                        Tarjeta
                    </span>
                    <span className="text-black text-4xl md:text-5xl mt-2 font-black block">
                        {(props.data.totalTarjeta).toFixed(2)}
                        <span className="text-xl">
                            €
                        </span>
                    </span>
                </div>
            </div>
        </div>

    )
}

export default SummaryCard;