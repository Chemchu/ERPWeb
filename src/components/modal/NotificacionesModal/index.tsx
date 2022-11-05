
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import React from "react";
import useNotificacionesContext from "../../../context/notificaciones";
import { In } from "../../../utils/animations";
import { Backdrop } from "../backdrop";

const VerNotificacionesModal = (props: { showModal: Function; }) => {
  const { Mensajes, SetMensajes } = useNotificacionesContext()

  const LimpiarNotificaciones = () => {
    SetMensajes([])
    Cookies.set('productoUpdateStamp', String(Date.now()))
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Backdrop
        onClick={(e) => {
          e.stopPropagation();
          props.showModal(false);
        }}
      >
        <motion.div
          className="h-4/6 w-4/6 flex flex-col gap-10 items-center bg-white rounded-2xl p-4"
          onClick={(e) => e.stopPropagation()}
          variants={In}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <span className="font-semibold text-lg sm:text-2xl w-full text-left">Notificaciones</span>
          {
            Mensajes.length <= 0 ?
              <span className="w-full h-full items-center text-center align-middle">Bandeja vacía. No hay notificaciones.</span>
              :
              <div className="flex flex-col w-full h-10 grow overflow-y-auto border rounded-lg">
                {
                  Mensajes.map((msg: string, i: number) => {
                    return (
                      <div key={`notif-${i}`}
                        className="flex items-center bg-gray-100 w-full px-3 py-2">
                        <span>
                          {msg}
                        </span>
                      </div>
                    )
                  })
                }
              </div>
          }
          <div className="flex w-full text-white gap-2">
            <button className="bg-red-500 w-full rounded-lg h-10"
              onClick={() => props.showModal(false)}>
              Cerrar
            </button>
            <button className="bg-blue-500 w-full rounded-lg h-10"
              onClick={LimpiarNotificaciones}>
              Limpiar notificaciones
            </button>
          </div>
        </motion.div>
      </Backdrop>
    </motion.div>
  );
};

export default VerNotificacionesModal;
