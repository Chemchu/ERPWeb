import { motion } from "framer-motion";
import { useState } from "react";
import { Venta } from "../../../tipos/Venta";
import { In } from "../../../utils/animations";
import { ModificarVenta } from "../../../utils/fetches/ventasFetches";
import SimpleListBox from "../../elementos/Forms/simpleListBox";
import { Backdrop } from "../backdrop";

const EditarVenta = (props: { setShowModal: Function; venta: Venta, setVenta: Function }) => {
  const [tipoVenta, setTipoVenta] = useState<string>("");

  const ModificarTipoVenta = async () => {
    await ModificarVenta(props.venta._id, tipoVenta)
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
            <button onClick={ModificarTipoVenta}
              className="flex items-center justify-center w-full h-12 rounded-xl bg-blue-500 hover:bg-blue-600 shadow-lg">
              Aceptar
            </button>
          </div>
        </motion.div>
      </Backdrop>
    </motion.div>
  );
};

export default EditarVenta;
