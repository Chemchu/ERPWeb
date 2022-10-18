import { useEffect, useState } from "react";
import { Summary } from "../../../tipos/Summary";

const SummaryCard = (props: { titulo: string, data: Summary | undefined }) => {
    const [totalMañana, setTotalMañana] = useState<number>(0)
    const [totalTarde, setTotalTarde] = useState<number>(0)
    const [totalMañanaEfectivo, setTotalMañanaEfectivo] = useState<number>(0)
    const [totalTardeEfectivo, setTotalTardeEfectivo] = useState<number>(0)
    const [totalMañanaTarjeta, setTotalMañanaTarjeta] = useState<number>(0)
    const [totalTardeTarjeta, setTotalTardeTarjeta] = useState<number>(0)

    useEffect(() => {
        if (!props.data) { return }

        let tMañana = 0
        let tMañanaEfectivo = 0
        let tMañanaTarjeta = 0

        let tTarde = 0
        let tTardeEfectivo = 0
        let tTardeTarjeta = 0
        props.data.ventasPorHora.forEach((venta) => {
            let hora = venta.hora
            if (hora.length <= 4) {
                hora = venta.hora.substring(0, 1)
            }
            else {
                hora = venta.hora.substring(0, 2)
            }

            const offsetUTC = (new Date().getTimezoneOffset() / 60) * -1
            const inicioTurnoTarde = 16
            if (Number(hora) < inicioTurnoTarde - offsetUTC) {
                tMañana += venta.totalVentaHora
                tMañanaEfectivo += venta.totalEfectivoHora
                tMañanaTarjeta += venta.totalTarjetaHora
            }
            else {
                tTarde += venta.totalVentaHora
                tTardeEfectivo += venta.totalEfectivoHora
                tTardeTarjeta += venta.totalTarjetaHora
            }
        })

        setTotalMañana(tMañana)
        setTotalTarde(tTarde)
        setTotalMañanaEfectivo(tMañanaEfectivo)
        setTotalMañanaTarjeta(tMañanaTarjeta)
        setTotalTardeEfectivo(tTardeEfectivo)
        setTotalTardeTarjeta(tTardeTarjeta)
    }, [props.data])

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
        <div className="md:p-6 p-4 bg-white shadow-lg hover:shadow-xl rounded-lg flex justify-between dark:bg-gray-800 md:items-center gap-4">
            <div className="flex flex-col">
                <span className="text-2xl text-gray-700 font-semibold pb-2">Total</span>
                <span>Ventas: {props.data.totalVentas.toFixed(2)}€</span>
                <span>Efectivo: {props.data.totalEfectivo.toFixed(2)}€</span>
                <span>Tarjeta: {props.data.totalTarjeta.toFixed(2)}€</span>
            </div>
            <div className="flex flex-col">
                <span className="text-2xl text-gray-700 font-semibold pb-2">Mañana</span>
                <span>Ventas: {totalMañana.toFixed(2)}€</span>
                <span>Efectivo: {totalMañanaEfectivo.toFixed(2)}€</span>
                <span>Tarjeta: {totalMañanaTarjeta.toFixed(2)}€</span>
            </div>
            <div className="flex flex-col">
                <span className="text-2xl text-gray-700 font-semibold pb-2">Tarde</span>
                <span>Ventas: {totalTarde.toFixed(2)}€</span>
                <span>Efectivo: {totalTardeEfectivo.toFixed(2)}€</span>
                <span>Tarjeta: {totalTardeTarjeta.toFixed(2)}€</span>
            </div>
        </div>

    )
}

export default SummaryCard;