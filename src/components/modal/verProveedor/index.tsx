import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { In } from "../../../utils/animations";
import { notifyError } from "../../../utils/toastify";
import EditableLabel from "../../elementos/Forms/editableLabel";
import { Backdrop } from "../backdrop";
import BorrarButton from "../../elementos/botones/borrarButton";
import { Proveedor } from "../../../tipos/Proveedor";
import { DeleteProveedor, UpdateProveedor } from "../../../utils/fetches/proveedorFetches";

export const VerProveedor = (props: { proveedor: Proveedor; setProveedor: Function; showModal: Function }) => {
  const [Nombre, setNombre] = useState<string>(props.proveedor.nombre || "");
  const [ProveedorAux, setProveedorAux] = useState<Proveedor>();
  const [hayCambios, setHayCambios] = useState<boolean>(false);

  useEffect(() => {
    if (!ProveedorAux) {
      setHayCambios(false);
      return;
    }
  }, [ProveedorAux]);

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

  const GuardarCambios = async (proveedor: Proveedor | undefined, id: string) => {
    if (!proveedor) {
      return;
    }

    const p: Proveedor = {
      _id: id,
      cif: proveedor.cif,
      createdAt: proveedor.createdAt,
      nombre: proveedor.nombre,
      updatedAt: proveedor.updatedAt,
      contacto: proveedor.contacto,
      cp: proveedor.cp,
      direccion: proveedor.direccion,
      email: proveedor.email,
      localidad: proveedor.localidad,
      pais: proveedor.pais,
      provincia: proveedor.provincia,
      telefono: proveedor.telefono,
    };

    const updatedCorrectly = await UpdateProveedor(p);
    if (updatedCorrectly) {
      props.setProveedor(p);
      setHayCambios(false);
    }
  };

  const Eliminar = async () => {
    const deletedCorrectly = await DeleteProveedor(props.proveedor._id);

    if (deletedCorrectly) {
      props.showModal(false);
      props.setProveedor(null);
    }
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
                title={`¿Borrar proveedor?`}
                subtitle={`Algunos productos dejarán de tener este proveedor asociado`}
                acceptCallback={Eliminar}
              />
            </div>
            <div className="w-full h-10 grow py-4">

              Ver proveedor

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
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {hayCambios ? (
                <button
                  className={`flex bg-blue-500 hover:bg-blue-600 h-10 sm:h-12 w-full rounded-xl shadow-lg justify-center items-center`}
                  onClick={async () => {
                    await GuardarCambios(ProveedorAux, props.proveedor._id);
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
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
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
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </Backdrop>
    </motion.div>
  );
};

export default VerProveedor;
