import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { Devolucion } from "../../../tipos/Devolucion";
import { ProductoDevuelto } from "../../../tipos/ProductoDevuelto";
import { ITPV } from "../../../tipos/TPV";
import { In } from "../../../utils/animations";
import { FetchTPV } from "../../../utils/fetches/tpvFetches";
import GenerateQrBase64 from "../../../utils/generateQr";
import DevolucionTicket from "../../printable/devolucionTicket";
import { Backdrop } from "../backdrop";

const DevolucionModal = (props: { devolucion: Devolucion | undefined; setModal: Function }) => {
  const [tpvDevolucion, setTpvDevolucion] = useState<ITPV>();
  const [tpvVenta, setTpvVenta] = useState<ITPV>();
  const [qrImage, setQrImage] = useState<string>();
  const componentRef = useRef(null);

  const reactToPrintContent = React.useCallback(() => {
    return componentRef.current;
  }, []);

  const handlePrint = useReactToPrint({
    documentTitle: "Ticket de devolución",
    content: reactToPrintContent,
  });

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      if (!props.devolucion) {
        return;
      }
      const tpvRes = await FetchTPV(props.devolucion.tpv, abortController);
      const tpvVenta = await FetchTPV(props.devolucion.ventaOriginal.tpv, abortController);
      setTpvVenta(tpvVenta);
      setTpvDevolucion(tpvRes);
      setQrImage(await GenerateQrBase64(props.devolucion._id, abortController));
    };
    fetchData();

    return () => {
      abortController.abort();
    };
  }, []);

  if (!props.devolucion) {
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

  let fecha = new Date(Number(props.devolucion.createdAt));
  let fechaVenta = new Date(Number(props.devolucion.ventaOriginal.createdAt));

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
          <div className="flex flex-col w-full h-full text-left">
            <span className="text-xl sm:text-2xl pb-6">Devolución en: {`${fecha.toLocaleString()}`}</span>
            <div
              className="flex flex-col gap-4 sm:flex-row w-full h-5/6 justify-between align-middle 
              text-sm sm:text-base overflow-y-scroll sm:overflow-y-clip"
            >
              <div className="flex flex-col w-1/2">
                <span className="font-semibold pb-4 w-full h-full">
                  Detalles de la devolución
                  <div className="flex flex-col font-normal">
                    {/* Detalles de la deovlución */}
                    <div>
                      <p>ID: {props.devolucion._id}</p>
                      <p>Cliente: {props.devolucion.cliente.nombre}</p>
                      <p>Empleado: {props.devolucion.trabajador.nombre}</p>
                      <p>Fecha de la devolución: {fecha.toLocaleString()}</p>
                      <p>TPV: {tpvDevolucion?.nombre}</p>
                      <p>Efectivo devuelto: {props.devolucion.dineroDevuelto.toFixed(2)}€</p>
                    </div>
                  </div>
                </span>
                <span className="font-semibold w-full h-full">
                  Detalles de la compra original
                  <div className="flex flex-col font-normal">
                    {/* Detalles de la venta */}
                    <div>
                      <p>ID: {props.devolucion.ventaOriginal._id}</p>
                      <p>Cliente: {props.devolucion.ventaOriginal.cliente.nombre}</p>
                      <p>Empleado: {props.devolucion.ventaOriginal.vendidoPor.nombre}</p>
                      <p>Fecha de la venta: {fechaVenta.toLocaleString()}</p>
                      <p>TPV: {tpvVenta?.nombre}</p>
                      <p>Tipo de pago: {props.devolucion.ventaOriginal.tipo}</p>
                      <p>Total: {props.devolucion.ventaOriginal.precioVentaTotal.toFixed(2)}€</p>
                      <p>
                        Total pagado en efectivo: {props.devolucion.ventaOriginal.dineroEntregadoEfectivo.toFixed(2)}€
                      </p>
                      <p>
                        Total pagado en tarjeta: {props.devolucion.ventaOriginal.dineroEntregadoTarjeta.toFixed(2)}€
                      </p>
                      <p>Cambio: {props.devolucion.ventaOriginal.cambio.toFixed(2)}€</p>
                    </div>
                  </div>
                </span>
              </div>
              <div className="flex flex-col font-semibold text-left sm:text-right w-full sm:w-1/2 h-full gap-2">
                <span>Lista de productos devueltos</span>
                <div className="bg-gray-100 rounded-lg border-2 w-full h-full font-normal overflow-y-scroll">
                  <div className="flex w-full justify-around p-2 cursor-default">
                    <p className="w-1/4 text-left font-semibold">Producto</p>
                    <p className="w-1/4 text-center font-semibold">Descuento</p>
                    <p className="w-1/4 text-center font-semibold">Cantidad</p>
                    <p className="w-1/4 text-center font-semibold">Total</p>
                  </div>
                  <hr className="border-2 border-gray-300" />
                  <div className="flex flex-col gap-2 w-full h-full p-2">
                    {props.devolucion.productosDevueltos.map((prod, index) => {
                      return (
                        <div
                          key={`editarVenta_${prod._id}_${index}`}
                          className="hover:bg-gray-200 hover:cursor-pointer"
                        >
                          <GenerarFilaDevolucion numFila={index + 1} producto={prod} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full justify-around self-end text-white gap-4 pt-6">
              <button
                className="w-1/2 h-12 rounded-xl bg-red-500 hover:bg-red-600 shadow-lg"
                onClick={() => {
                  props.setModal(false);
                }}
              >
                Cerrar
              </button>
              <button
                className="w-1/2 h-12 rounded-xl bg-blue-500 hover:bg-blue-600 shadow-lg"
                onClick={() => {
                  handlePrint();
                }}
              >
                Imprimir
              </button>
            </div>
            {qrImage && (
              <div style={{ display: "none" }}>
                <DevolucionTicket
                  ref={componentRef}
                  devolucion={props.devolucion}
                  fecha={props.devolucion.createdAt}
                  qrImage={qrImage}
                />
              </div>
            )}
          </div>
        </motion.div>
      </Backdrop>
    </motion.div>
  );
};

const GenerarFilaDevolucion = (props: { numFila: number; producto: ProductoDevuelto }) => {
  return (
    <>
      <div className="flex w-full ">
        <div className="w-1/4 text-left">{props.producto.nombre}</div>
        <div className="w-1/4 text-center">{props.producto.dto}%</div>
        <div className="w-1/4 text-center">{props.producto.cantidadDevuelta}</div>
        <div className="w-1/4 text-center">
          {(props.producto.precioFinal * props.producto.cantidadDevuelta).toFixed(2)}€
        </div>
      </div>
      <hr />
    </>
  );
};

export default DevolucionModal;
