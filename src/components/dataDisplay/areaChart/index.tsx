import React, { PureComponent } from 'react';
import { AreaChart as AChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Summary, VentasPorHora } from '../../../tipos/Summary';


const data = [
    {
        "name": "Page A",
        "uv": 4000,
        "pv": 2400,
        "amt": 2400
    },
    {
        "name": "Page B",
        "uv": 3000,
        "pv": 1398,
        "amt": 2210
    },
    {
        "name": "Page C",
        "uv": 2000,
        "pv": 9800,
        "amt": 2290
    },
    {
        "name": "Page D",
        "uv": 2780,
        "pv": 3908,
        "amt": 2000
    },
    {
        "name": "Page E",
        "uv": 1890,
        "pv": 4800,
        "amt": 2181
    },
    {
        "name": "Page F",
        "uv": 2390,
        "pv": 3800,
        "amt": 2500
    },
    {
        "name": "Page G",
        "uv": 3490,
        "pv": 4300,
        "amt": 2100
    }
]

const data1: VentasPorHora[] = [
    {
        hora: "09",
        beneficioHora: 10,
        dineroDescontadoHora: 10,
        productosVendidosHora: 10,
        totalEfectivoHora: 10,
        totalTarjetaHora: 10,
        totalVentaHora: 20
    },
    {
        hora: "10",
        beneficioHora: 5,
        dineroDescontadoHora: 15,
        productosVendidosHora: 15,
        totalEfectivoHora: 15,
        totalTarjetaHora: 15,
        totalVentaHora: 30
    },
    {
        hora: "11",
        beneficioHora: 5,
        dineroDescontadoHora: 15,
        productosVendidosHora: 15,
        totalEfectivoHora: 15,
        totalTarjetaHora: 15,
        totalVentaHora: 9
    },
    {
        hora: "12",
        beneficioHora: 5,
        dineroDescontadoHora: 15,
        productosVendidosHora: 15,
        totalEfectivoHora: 15,
        totalTarjetaHora: 15,
        totalVentaHora: 45
    }
]

const AreaChart = (props: { data?: VentasPorHora }) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <AChart data={data1}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis dataKey="hora" />
                <YAxis dataKey="totalVentaHora" />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area type="monotone" dataKey="totalVentaHora" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
            </AChart>
        </ResponsiveContainer>
    )
}

export default AreaChart;