import { useMutation } from "@apollo/client";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import useEmpleadoContext from "../../../context/empleadoContext";
import useProductEnCarritoContext from "../../../context/productosEnCarritoContext";
import useJwt from "../../../hooks/jwt";
import { Cliente } from "../../../tipos/Cliente";
import { CustomerPaymentInformation } from "../../../tipos/CustomerPayment";
import { TipoCobro } from "../../../tipos/Enums/TipoCobro";
import { FetchClientes } from "../../../utils/fetches";
import { CalcularCambio } from "../../../utils/preciosUtils";
import { ADD_SALE } from "../../../utils/querys";
import { ValidatePositiveFloatingNumber } from "../../../utils/validator";
import Dropdown from "../../Forms/dropdown";
import { Input } from "../../Forms/input/input";
import { InputNumber } from "../../Forms/input/inputDinero";
import Ticket from "../../ticket";
import { Backdrop } from "../backdrop";
import { notifyError, notifySuccess } from "../../../utils/toastify";

const In = {
    hidden: {
        scale: 0,
        opacity: 0
    },
    visible: {
        scale: 1,
        opacity: 1,
        transition: {
            duration: 0.1,
            type: "spring",
            damping: 15,
            stifness: 500
        }
    },
    exit: {
        y: "-100vh",
        opacity: 0,
        transition: {
            duration: 0.25,
        }
    }
}

export const ModalPagar = (props: { PagoCliente: CustomerPaymentInformation, handleModalOpen: Function }) => {
    const jwt = useJwt();
    const [dineroEntregado, setDineroEntregado] = useState<string>("0");
    const [dineroEntregadoTarjeta, setDineroEntregadoTarjeta] = useState<string>("0");
    const [cambio, setCambio] = useState<number>(props.PagoCliente.cambio);
    const { Empleado } = useEmpleadoContext();

    const [Clientes, SetClientes] = useState<Cliente[]>([]);
    const [ClienteActual, SetClienteActual] = useState<string>("General");
    const [PagoDelCliente, SetPagoCliente] = useState<CustomerPaymentInformation>(props.PagoCliente);
    const [errorVenta, setErrorVenta] = useState<boolean>(false);

    const { ProductosEnCarrito, SetProductosEnCarrito } = useProductEnCarritoContext();
    const [addVentasToDB, { error }] = useMutation(ADD_SALE, { errorPolicy: 'all' });
    const [serverUp, setServerStatus] = useState<boolean>(false);

    const componentRef = useRef(null);

    useEffect(() => {
        console.log(ProductosEnCarrito);


        let isUnmounted = false;
        FetchClientes().then((r) => {
            if (!isUnmounted) {
                SetClientes(r)
                setServerStatus(true);
            }
        }).catch(() => {
            setServerStatus(false);
        });

        return () => {
            isUnmounted = true;
        }
    }, []);

    const reactToPrintContent = React.useCallback(() => {
        return componentRef.current;
    }, []);

    const onAfterPrintHandler = React.useCallback(() => {
        SetProductosEnCarrito([]);
        notifySuccess("Venta realizada correctamente")
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

    const AddSale = async (pagoCliente: CustomerPaymentInformation) => {
        try {
            UpdatePaymentInfo()

            let cliente;
            if (!pagoCliente.cliente) {
                cliente = Clientes.find((c) => c.nombre === "General");
            }
            else {
                cliente = pagoCliente.cliente;
            }

            await addVentasToDB({
                variables: {
                    "fields": {
                        "productos": ProductosEnCarrito,
                        "dineroEntregadoEfectivo": Number(pagoCliente.pagoEnEfectivo.toFixed(2)),
                        "dineroEntregadoTarjeta": Number(pagoCliente.pagoEnTarjeta.toFixed(2)),
                        "precioVentaTotal": Number(pagoCliente.precioTotal.toFixed(2)),
                        "tipo": pagoCliente.tipo,
                        "cambio": Number(pagoCliente.cambio.toFixed(2)),
                        "cliente": cliente,
                        "vendidoPor": Empleado,
                        "modificadoPor": Empleado,
                        "descuentoEfectivo": Number(pagoCliente.dtoEfectivo.toFixed(2)) || 0,
                        "descuentoPorcentaje": Number(pagoCliente.dtoPorcentaje.toFixed(2)) || 0,
                        "tpv": jwt.TPV
                    }
                }
            });

            if (!error) {
                props.handleModalOpen(false);
                setErrorVenta(false);
                handlePrint();
            }
            else {
                setErrorVenta(true);
            }
        }
        catch (err) {
            console.log(err);
            setErrorVenta(true);
            notifyError("Error al realizar la venta")
        }
    }

    const UpdatePaymentInfo = () => {
        let p = PagoDelCliente;
        p.tipo = GetFormaDePago();

        p.pagoEnEfectivo = Number(dineroEntregado);
        p.pagoEnTarjeta = Number(dineroEntregadoTarjeta);
        p.cambio = cambio;

        const cliente = Clientes.find((c) => c.nombre == ClienteActual);
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
                <motion.div className="mx-20 my-20 flex flex-grow items-center bg-white rounded-2xl"
                    onClick={(e) => e.stopPropagation()}
                    variants={In}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <div id="receipt-content" className="text-left w-full text-sm p-6 overflow-auto">
                        <div className="grid grid-cols-2">
                            {/* Parte izquierda, datos cliente */}
                            <div className="bg-white text-center justify-center py-6">
                                <div>
                                    <div className="text-2xl font-semibold">Datos cliente</div>
                                    <hr />
                                    <div className="flex flex-col justify-between mt-4 px-2 text-lg text-center">
                                        <label className="text-left">Seleccionar cliente</label>
                                        <Dropdown elementos={Clientes.map((c) => { return c.nombre })} selectedElemento={ClienteActual} setElemento={SetClienteActual} />
                                    </div>
                                </div>
                                <div className="flex flex-col px-2 pt-6 justify-items-start w-full">
                                    <div className="text-left">
                                        <h1 className="text-lg">Nombre completo</h1>
                                        <Input placeholder="Nombre del cliente" />
                                    </div>
                                    <div className="text-left">
                                        <h1 className="text-lg">Dirección</h1>
                                        <Input placeholder="Ejem.: Calle Alcalá 14" />
                                    </div>
                                    <div className="text-left">
                                        <h1 className="text-lg">NIF</h1>
                                        <Input placeholder="Número de identificación fiscal" />
                                    </div>
                                    <div className="text-left">
                                        <h1 className="text-lg">Código postal</h1>
                                        <Input placeholder="Ejem.: 46006" />
                                    </div>
                                </div>
                            </div>
                            {/* Parte derecha, forma de pago */}
                            <div className="text-center justify-center py-6">
                                <div>
                                    <div className="text-2xl font-semibold">Método de pago</div>
                                    <hr />
                                    <div className="grid grid-cols-2 justify-items gap-6 p-10">
                                        <div>
                                            <div className="text-xl text-left">
                                                Efectivo
                                            </div>
                                            <div className="text-xl">
                                                <InputNumber value={dineroEntregado} setValue={SetDineroClienteEfectivo} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-xl text-left">
                                                Tarjeta
                                            </div>
                                            <div className="text-xl">
                                                <InputNumber value={dineroEntregadoTarjeta} setValue={SetDineroClienteTarjeta} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 text-lg text-center justify-center">
                                    <div>
                                        <div>Total a pagar</div>
                                        <div className="text-4xl font-semibold">{PagoDelCliente.precioTotal.toFixed(2)}€</div>
                                    </div>
                                    <div>
                                        <div>Entregado</div>
                                        <div className="text-4xl font-semibold">{isNaN(Number(dineroEntregado) + Number(dineroEntregadoTarjeta)) ? "0.00" : (Number(dineroEntregado) + Number(dineroEntregadoTarjeta)).toFixed(2)}€</div>
                                    </div>
                                    <div>
                                        <div>{cambio < 0 ? 'Pendiente' : 'Cambio'}</div>
                                        <div className={`text-4xl font-semibold ${cambio < 0 ? "text-red-500" : "text-green-500"}`}>{cambio.toFixed(2)}€</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr className="my-2" />
                        <div className="grid grid-cols-2 justify-items-center gap-4">
                            <button className="bg-red-500 hover:bg-red-600 text-white w-full h-12 hover:shadow-lg rounded-lg flex items-center justify-center" onClick={() => props.handleModalOpen(false)}>
                                <div className="text-lg">CANCELAR</div>
                            </button>
                            {
                                serverUp ?
                                    cambio >= 0 ?
                                        <button className="bg-blue-500 hover:bg-blue-600 text-white w-full h-12 hover:shadow-lg rounded-lg flex items-center justify-center" onClick={async () => { await AddSale(PagoDelCliente); }} >
                                            <div className="text-lg">COMPLETAR VENTA</div>
                                        </button>
                                        :
                                        <button className="bg-blue-400 text-white w-full h-12 cursor-default rounded-lg flex items-center justify-center">
                                            <div className="text-lg">DINERO INSUFICIENTE</div>
                                        </button>

                                    :
                                    <button className="bg-slate-500 hover:bg-slate-500 cursor-pointer text-white w-full h-12 hover:shadow-lg rounded-lg flex items-center justify-center">
                                        <div className="text-lg">CARGANDO CLIENTES...</div>
                                    </button>
                            }
                        </div>
                    </div>
                    <div style={{ display: "none" }}>
                        <Ticket
                            ref={componentRef}
                            pagoCliente={PagoDelCliente}
                            productosVendidos={ProductosEnCarrito}
                            errorVenta={errorVenta}
                        />
                    </div>
                </motion.div>
            </Backdrop>
        </motion.div>
    );
}

export default ModalPagar;