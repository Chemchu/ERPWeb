import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Cierre } from "../../../tipos/Cierre";
import { Roles } from "../../../tipos/Enums/Roles";
import { In } from "../../../utils/animations";
import { DeleteCierre } from "../../../utils/fetches/cierresFetches";
import GenerateQrBase64 from "../../../utils/generateQr";
import AuthorizationWrapper from "../../authorizationWrapper";
import CierrePrintable from "../../printable/cierrePrintable";
import { Backdrop } from "../backdrop";
import BorrarButton from "../../elementos/botones/borrarButton";

const VerCierre = (props: { showModal: Function; cierre: Cierre; setCierre: Function; tpv: string }) => {
  const [qrImage, setQrImage] = useState<string>();
  const componentRef = useRef(null);

  useEffect(() => {
    const abortController = new AbortController();
    const GetQrImage = async () => {
      const qr = await GenerateQrBase64(props.cierre._id, abortController);
      setQrImage(qr);
    };

    GetQrImage();
    return () => {
      abortController.abort();
    };
  }, []);

  const reactToPrintContent = React.useCallback(() => {
    return componentRef.current;
  }, []);

  const handlePrint = useReactToPrint({
    documentTitle: "Cierre de caja",
    content: reactToPrintContent,
  });

  const Eliminar = async () => {
    const deletedCorrectly = await DeleteCierre(props.cierre._id);

    if (deletedCorrectly) {
      props.showModal(false);
      props.setCierre(null);
    }
  };

  const fechaCierre = new Date(Number(props.cierre.cierre)).toLocaleString();
  const fechaApertura = new Date(Number(props.cierre.apertura)).toLocaleString();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Backdrop
        onClick={(e) => {
          e.stopPropagation();
          props.showModal(false);
        }}
      >
        <motion.div
          className="h-5/6 w-5/6 flex flex-col gap-10 items-center bg-white rounded-2xl p-6"
          onClick={(e) => e.stopPropagation()}
          variants={In}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="flex flex-col gap-4 w-full h-full">
            <div className="flex w-full justify-between">
              <span className="text-2xl">Cierre de {fechaCierre}</span>
              {AuthorizationWrapper([Roles.Administrador, Roles.Gerente])(() => {
                return (
                  <BorrarButton
                    title="¿Borrar cierre?"
                    subtitle="¿Seguro que quieres borrar el cierre?"
                    acceptCallback={Eliminar}
                  />
                );
              })({})}
            </div>
            <span className="text-base">ID: {props.cierre._id}</span>
            <div className="flex flex-col sm:flex-row justify-between w-full h-full pt-2 overflow-y-scroll sm:overflow-y-auto">
              <div className="flex flex-col w-full gap-1 text-base">
                <span>TPV: {props.tpv}</span>
                <span>Venta total: {props.cierre.ventasTotales.toFixed(2)}€</span>
                <span>Ventas en efectivo: {props.cierre.ventasEfectivo.toFixed(2)}€</span>
                <span>Ventas en tarjeta: {props.cierre.ventasTarjeta.toFixed(2)}€</span>
                <span>Caja inicial: {props.cierre.cajaInicial.toFixed(2)}€</span>
                <span>Caja final esperada: {props.cierre.dineroEsperadoEnCaja.toFixed(2)}€</span>
                <span>Caja final real: {props.cierre.dineroRealEnCaja.toFixed(2)}€</span>
              </div>
              <div className="flex flex-col w-full gap-1 text-base sm:items-end">
                <span>Dinero retirado: {props.cierre.dineroRetirado.toFixed(2)}€</span>
                <span>Fondo de caja dejado: {props.cierre.fondoDeCaja.toFixed(2)}€</span>
                <span>Abierto por: {props.cierre.abiertoPor.nombre}</span>
                <span>Fecha de apertura: {fechaApertura}</span>
                <span>Cerrado por: {props.cierre.cerradoPor.nombre}</span>
                <span>Fecha de cierre: {fechaCierre}</span>
              </div>
            </div>
            <div className="flex w-full gap-4 justify-around items-end text-white">
              <button
                className="w-1/2 h-12 rounded-xl bg-red-500 hover:bg-red-600 shadow-lg"
                onClick={() => {
                  props.showModal(false);
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
            {
              <div style={{ display: "none" }}>
                <CierrePrintable ref={componentRef} cierre={props.cierre} tpv={props.tpv} qrImage={qrImage} />
              </div>
            }
          </div>
        </motion.div>
      </Backdrop>
    </motion.div>
  );
};

export default VerCierre;
