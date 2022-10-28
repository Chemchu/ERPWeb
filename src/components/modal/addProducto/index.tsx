import { motion } from "framer-motion";
import { useState } from "react";
import { Producto } from "../../../tipos/Producto";
import { In } from "../../../utils/animations";
import { CreateProducto } from "../../../utils/fetches/productosFetches";
import { notifyError, notifyLoading } from "../../../utils/toastify";
import ProductoForm from "../../elementos/Forms/productoForm";
import { Backdrop } from "../backdrop";

const AddProducto = (props: { showModal: Function }) => {
  const [Producto, setProducto] = useState<Producto>();

  const CrearProducto = async (Prod: Producto | undefined) => {
    if (!Prod) {
      notifyError("Error con el producto");
      return;
    }
    notifyLoading(CreateProducto(Prod), "Creando producto...", () => {
      props.showModal(false);
    });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Backdrop
        onClick={(e) => {
          e.stopPropagation();
          props.showModal(false);
        }}
      >
        <motion.div
          className="h-5/6 w-5/6 flex flex-col gap-10 items-center bg-white rounded-2xl p-4"
          onClick={(e) => e.stopPropagation()}
          variants={In}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="flex flex-col gap-2 w-full h-full text-left ">
            <span className="text-xl xl:text-3xl cursor-default">Añadir nuevo producto</span>

            <ProductoForm setProducto={setProducto} />

            <div className="flex w-full h-full items-end justify-around text-white gap-10">
              <button
                className="h-10 w-full rounded-xl bg-red-500 hover:bg-red-600 shadow-lg"
                onClick={() => props.showModal(false)}
              >
                Cancelar
              </button>
              <button
                className="h-10 w-full rounded-xl bg-blue-500 hover:bg-blue-600 shadow-lg"
                onClick={async () => {
                  await CrearProducto(Producto);
                }}
              >
                Crear producto
              </button>
            </div>
          </div>
        </motion.div>
      </Backdrop>
    </motion.div>
  );
};

export default AddProducto;
