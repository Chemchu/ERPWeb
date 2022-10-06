import { useEffect, useState } from "react";
import { VictoryBar, VictoryChart } from "victory";
import { ProductoMasVendido } from "../../../tipos/Summary";

const ProductosMasVendidosStats = (props: { titulo: string, data: ProductoMasVendido[] }) => {
    const [productosXY, setVentasXY] = useState<{ x: string | number, y: number }[]>([])

    useEffect(() => {
        if (props.data) {
            setVentasXY(props.data.map((p, i) => {
                return {
                    x: i,
                    y: p.cantidadVendida
                }
            }))
        }
    }, [props.data])


    return (
        <div className="w-full h-full rounded-lg shadow p-4 text-center">
            <p className="font-semibold">{props.titulo}</p>
            {/* <ResponsiveContainer width="100%" height={250}>
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
                        {props.data.map((producto, index) => (
                            <Cell cursor="pointer" fill={index === activeIndex ? '#82ca9d' : '#8884d8'} key={`cell-${index}`} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer> */}
            <VictoryChart
                domainPadding={{ x: 10 }}>
                <VictoryBar
                    style={{ data: { fill: "#8884d8" } }}
                    data={productosXY}
                />
            </VictoryChart>
            {/* {
                activeItem &&
                <div className="border-2 rounded-md border-blue-400">
                    <p className="flex w-full h-full justify-around">
                        <span className="w-full border-b-2 border-r-2 border-blue-400">Producto</span>
                        <span className="w-full border-b-2 border-blue-400">{`${activeItem.nombre}`}</span>
                    </p>
                    <p className="flex w-full h-full justify-around">
                        <span className="w-full border-b-2 border-r-2 border-blue-400">Cantidad vendida</span>
                        <span className="w-full border-b-2 border-blue-400">{`${activeItem.cantidadVendida} ${activeItem.cantidadVendida === 1 ? "unidad" : "unidades"} `}</span>
                    </p>
                    <p className="flex w-full h-full justify-around">
                        <span className="w-full border-r-2 border-blue-400">Familia</span>
                        <span className="w-full border-blue-400">{`${activeItem.familia}`}</span>
                    </p>
                </div>
            } */}
        </div>
    )
}

export default ProductosMasVendidosStats;