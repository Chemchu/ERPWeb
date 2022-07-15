import React, { PureComponent, SVGAttributes } from 'react';
import { AreaChart as AChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { Color } from '../../../tipos/Enums/Color';
import { Summary } from '../../../tipos/Summary';

const VentasDelDia = (props: { data: Summary | undefined, titulo: string, ejeX: string, ejeY: string, nombreEjeX: string, color: Color, colorID: string }) => {
    const CustomTooltip = ({ active, payload, label, }: TooltipProps<ValueType, NameType>) => {
        const horaFinal = Number(String(label).substring(0, 2)) + 1

        if (active) {
            return (
                <div className="bg-white border border-blue-600 opacity-90 rounded-xl shadow-lg p-4 custom-tooltip">
                    <p className="label text-xl font-semibold">{`${label} - ${String(horaFinal) + ":00"}`}</p>
                    {
                        payload &&
                        <p className="label text-base">{`Ventas: ${Number(payload[0].value).toFixed(2)}€`}</p>
                    }
                </div>
            );
        }

        return null;
    };

    if (!props.data) {
        return (
            <div className='w-full rounded-xl border-x border-b shadow-xl hover:shadow-2xl p-4'>
                <div className="grid grid-cols-3 gap-4 animate-pulse">
                    <div className="h-24 bg-slate-200 rounded col-span-2"></div>
                    <div className="h-24 bg-slate-200 rounded col-span-1"></div>
                </div>
            </div>
        )
    }

    return (
        <div className='w-full rounded-xl border-x border-b shadow-xl hover:shadow-2xl'>
            <div className='flex justify-center py-4 font-semibold text-gray-600'>
                {props.titulo}
            </div>
            <div className='w-full h-full '>
                <ResponsiveContainer width="100%" height="100%" minHeight={250}>
                    <AChart data={props.data.ventasPorHora}
                        margin={{ top: 0, right: 30, left: 0, bottom: 10 }}>
                        <defs>
                            <linearGradient id={props.colorID} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={props.color} stopOpacity={0.9} />
                                <stop offset="95%" stopColor={props.color} stopOpacity={0.4} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey={props.ejeY} />
                        <YAxis dataKey={props.ejeX} />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip content={CustomTooltip} />
                        <Area type="monotone" dataKey={props.ejeX} name={props.nombreEjeX} stroke={props.color || "#8884d8"} fillOpacity={1} fill={`url(#${props.colorID})`} />
                    </AChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default VentasDelDia;