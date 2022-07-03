import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import useEmpleadoContext from "../../../../context/empleadoContext";
import { Empleado } from "../../../../tipos/Empleado";
import { Roles } from "../../../../tipos/Enums/Roles";
import { Summary } from "../../../../tipos/Summary";
import AuthorizationWrapper from "../../../authorizationWrapper";
import FinanceCard from "../../../dataDisplay/finaceCard";
import { FetchResumenDiario } from "../../../../utils/fetches/analisisFetches";
import VentasDelDia from "../../../dataDisplay/ventasDelDia";
import { Color } from "../../../../tipos/Enums/Color";
import SimpleListBox from "../../../elementos/Forms/simpleListBox";

const EstadisticasVentasPage = () => {
    const [summaryToday, setSummaryToday] = useState<Summary | undefined>(undefined);
    const [summaryYesterday, setSummaryYesterday] = useState<Summary | undefined>(undefined);
    const [timeRange, setTimeRange] = useState<string>("")

    useEffect(() => {
        const GetSummaryData = async () => {
            const hoy = new Date()
            const ayer = new Date();
            ayer.setDate(ayer.getDate() - 1);

            setSummaryToday(await FetchResumenDiario(hoy))
            setSummaryYesterday(await FetchResumenDiario(ayer))
        }
        GetSummaryData()
    }, [])

    return (
        <div className="flex flex-col gap-4 h-full w-full bg-white rounded-b-2xl rounded-r-2xl p-4 shadow-lg border-x overflow-y-scroll">
            <div id="filtros" className="flex justify-end w-full z-20 ">
                <div className="w-40">
                    <SimpleListBox elementos={["Hoy", "Última semana", "Último mes", "Último año"]} setElemento={setTimeRange} defaultValue={"Hoy"} />
                </div>
            </div>
            <div className="flex flex-wrap gap-2 justify-between">
                <div className="xl:w-72 w-40">
                    <FinanceCard titulo="Ventas" dataActual={summaryToday?.totalVentas.toFixed(2)} dataPrevio={summaryYesterday?.totalVentas.toFixed(2)} />
                </div>
                <div className="xl:w-72 w-40">
                    <FinanceCard titulo="Efectivo" unidad="€" dataActual={summaryToday?.totalEfectivo.toFixed(2)} dataPrevio={summaryYesterday?.totalEfectivo.toFixed(2)} />
                </div>
                <div className="xl:w-72 w-40">
                    <FinanceCard titulo="Tarjeta" unidad="€" dataActual={summaryToday?.totalTarjeta.toFixed(2)} dataPrevio={summaryYesterday?.totalTarjeta.toFixed(2)} />
                </div>
                <div className="xl:w-72 w-40">
                    <FinanceCard titulo="Tickets" unidad="uds" dataActual={String(summaryToday?.numVentas)} dataPrevio={String(summaryYesterday?.numVentas)} />
                </div>
                <div className="xl:w-72 w-40">
                    <FinanceCard titulo="Beneficio" dataActual={summaryToday?.beneficio.toFixed(2)} dataPrevio={summaryYesterday?.beneficio.toFixed(2)} />
                </div>
                <div className="xl:w-72 w-40">
                    <FinanceCard titulo="IVA" dataActual={summaryToday?.ivaPagado.toFixed(2)} dataPrevio={summaryYesterday?.ivaPagado.toFixed(2)} />
                </div>
                <div className="xl:w-72 w-40">
                    <FinanceCard titulo="Cantidad" unidad="uds" dataActual={String(summaryToday?.cantidadProductosVendidos)} dataPrevio={String(summaryYesterday?.cantidadProductosVendidos)} />
                </div>
                <div className="xl:w-72 w-40">
                    <FinanceCard titulo="Descuentos" unidad="€" dataActual={summaryToday?.dineroDescontado.toFixed(2)} dataPrevio={summaryYesterday?.dineroDescontado.toFixed(2)} />
                </div>
            </div>
            <div className="flex w-full justify-between gap-4">
                <div className="w-1/2 h-full">
                    <VentasDelDia data={summaryToday} titulo="Ventas de hoy" ejeX="totalVentaHora" ejeY="hora" nombreEjeX="Vendido" color={Color.GREEN} colorID={"verde"} />
                </div>
                <div className="w-1/2 h-full">
                    <VentasDelDia data={summaryYesterday} titulo="Ventas de ayer" ejeX="totalVentaHora" ejeY="hora" nombreEjeX="Vendido" color={Color.BLUE} colorID={"azul"} />
                </div>
            </div>
            <AnimatePresence>
                {/* {showModal && <AddEmpleado showModal={setModal} />} */}
            </AnimatePresence>
        </div>
    );
}


export default AuthorizationWrapper([Roles.Administrador, Roles.Gerente], true)(EstadisticasVentasPage);