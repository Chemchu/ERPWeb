import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { TipoDocumento } from "../../../tipos/Enums/TipoDocumentos";
import { In } from "../../../utils/animations";
import { notifyError, notifyWarn } from "../../../utils/toastify";
import DateRange from "../../elementos/Forms/dateRange";
import { Backdrop } from "../backdrop";
import * as XLSX from "xlsx";
import { FetchVentasByDateRange } from "../../../utils/fetches/ventasFetches";
import { FetchCierresByQuery } from "../../../utils/fetches/cierresFetches";
import { CalcularBaseImponiblePorIva } from "../../../utils/typeCreator";

const DownloadFileModal = (props: { setModal: Function, tipoDocumento: TipoDocumento }) => {
    const [dateRange, setDateRange] = useState<Date[] | null[]>([null, null]);
    const [startDate, endDate] = dateRange;
    const [validDate, setValidDate] = useState<boolean>(false);
    const [data, setData] = useState<any[] | undefined>(undefined);
    const [isDownloading, setIsDownloading] = useState<boolean>(false);

    useEffect(() => {
        if (dateRange[0] == null) { setValidDate(false); return; }
        if (dateRange[0] > new Date()) { setValidDate(false); notifyWarn("No se puede exportar ventas de días futuros"); return; }
        if (dateRange[1] == null) { setValidDate(false); return; }

        setValidDate(true)
    }, [dateRange])

    useEffect(() => {
        if (!data) { return; }
        if (data.length <= 0) { return; }

        ExportData()
        setIsDownloading(false);
    }, [data])


    const DownloadData = async () => {
        if (startDate == null) { return; }
        if (endDate == null) { return; }
        setIsDownloading(true);

        if (props.tipoDocumento === TipoDocumento.Ventas) {
            const ventas = await FetchVentasByDateRange(startDate, endDate);

            const formattedData = ventas.map((v) => {
                const [baseImponible4, iva4] = CalcularBaseImponiblePorIva(v.productos, 4.00);
                const [baseImponible10, iva10] = CalcularBaseImponiblePorIva(v.productos, 10.00);
                const [baseImponible21, iva21] = CalcularBaseImponiblePorIva(v.productos, 21.00);

                return {
                    _id: v._id,
                    dineroEntregadoEfectivo: v.dineroEntregadoEfectivo.toFixed(2),
                    dineroEntregadoTarjeta: v.dineroEntregadoTarjeta.toFixed(2),
                    precioVentaTotal: v.precioVentaTotal.toFixed(2),
                    baseImponible4: baseImponible4.toFixed(2),
                    iva4: iva4.toFixed(2),
                    baseImponible10: baseImponible10.toFixed(2),
                    iva10: iva10.toFixed(2),
                    baseImponible21: baseImponible21.toFixed(2),
                    iva21: iva21.toFixed(2),
                    cambio: v.cambio.toFixed(2),
                    tipo: v.tipo,
                    fecha: new Date(Number(v.createdAt)).toLocaleString(),
                    descuentoEfectivo: v.descuentoEfectivo.toFixed(2),
                    descuentoPorcentaje: v.descuentoPorcentaje.toFixed(2)
                }
            })

            setData(formattedData);
            return;
        }
        if (props.tipoDocumento === TipoDocumento.Cierres) {
            const cierres = await FetchCierresByQuery(undefined, [String(startDate), String(endDate)])

            const formattedData = cierres.map((c) => {
                return {
                    _id: c._id,
                    cajaInicial: c.cajaInicial.toFixed(2),
                    ventasEfectivo: c.ventasEfectivo,
                    ventasTarjeta: c.ventasTarjeta,
                    ventasTotales: c.ventasTotales,
                    dineroEsperadoEnCaja: c.dineroEsperadoEnCaja,
                    dineroRealEnCaja: c.dineroRealEnCaja,
                    dineroRetirado: c.dineroRetirado,
                    fondoDeCaja: c.fondoDeCaja,
                    apertura: new Date(Number(c.apertura)).toLocaleString(),
                    cierre: new Date(Number(c.cierre)).toLocaleString(),
                }
            })

            setData(formattedData);
            return;
        }
    }

    const ExportData = () => {
        if (!data) { notifyError("No existen datos para las fechas seleccionadas"); return; }

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Hoja1");
        XLSX.writeFile(workbook, `${props.tipoDocumento}.xlsx`);
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="h-full w-full z-20">
            <Backdrop onClick={(e) => { e.stopPropagation(); props.setModal(false) }} >
                <motion.div className="h-2/6 w-3/6 m-auto p-4 flex flex-col gap-2 items-center justify-center bg-white rounded-2xl"
                    onClick={(e) => e.stopPropagation()}
                    variants={In}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <span className="text-xl w-full h-1/4 font-semibold">
                        Exportar {props.tipoDocumento.toLocaleLowerCase()}
                    </span>
                    <div className="flex flex-col gap-2 justify-center items-center h-full w-full">
                        <span>Seleccione un rango de fechas</span>
                        <DateRange dateRange={dateRange} setDateRange={setDateRange} endDate={endDate} startDate={startDate} />
                        <AnimatePresence>
                            {
                                isDownloading &&
                                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    className="text-xs italic">
                                    Si el rango de fechas abarca muchos días, la descarga puede tardar varios minutos
                                </motion.span>
                            }
                        </AnimatePresence>
                    </div>
                    <div className="flex gap-2 w-full h-1/3 justify-around items-end text-white">
                        <button className="w-1/2 h-12 rounded-xl bg-red-500 hover:bg-red-600 shadow-lg" onClick={() => { props.setModal(false) }}>
                            Cancelar
                        </button>
                        {
                            validDate ?
                                <button disabled={isDownloading} className={`${isDownloading ? "bg-blue-400" : "bg-blue-500 hover:bg-blue-600 "} w-1/2 h-12 rounded-xl shadow-lg`}
                                    onClick={DownloadData}>
                                    {isDownloading ? "Exportando..." : "Exportar"}
                                </button>
                                :
                                <button disabled className="w-1/2 h-12 rounded-xl bg-blue-400 shadow-lg">
                                    Fechas inválidas
                                </button>
                        }
                    </div>
                </motion.div>
            </Backdrop>
        </motion.div>
    );
}

export default DownloadFileModal;