import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { CustomerPaymentInformation } from "../../../tipos/CustomerPayment";
import { ProductoVendido } from "../../../tipos/ProductoVendido";
import { ITPV } from "../../../tipos/TPV";
import { Venta } from "../../../tipos/Venta";
import { In } from "../../../utils/animations";
import { FetchTPV } from "../../../utils/fetches/tpvFetches";
import GenerateQrBase64 from "../../../utils/generateQr";
import Ticket from "../../printable/ticket";
import { Backdrop } from "../backdrop";
import DevolverVenta from "../devolucionModal/devolverVenta";
import EditarVenta from "../modificarVenta";

const VerVenta = (props: { venta: Venta | undefined; setModal: Function }) => {
  const [tpv, setTpv] = useState<ITPV>();
  const componentRef = useRef(null);
  const [PagoDelCliente, setPago] = useState<CustomerPaymentInformation>();
  const [qrImage, setQrImage] = useState<string>();
  const [showDevolverModal, setShowDevolverModal] = useState<boolean>(false);
  const [showEditarVentaModal, setShowEditarVentaModal] = useState<boolean>(false);

  const reactToPrintContent = React.useCallback(() => {
    return componentRef.current;
  }, []);

  const handlePrint = useReactToPrint({
    documentTitle: "Ticket de venta",
    content: reactToPrintContent,
  });

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      if (!props.venta) {
        return;
      }

      try {
        const pago = {
          cambio: props.venta.cambio,
          cliente: props.venta.cliente,
          dtoEfectivo: props.venta.descuentoEfectivo,
          dtoPorcentaje: props.venta.descuentoPorcentaje,
          pagoEnEfectivo: props.venta.dineroEntregadoEfectivo,
          pagoEnTarjeta: props.venta.dineroEntregadoTarjeta,
          precioTotal: props.venta.precioVentaTotal,
          tipo: props.venta.tipo,
        } as CustomerPaymentInformation;

        const tpvRes = await FetchTPV(props.venta.tpv, abortController);
        const qr = await GenerateQrBase64(props.venta._id, abortController);
        setQrImage(qr);
        setTpv(tpvRes);
        setPago(pago);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();

    return () => {
      abortController.abort();
    };
  }, []);

  if (!props.venta) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full w-full ">
        <Backdrop
          onClick={() => {
            props.setModal(false);
          }}
        >
          <motion.div
            className="h-5/6 w-5/6 flex flex-col items-center bg-white rounded-2xl p-4"
            onClick={(e) => e.stopPropagation()}
            variants={In}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            Venta indefinida
          </motion.div>
        </Backdrop>
      </motion.div>
    );
  }

  let fecha = new Date(Number(props.venta.createdAt));
  let fechaActualizada = new Date(Number(props.venta.updatedAt));
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full w-full ">
      <Backdrop
        onClick={() => {
          props.setModal(false);
        }}
      >
        <motion.div
          className="h-5/6 w-11/12 sm:w-5/6 flex flex-col items-center bg-white rounded-2xl p-4"
          onClick={(e) => e.stopPropagation()}
          variants={In}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="flex flex-col gap-4 w-full h-10 grow text-left">
            <div className="flex justify-between items-center">
              <span className="text-lg sm:text-2xl">Venta en: {`${fecha.toLocaleString()}`}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                className="h-6 w-6 hover:text-blue-500 cursor-pointer"
                onClick={() => {
                  setShowEditarVentaModal(true);
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>
            <div className="flex flex-col gap-4 sm:gap-0 sm:flex-row w-full h-10 grow justify-between items-center">
              <div className="font-semibold sm:w-1/2 w-full h-full overflow-y-scroll sm:overflow-y-hidden text-sm sm:text-base">
                Resumen de la compra
                <div className="flex flex-col pt-2 font-normal">
                  <span>
                    Cliente:{" "}
                    {props.venta.cliente.nombre === "General"
                      ? props.venta.cliente.nombre
                      : `${props.venta.cliente.nombre} (${props.venta.cliente.nif})`}
                  </span>
                  <span>Tipo de venta: {props.venta.tipo}</span>
                  <span>Valor total: {props.venta.precioVentaTotal.toFixed(2)}€</span>
                  <span>Cantidad pagada con efectivo: {props.venta.dineroEntregadoEfectivo.toFixed(2)}€</span>
                  <span>Cantidad pagada con tarjeta: {props.venta.dineroEntregadoTarjeta.toFixed(2)}€</span>
                  <span>Cambio: {props.venta.cambio.toFixed(2)}€</span>
                  <span>TPV: {`${tpv?.nombre || `Cargando...`}`}</span>
                  <span>Fecha: {fecha.toLocaleString()}</span>
                  <span>
                    Vendedor:{" "}
                    {`${props.venta.vendidoPor.nombre} ${props.venta.vendidoPor.apellidos} (${props.venta.vendidoPor.email})`}
                  </span>
                  {props.venta.createdAt !== props.venta.updatedAt && (
                    <>
                      <span>Venta actualizada: {fechaActualizada.toLocaleString()}</span>
                      <span>
                        Venta modificada por:{" "}
                        {`${props.venta.modificadoPor.nombre} ${props.venta.modificadoPor.apellidos} (${props.venta.modificadoPor.email})`}
                      </span>
                    </>
                  )}
                  <span>Descuento en efectivo aplicado: {props.venta.descuentoEfectivo}€</span>
                  <span>Porcentaje de descuento aplicado: {props.venta.descuentoPorcentaje}%</span>
                  <span>ID: {props.venta._id}</span>
                </div>
              </div>
              <div className="bg-gray-100 rounded-lg border-2 sm:w-1/2 w-full h-full font-normal overflow-y-scroll text-sm sm:text-base">
                <div className="flex w-full p-2 cursor-default font-semibold items-center">
                  <p className="w-1/3 sm:w-1/4 text-left">Producto</p>
                  <p className="w-1/3 sm:w-1/4 text-right sm:text-center">Cantidad</p>
                  <p className="hidden sm:inline-flex sm:w-1/4 text-center">Descuento</p>
                  <p className="w-1/3 sm:w-1/4 text-right sm:text-center">Total</p>
                </div>
                <hr className="border-2 border-gray-300" />
                <div className="flex flex-col gap-2 w-full h-full p-2">
                  {props.venta.productos.map((prod, index) => {
                    return (
                      <div key={`editarVenta_${prod._id}_${index}`} className="hover:bg-gray-200 hover:cursor-pointer">
                        <GenerarFilaProducto numFila={index + 1} producto={prod} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="flex gap-2 w-full justify-around items-end text-white">
              <button
                className="flex justify-center items-center w-1/3 h-12 rounded-xl bg-red-500 hover:bg-red-600 shadow-lg"
                onClick={() => {
                  props.setModal(false);
                }}
              >
                <span className="hidden sm:inline-flex">Cerrar</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 sm:hidden"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <button
                className="flex justify-center items-center w-1/3 h-12 rounded-xl bg-orange-500 hover:bg-orange-600 shadow-lg"
                onClick={() => {
                  setShowDevolverModal(true);
                }}
              >
                <span className="hidden sm:inline-flex">Devolver</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 sm:hidden"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-6 6m0 0l-6-6m6 6V9a6 6 0 0112 0v3" />
                </svg>
              </button>
              <button
                className="flex items-center justify-center w-1/3 h-12 rounded-xl bg-blue-500 hover:bg-blue-600 shadow-lg"
                onClick={() => {
                  handlePrint();
                }}
              >
                <span className="hidden sm:inline-flex">Imprimir</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 sm:hidden"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z"
                  />
                </svg>
              </button>
            </div>
            {props.venta && PagoDelCliente && (
              <div style={{ display: "none" }}>
                <Ticket
                  ref={componentRef}
                  pagoCliente={PagoDelCliente}
                  productosVendidos={props.venta.productos}
                  qrImage={qrImage}
                  venta={props.venta}
                />
              </div>
            )}
            <AnimatePresence>
              {showDevolverModal && (
                <DevolverVenta venta={props.venta} setModal={setShowDevolverModal} setModalVenta={props.setModal} />
              )}
              {showEditarVentaModal && <EditarVenta setShowModal={setShowEditarVentaModal} setVenta={() => { }} />}
            </AnimatePresence>
          </div>
        </motion.div>
      </Backdrop>
    </motion.div>
  );
};

const GenerarFilaProducto = (props: { numFila: number; producto: ProductoVendido }) => {
  const precio = Number(props.producto.precioFinal) || Number(props.producto.precioVenta) * ((100 - props.producto.dto) / 100);

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <div className="w-1/3 sm:w-1/4 text-left">{props.producto.nombre}</div>
        <div className="w-1/3 sm:w-1/4 text-right sm:text-center">{props.producto.cantidadVendida}</div>
        <div className="hidden sm:inline-flex sm:w-1/4 text-center">{props.producto.dto}</div>
        <div className="w-1/3 sm:w-1/4 text-right sm:text-center">
          {(precio * props.producto.cantidadVendida).toFixed(2)}€
        </div>
      </div>
      <hr />
    </>
  );
};

export default VerVenta;
