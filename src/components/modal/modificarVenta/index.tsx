import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Venta } from "../../../tipos/Venta";
import { In } from "../../../utils/animations";
import { ModificarVenta } from "../../../utils/fetches/ventasFetches";
import { notifyError, notifySuccess } from "../../../utils/toastify";
import SimpleListBox from "../../elementos/Forms/simpleListBox";
import { Backdrop } from "../backdrop";

const EditarVenta = (props: { setShowModal: Function; venta: Venta, setVenta: Function }) => {
  const [tipoVenta, setTipoVenta] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);

  const ModificarTipoVenta = async () => {
    const { message, successful } = await ModificarVenta(props.venta._id, tipoVenta)
    if (!successful) {
      notifyError(message)
      return;
    }

    notifySuccess(message)
    props.setShowModal(false)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Backdrop onClick={() => props.setShowModal(false)}>
        <motion.div
          variants={In}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="flex flex-col gap-2 h-3/6 w-3/6 max-h-96 max-w-lg bg-white rounded-xl p-4 items-center"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="text-left text-2xl w-full">
            Modificar venta
          </span>
          <div className="grow w-full h-full">
            <span>
              Tipo de venta
            </span>
            <SimpleListBox elementos={["Efectivo", "Tarjeta"]} setElemento={setTipoVenta} />
          </div>
          <div className="w-full flex gap-2 text-white">
            <button onClick={() => props.setShowModal(false)}
              className="flex justify-center items-center w-full h-12 rounded-xl bg-red-500 hover:bg-red-600 shadow-lg">
              Cancelar
            </button>
            <button onClick={() => setShowModal(true)}
              disabled={props.venta.tipo === tipoVenta}
              className={`flex items-center justify-center w-full h-12 rounded-xl shadow-lg
              ${props.venta.tipo === tipoVenta ? "bg-blue-400" : "bg-blue-500 hover:bg-blue-600"}`}
            >
              Aceptar
            </button>
          </div>
          <AnimatePresence>
            {
              showModal &&
              <ConfirmacionModal closeModal={() => setShowModal(false)}
                title="¿Modificar el tipo de venta?" subtitle={`La venta pasará de ${props.venta.tipo} a ${tipoVenta}`}
                acceptCallback={async () => { await ModificarTipoVenta() }}
                cancelCallback={() => setShowModal(false)} />
            }
          </AnimatePresence>
        </motion.div>
      </Backdrop>
    </motion.div>
  );
};

const ConfirmacionModal = (props: { title: string, subtitle: string, closeModal: Function, acceptCallback: Function, cancelCallback: Function }) => {
  const [isPending, setIsPending] = useState<boolean>(false);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Backdrop
        onClick={(e) => {
          e.stopPropagation();
          props.closeModal();
        }}
      >
        <motion.div
          className="shadow-lg rounded-2xl p-4 bg-white dark:bg-gray-800 w-64 m-auto"
          onClick={(e) => e.stopPropagation()}
          variants={In}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="w-full h-full text-center">
            <div className="flex h-full flex-col justify-between">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                className="mt-4 w-12 h-12 m-auto text-blue-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
              <p className="text-gray-800 dark:text-gray-200 text-xl font-bold mt-4">
                {props.title ? props.title : "¿Borrar?"}
              </p>
              {props.subtitle && <p className="text-gray-600 dark:text-gray-400 text-xs py-2 px-6">{props.subtitle}</p>}
              <div className="flex items-center justify-between gap-4 w-full mt-8">
                {isPending ? (
                  <button
                    disabled
                    type="button"
                    className="py-2 px-4 bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg cursor-default"
                  >
                    Modificando...
                  </button>
                ) : (
                  <button
                    onClick={async () => await props.acceptCallback()}
                    type="button"
                    className="py-2 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                  >
                    Sí
                  </button>
                )}
                <button
                  onClick={() => props.cancelCallback()}
                  type="button"
                  className="py-2 px-4 bg-white hover:bg-gray-100 focus:ring-blue-500 focus:ring-offset-blue-200 text-blue-500 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </Backdrop>
    </motion.div>
  )
}
export default EditarVenta;
