import React, { useEffect, useState } from 'react';
import { VictoryBrushContainer, VictoryChart, VictoryTheme } from 'victory';
import { VictoryArea } from 'victory-area';
import { Color } from '../../../tipos/Enums/Color';
import { Summary } from '../../../tipos/Summary';

const VentasDelDia = (props: { data: Summary | undefined, titulo: string, ejeX: string, ejeY: string, nombreEjeX: string, color: Color, colorID: string }) => {
    const [ventasXY, setVentasXY] = useState<{ x: string | number, y: number }[]>([])
    const offset = (new Date().getTimezoneOffset() / 60) * -1

    useEffect(() => {
        if (props.data?.ventasPorHora) {
            const ventas = props.data.ventasPorHora.map((venta) => {
                const localHora = Number(String(venta.hora).substring(0, 2)) + offset
                venta.hora = localHora + ":00"
                return venta
            });

            setVentasXY(ventas.map((v, i) => {
                return {
                    x: v.hora,
                    y: v.totalVentaHora
                }
            }))
        }
    }, [props.data])

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
            <div className='w-full h-full'>
                <svg style={{ height: 0 }}>
                    <defs>
                        <linearGradient id="myGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#86EFAC" />
                            <stop offset="100%" stopColor="#16A34A" />
                        </linearGradient>
                    </defs>
                </svg>
                <VictoryChart maxDomain={{ y: props.data.totalVentas <= 0 ? 100 : undefined }}
                    containerComponent={
                        <VictoryBrushContainer
                            brushDimension="x"
                            brushDomain={{ x: [0.1, 0.3] }}
                            handleComponent={
                                <div className='w-full h-full bg-white rounded-xl'>
                                    Ey
                                </div>
                            }
                        />}
                >
                    <VictoryArea
                        interpolation={'natural'}
                        labels={({ datum }) => datum.y <= 0 ? '' : `${Number(datum.y).toFixed(2)}€`}
                        style={{ data: { fill: `url(#myGradient)`, opacity: 0.9 }, labels: { fontSize: 11 } }}
                        data={ventasXY}
                        animate={{
                            duration: 1000
                        }}
                    />
                </VictoryChart>
            </div>
        </div>
    )
}

export default VentasDelDia;