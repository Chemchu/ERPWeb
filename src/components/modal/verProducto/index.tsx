import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { Producto } from "../../../tipos/Producto";
import { In } from "../../../utils/animations";
import { notifyError } from "../../../utils/toastify";
import Etiqueta from "../../printable/etiqueta";
import EditableLabel from "../../elementos/Forms/editableLabel";
import ProductoForm from "../../elementos/Forms/productoForm";
import { Backdrop } from "../backdrop";
import {
  DeleteProducto,
  UpdateProducto,
} from "../../../utils/fetches/productosFetches";
import BorrarButton from "../../elementos/botones/borrarButton";

export const VerProducto = (props: {
  producto: Producto;
  setProducto: Function;
  showModal: Function;
}) => {
  const [Nombre, setNombre] = useState<string>(props.producto.nombre || "");
  const [ProductoAux, setProductoAux] = useState<Producto>();
  const [hayCambios, setHayCambios] = useState<boolean>(false);
  const [imprimible, setImprimible] = useState<boolean>(true);

  useEffect(() => {
    if (!ProductoAux) {
      setHayCambios(false);
      return;
    }
    if (!ProductoAux.precioVenta) {
      setImprimible(false);
      return;
    }
    if (!ProductoAux.nombre) {
      setImprimible(false);
      return;
    }
    if (!ProductoAux.ean) {
      setImprimible(false);
      return;
    }
    setImprimible(true);
  }, [ProductoAux]);

  const componentRef = useRef(null);

  const reactToPrintContent = React.useCallback(() => {
    return componentRef.current;
  }, []);

  const handlePrint = useReactToPrint({
    documentTitle: "Etiqueta de producto",
    content: reactToPrintContent,
  });

  const Print = () => {
    try {
      handlePrint();
    } catch (e) {
      notifyError("Rellene los campos necesarios para imprimir la etiqueta");
      console.log(e);
    }
  };

  const GuardarCambios = async (Prod: Producto | undefined, id: string) => {
    if (!Prod) {
      return;
    }

    const p: Producto = {
      _id: id,
      alta: Prod.alta,
      cantidad: Number(Prod.cantidad),
      cantidadRestock: Number(Prod.cantidadRestock),
      ean: String(Prod.ean),
      familia: Prod.familia,
      iva: Number(Prod.iva),
      margen: Number(Prod.margen),
      nombre: Nombre,
      precioCompra: Number(Prod.precioCompra),
      precioVenta: Number(Prod.precioVenta),
      proveedor: Prod.proveedor,
      updatedAt: Prod.updatedAt,
      createdAt: Prod.createdAt,
    };

    const updatedCorrectly = await UpdateProducto(p);
    if (updatedCorrectly) {
      props.setProducto(p);
      setHayCambios(false);
    }
  };

  const Eliminar = async () => {
    const deletedCorrectly = await DeleteProducto(props.producto._id);

    if (deletedCorrectly) {
      props.showModal(false);
      props.setProducto(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Backdrop
        onClick={(e) => {
          e.stopPropagation();
          props.showModal(false);
        }}
      >
        <motion.div
          className="h-5/6 w-11/12 sm:w-5/6 flex flex-col gap-10 items-center bg-white rounded-2xl p-4"
          onClick={(e) => e.stopPropagation()}
          variants={In}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="flex flex-col w-full h-full">
            <div className="flex self-start font-semibold text-xl sm:text-2xl w-full h-auto xl:text-3xl justify-between">
              <EditableLabel
                text={Nombre}
                setText={setNombre}
                cambiosHandler={setHayCambios}
                placeholder="Nombre del producto"
                type="input"
              />
              <BorrarButton
                title={`¿Borrar producto?`}
                subtitle={`Vas a borrar ${props.producto.nombre}`}
                acceptCallback={Eliminar}
              />
            </div>
            <div className="w-full h-10 grow py-4">
              <ProductoForm
                setProducto={setProductoAux}
                producto={props.producto}
                setHayCambios={setHayCambios}
              />
            </div>
            <div className="flex w-full gap-2 text-white self-end items-end justify-around">
              <button
                className="flex justify-center items-center h-10 sm:h-12 w-full rounded-xl bg-red-500 hover:bg-red-600 shadow-lg"
                onClick={() => {
                  props.showModal(false);
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <button
                disabled={!imprimible}
                className={`${
                  imprimible
                    ? "bg-orange-500 hover:bg-orange-600"
                    : "bg-orange-400"
                } h-10 sm:h-12 w-full rounded-xl shadow-lg flex justify-center items-center`}
                onClick={Print}
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
              {hayCambios ? (
                <button
                  className={`flex bg-blue-500 hover:bg-blue-600 h-10 sm:h-12 w-full rounded-xl shadow-lg justify-center items-center`}
                  onClick={async () => {
                    await GuardarCambios(ProductoAux, props.producto._id);
                  }}
                >
                  <span className="hidden sm:inline-flex">Guardar</span>
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
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                </button>
              ) : (
                <div
                  className={`flex bg-blue-400 h-10 sm:h-12 w-full rounded-xl shadow-lg justify-center items-center `}
                >
                  <span className="hidden sm:inline-flex">Guardar</span>
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
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                </div>
              )}
            </div>
            {ProductoAux?.ean && ProductoAux?.precioVenta > 0 && imprimible && (
              <div style={{ display: "none" }}>
                <Etiqueta
                  ref={componentRef}
                  nombre={Nombre}
                  ean={ProductoAux?.ean}
                  precio={Number(ProductoAux?.precioVenta)}
                />
              </div>
            )}
          </div>
        </motion.div>
      </Backdrop>
    </motion.div>
  );
};

export default VerProducto;
