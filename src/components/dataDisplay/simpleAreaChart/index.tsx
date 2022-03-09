import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Venta } from '../../../tipos/Venta';

type VentaPorHoras = {
    vendido: number,
    hora: number
}

const SimpleAreaChart = (props: { ventas: Venta[], xAxisName: string, yAxisName: string, }) => {
    const [data, setData] = useState();

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
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey={props.yAxisName} stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
        </ResponsiveContainer>
    );
}

export default SimpleAreaChart;