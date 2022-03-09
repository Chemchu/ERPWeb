import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Venta } from '../../../tipos/Venta';

type VentaPorHoras = {
    vendido: number,
    hora: number
}

const AreaChartWithNegatives = (props: { ventas: Venta[], xAxisName: string, yAxisName: string, }) => {
    const [data, setData] = useState<VentaPorHoras[]>();

    useEffect(() => {
        const ventasHora: VentaPorHoras[] = [];

        props.ventas.map((elemento) => {
            const v: VentaPorHoras = { vendido: elemento.precioVentaTotal, hora: new Date(elemento.createdAt).getHours() }

            ventasHora.push(v);
        })

        setData(ventasHora);
    }, [])


    const gradientOffset = (data: any) => {
        const dataMax = Math.max(...data.map((i: any) => i.uv));
        const dataMin = Math.min(...data.map((i: any) => i.uv));

        if (dataMax <= 0) {
            return 0;
        }
        if (dataMin >= 0) {
            return 1;
        }

        return dataMax / (dataMax - dataMin);
    };

    const off = gradientOffset(data);

    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart
                width={500}
                height={400}
                data={data}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={props.xAxisName} name={props.xAxisName} />
                <YAxis dataKey={props.yAxisName} name={props.yAxisName} />
                <Tooltip />
                <defs>
                    <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                        <stop offset={off} stopColor="green" stopOpacity={1} />
                        <stop offset={off} stopColor="red" stopOpacity={1} />
                    </linearGradient>
                </defs>
                <Area type="monotone" dataKey={props.yAxisName} stroke="#000" fill="url(#splitColor)" />
            </AreaChart>
        </ResponsiveContainer>
    );
}

export default AreaChartWithNegatives;