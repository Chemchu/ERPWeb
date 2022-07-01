import React, { PureComponent, SVGAttributes } from 'react';
import { AreaChart as AChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { Color } from '../../../tipos/Enums/Color';
import { Summary } from '../../../tipos/Summary';


const VentasDelDia = (props: { data: Summary | undefined, titulo: string, ejeX: string, ejeY: string, nombreEjeX: string, color: Color }) => {
    const CustomTooltip = ({ active, payload, label, }: TooltipProps<ValueType, NameType>) => {
        if (active) {
            return (
                <div className="bg-white border border-blue-600 opacity-90 rounded-xl shadow-lg p-4 custom-tooltip">
                    <p className="label text-xl">{`Hora ${label}`}</p>
                    {
                        payload &&
                        <p className="label text-base">{`Ventas: ${payload[0].value}€`}</p>
                    }
                </div>
            );
        }

        return null;
    };

    if (!props.data) {
        return (
            <div className='w-full rounded-xl border-x border-b shadow-xl hover:shadow-2xl animate-pulse'>
                <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                <div className="flex-1 space-y-6 py-1">
                    <div className="h-2 bg-slate-200 rounded"></div>
                    <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                            <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                        </div>
                        <div className="h-2 bg-slate-200 rounded"></div>
                    </div>
                </div>
            </div>
        )
    }

    if (props.data.ventasPorHora.length <= 0) {
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
                        margin={{ top: 0, right: 30, left: -20, bottom: 10 }}>
                        <defs>
                            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={props.color || "#FE410F"} stopOpacity={0.9} />
                                <stop offset="95%" stopColor={props.color || "#FE410F"} stopOpacity={0.1} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey={props.ejeY} />
                        <YAxis dataKey={props.ejeX} />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip content={CustomTooltip} />
                        <Area type="monotone" dataKey={props.ejeX} name={props.nombreEjeX} stroke="#8884d8" fillOpacity={1} fill="url(#color)" />
                    </AChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default VentasDelDia;