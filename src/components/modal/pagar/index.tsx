import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import useEmpleadoContext from "../../../context/empleadoContext";
import useProductEnCarritoContext from "../../../context/productosEnCarritoContext";
import { Cliente } from "../../../tipos/Cliente";
import { CustomerPaymentInformation } from "../../../tipos/CustomerPayment";
import { TipoCobro } from "../../../tipos/Enums/TipoCobro";
import { CalcularCambio } from "../../../utils/preciosUtils";
import { ValidatePositiveFloatingNumber } from "../../../utils/validator";
import Dropdown from "../../elementos/Forms/dropdown";
import { InputNumber } from "../../elementos/Forms/input/inputDinero";
import Ticket from "../../printable/ticket";
import { Backdrop } from "../backdrop";
import { notifyError, notifySuccess, notifyWarn } from "../../../utils/toastify";
import GenerateQrBase64 from "../../../utils/generateQr";
import { In } from "../../../utils/animations";
import { FetchClientes } from "../../../utils/fetches/clienteFetches";
import { AddVenta, FetchVentaByQuery } from "../../../utils/fetches/ventasFetches";
import { Venta } from "../../../tipos/Venta";

export const ModalPagar = (props: { PagoCliente: CustomerPaymentInformation, handleModalOpen: Function, AllClientes?: Cliente[], inputRef: any }) => {
    const [dineroEntregado, setDineroEntregado] = useState<string>("0");
    const [dineroEntregadoTarjeta, setDineroEntregadoTarjeta] = useState<string>("0");
    const [cambio, setCambio] = useState<number>(props.PagoCliente.cambio);
    const { Empleado } = useEmpleadoContext();

    const [Clientes, SetClientes] = useState<Cliente[]>([]);
    const [ClienteActual, SetClienteActual] = useState<Cliente>(props.PagoCliente.cliente);
    const [NombreClienteActual, SetNombreClienteActual] = useState<string>("General");
    const [PagoDelCliente, SetPagoCliente] = useState<CustomerPaymentInformation>(props.PagoCliente);
    const [qrImage, setQrImage] = useState<any>();
    const [VentaResultante, setVenta] = useState<Venta>();

    const { ProductosEnCarrito, SetProductosEnCarrito, SetDtoEfectivo, SetDtoPorcentaje } = useProductEnCarritoContext();
    const [serverUp, setServerStatus] = useState<boolean>(false);
    const [isButtonDisabled, setButtonDisabled] = useState<boolean>(false);

    const componentRef = useRef(null);

    useEffect(() => {
        let isUnmounted = false;
        if (props.AllClientes) {
            SetClientes(props.AllClientes);
            setServerStatus(true);
        }
        else {
            FetchClientes().then((r) => {
                if (!isUnmounted) {
                    SetClientes(r)
                    setServerStatus(true);
                }
            }).catch(() => {
                setServerStatus(false);
            });
        }

        return () => {
            isUnmounted = true;
        }
    }, []);

    useEffect(() => {
        if (qrImage) {
            handlePrint();
        }
    }, [qrImage]);

    useEffect(() => {
        const cliente = Clientes.find((c) => {
            return c.nombre === NombreClienteActual
        })
        if (cliente) {
            SetClienteActual(cliente)
        }
    }, [NombreClienteActual])

    const reactToPrintContent = React.useCallback(() => {
        return componentRef.current;
    }, []);

    // Se encarga de limpiar el carrito y los descuentos
    const onAfterPrintHandler = React.useCallback(() => {
        SetProductosEnCarrito([]);
        SetDtoEfectivo("0");
        SetDtoPorcentaje("0");
        notifySuccess("Venta realizada correctamente")
        setButtonDisabled(false)
        props.handleModalOpen(false);
        props.inputRef?.current?.focus()
    }, []);

    const handlePrint = useReactToPrint({
        documentTitle: "Ticket de venta",
        content: reactToPrintContent,
        onAfterPrint: onAfterPrintHandler
    });

    const SetDineroClienteEfectivo = (dineroDelCliente: string) => {
        const dinero = ValidatePositiveFloatingNumber(dineroDelCliente);

        setDineroEntregado(dinero);
        setCambio(CalcularCambio(PagoDelCliente.precioTotal, Number(dinero), Number(dineroEntregadoTarjeta)))
    }

    const SetDineroClienteTarjeta = (dineroDelCliente: string) => {
        const dinero = ValidatePositiveFloatingNumber(dineroDelCliente);

        setDineroEntregadoTarjeta(dinero);
        setCambio(CalcularCambio(PagoDelCliente.precioTotal, Number(dineroEntregado), Number(dinero)))
    }

    const RealizarVenta = async (pagoCliente: CustomerPaymentInformation) => {
        const abortController = new AbortController();
        try {
            setButtonDisabled(true)

            UpdatePaymentInfo();
            if (!Empleado || !Empleado.TPV) { notifyError("Error con la autenticación"); return; }
            const { data, error } = await AddVenta(pagoCliente, ProductosEnCarrito, Empleado, Clientes, Empleado.TPV);

            if (!error && data) {
                setVenta((await FetchVentaByQuery(data._id))[0]);
                setQrImage(await GenerateQrBase64(data?._id, abortController));
            }
            else {
                setQrImage(undefined);
                setVenta(undefined);
                notifyError("Error al realizar la venta")
            }
        }
        catch (err) {
            console.log(err);
            abortController.abort();
            notifyError("Error al realizar la venta")
            setButtonDisabled(false)
        }
    }

    const UpdatePaymentInfo = () => {
        let p = PagoDelCliente;
        p.tipo = GetFormaDePago();

        p.pagoEnEfectivo = Number(dineroEntregado);
        p.pagoEnTarjeta = Number(dineroEntregadoTarjeta);
        p.cambio = cambio;

        const cliente = Clientes.find((c) => c.nombre == NombreClienteActual);
        if (!cliente) { p.cliente = Clientes[0] }
        else { p.cliente = cliente }

        SetPagoCliente([p][0]);
    }

    const GetFormaDePago = (): string => {
        if (Number(dineroEntregado) > 0 && Number(dineroEntregadoTarjeta) > 0) { return TipoCobro.Fraccionado.toString(); }
        if (Number(dineroEntregadoTarjeta) > 0) { return TipoCobro.Tarjeta.toString(); }
        return TipoCobro.Efectivo.toString();
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} >
            <Backdrop onClick={() => { props.handleModalOpen(false) }} >
                <motion.div className="flex w-11/12 max-h-full items-center bg-white rounded-xl"
                    onClick={(e) => e.stopPropagation()}
                    variants={In}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <div id="receipt-content" className="flex flex-col gap-4 text-left w-full text-sm p-4 overflow-auto">
                        <div className="flex gap-2">
                            {/* Parte izquierda, datos cliente */}
                            <div className="h-full w-full bg-white text-center justify-center">
                                <div className="flex flex-col gap-4">
                                    <span className="text-2xl font-semibold">Datos cliente</span>
                                    <div className="flex flex-col justify-between text-lg text-center">
                                        <label className="text-left font-semibold">Buscar cliente</label>
                                        <Dropdown elementos={Clientes.map((c) => { return c.nombre })} selectedElemento={NombreClienteActual} setElemento={SetNombreClienteActual} />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 justify-items-start w-full">
                                    <div className="text-left">
                                        <h1 className="text-lg font-semibold">Nombre completo</h1>
                                        <label className="text-base" htmlFor="NombreCompleto">{ClienteActual?.nombre}</label>
                                    </div>
                                    <div className="text-left">
                                        <h1 className="text-lg font-semibold">Dirección </h1>
                                        <label className="text-base" htmlFor="NombreCompleto">{ClienteActual?.calle}</label>
                                    </div>
                                    <div className="text-left">
                                        <h1 className="text-lg font-semibold">CIF </h1>
                                        <label className="text-base" htmlFor="NombreCompleto">{ClienteActual?.nif}</label>
                                    </div>
                                    <div className="text-left">
                                        <h1 className="text-lg font-semibold">Código postal </h1>
                                        <label className="text-base" htmlFor="NombreCompleto">{ClienteActual?.cp}</label>
                                    </div>
                                </div>
                            </div>
                            {/* Parte derecha, forma de pago */}
                            <div className="flex flex-col w-full bg-white text-center justify-center">
                                <div className="flex flex-col gap-4 items-center">
                                    <span className="text-2xl font-semibold">Método de pago</span>
                                    <div className="flex xl:gap-10 gap-4">
                                        <div>
                                            <div className="text-xl text-left">
                                                Efectivo
                                            </div>
                                            <div className="text-xl">
                                                <InputNumber value={dineroEntregado} setValue={SetDineroClienteEfectivo} tipo={TipoCobro.Efectivo} valorPendiente={cambio.toFixed(2)} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-xl text-left">
                                                Tarjeta
                                            </div>
                                            <div className="text-xl">
                                                <InputNumber value={dineroEntregadoTarjeta} setValue={SetDineroClienteTarjeta} tipo={TipoCobro.Tarjeta} valorPendiente={cambio.toFixed(2)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-10 text-lg text-center justify-center">
                                    <div>
                                        <div>Total a pagar</div>
                                        <div className="text-4xl font-semibold">{PagoDelCliente.precioTotal.toFixed(2)}€</div>
                                    </div>
                                    <div>
                                        <div>Entregado</div>
                                        <div className="text-4xl font-semibold">{isNaN(Number(dineroEntregado) + Number(dineroEntregadoTarjeta)) ? "0.00" : (Number(dineroEntregado) + Number(dineroEntregadoTarjeta)).toFixed(2)}€</div>
                                    </div>
                                    <div>
                                        <div>{Number(cambio.toFixed(2)) < 0 ? 'Pendiente' : 'Cambio'}</div>
                                        <div className={`text-4xl font-semibold ${cambio < 0 ? "text-red-500" : "text-green-500"}`}>{cambio.toFixed(2)}€</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-items-center gap-2">
                            <button disabled={isButtonDisabled} className={`${isButtonDisabled ? "bg-red-400 cursor-default" : "bg-red-500 hover:bg-red-600"} text-white w-full h-10 hover:shadow-lg rounded-lg flex items-center justify-center`} onClick={() => props.handleModalOpen(false)}>
                                <div className="text-lg">Cancelar</div>
                            </button>
                            {
                                serverUp ?
                                    Number(cambio.toFixed(2)) >= 0 ?
                                        <button disabled={isButtonDisabled} className={`${isButtonDisabled ? "bg-blue-400 cursor-default" : "bg-blue-500 hover:bg-blue-600"} text-white w-full h-10 hover:shadow-lg rounded-lg flex items-center justify-center`}
                                            onClick={async (e) => { await RealizarVenta(PagoDelCliente); }} >
                                            <div className="text-lg">Completar venta</div>
                                        </button>
                                        :
                                        <button className="bg-blue-400 text-white w-full h-10 cursor-default rounded-lg flex items-center justify-center">
                                            <div className="text-lg">Dinero insuficiente</div>
                                        </button>

                                    :
                                    <button className="bg-slate-500 hover:bg-slate-500 cursor-pointer text-white w-full h-10 hover:shadow-lg rounded-lg flex items-center justify-center">
                                        <div className="text-lg">Cargando clientes...</div>
                                    </button>
                            }
                        </div>
                    </div>
                    {
                        qrImage && VentaResultante &&
                        <div style={{ display: "none" }}>
                            <Ticket
                                ref={componentRef}
                                pagoCliente={PagoDelCliente}
                                productosVendidos={ProductosEnCarrito}
                                qrImage={qrImage}
                                venta={VentaResultante}
                            />
                        </div>
                    }
                </motion.div>
            </Backdrop>
        </motion.div>
    );
}

export default ModalPagar;