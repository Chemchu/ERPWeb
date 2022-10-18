import { useEffect, useState } from "react";
import { ResponsiveContainer, BarChart, Bar, Cell, CartesianGrid, XAxis, YAxis, Tooltip, Legend, TooltipProps } from "recharts";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";
import { FamiliaMasVendido as FamiliaMasVendida } from "../../../tipos/Summary";

const FamiliasMasVendidasStats = (props: { titulo: string, data: FamiliaMasVendida[] }) => {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [activeItem, setActiveItem] = useState<FamiliaMasVendida>(props.data[0])

    useEffect(() => {
        setActiveItem(props.data[activeIndex])
    }, [activeIndex])

    const handleClick = (data: any, index: number) => {
        setActiveIndex(index);
    };

    const CustomTooltip = ({ active, payload, label, }: TooltipProps<ValueType, NameType>) => {
        if (active) {
            return (
                <div className="bg-white border border-blue-600 opacity-90 rounded-xl shadow-lg p-4 custom-tooltip">
                    {
                        payload &&
                        <>
                            <p className="label text-xl font-semibold">{`${payload[0].payload.familia}`}</p>
                            <p className="label text-base">{`Cantidad vendida: ${label} unidades`}</p>
                        </>
                    }
                </div>
            );
        }

        return null;
    };

    return (
        <div className="w-full h-full rounded-lg shadow p-4 text-center">
            <p className="font-semibold">{props.titulo}</p>
            <ResponsiveContainer width="100%" height={250}>
                <BarChart
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    data={props.data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="cantidadVendida" />
                    <YAxis />
                    <Tooltip content={CustomTooltip} />
                    <Bar name="Cantidad vendida" dataKey="cantidadVendida" onClick={handleClick}>
                        {props.data.map((familia, index) => (
                            <Cell cursor="pointer" fill={index === activeIndex ? '#82ca9d' : '#8884d8'} key={`cell-${index}`} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
            {
                activeItem &&
                <div className="border-2 rounded-md border-blue-400">
                    <p className="flex w-full h-full justify-around">
                        <span className="w-full border-b-2 border-r-2 border-blue-400">Familia</span>
                        <span className="w-full border-b-2 border-blue-400">{`${activeItem.familia}`}</span>
                    </p>
                    <p className="flex w-full h-full justify-around">
                        <span className="w-full border-r-2 border-blue-400">Cantidad vendida</span>
                        <span className="w-full border-blue-400">{`${activeItem.cantidadVendida} ${activeItem.cantidadVendida === 1 ? "unidad" : "unidades"} `}</span>
                    </p>
                </div>
            }
        </div>
    )
}

export default FamiliasMasVendidasStats;