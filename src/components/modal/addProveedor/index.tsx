import { motion } from "framer-motion";
import { useRef } from "react";
import { NuevoProveedor } from "../../../tipos/Proveedor";
import { In } from "../../../utils/animations";
import { notifyError, notifyLoading } from "../../../utils/toastify";
import { Backdrop } from "../backdrop";

const AddProveedorModal = (props: { showModal: Function }) => {
  const nombreRef = useRef<HTMLInputElement>(null)
  const cifRef = useRef<HTMLInputElement>(null)
  const telefonoRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const direccionRef = useRef<HTMLInputElement>(null)
  const localidadRef = useRef<HTMLInputElement>(null)
  const provinciaRef = useRef<HTMLInputElement>(null)
  const cpRef = useRef<HTMLInputElement>(null)
  const paisRef = useRef<HTMLInputElement>(null)
  const cNombreRef = useRef<HTMLInputElement>(null)
  const cTelefonoRef = useRef<HTMLInputElement>(null)
  const cEmailRef = useRef<HTMLInputElement>(null)

  const CrearProveedor = async (Prod: NuevoProveedor | undefined) => {
    if (!Prod) {
      notifyError("Error con el producto");
      return;
    }
    // notifyLoading(CreateProducto(Prod), "Creando producto...", () => {
    //   props.showModal(false);
    // });
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
          <div className="flex flex-col gap-2 w-full h-full text-left">
            <span className="text-2xl xl:text-3xl cursor-default">Añadir un nuevo proveedor</span>
            <div className="flex flex-col sm:flex-row gap-2 w-full h-full grow py-2 overflow-y-auto">
              <div className="flex flex-col gap-2 sm:w-1/2 w-full">
                <div className="w-full h-auto flex flex-col gap-1">
                  <span>Nombre</span>
                  <input className="border rounded-lg p-2"
                    ref={nombreRef} />
                </div>
                <div className="w-full h-auto flex flex-col gap-1">
                  <span>CIF</span>
                  <input className="border rounded-lg p-2"
                    ref={cifRef} />
                </div>
                <div className="w-full h-auto flex flex-col gap-1">
                  <span>Correo electrónico</span>
                  <input className="border rounded-lg p-2"
                    ref={emailRef} />
                </div>
                <div className="w-full h-auto flex flex-col gap-1">
                  <span>Teléfono</span>
                  <input className="border rounded-lg p-2"
                    ref={telefonoRef} />
                </div>
              </div>
              <div className="flex flex-col gap-2 sm:w-1/2 w-full">
                <div className="w-full h-auto flex flex-col gap-1">
                  <span>Dirección</span>
                  <input className="border rounded-lg p-2"
                    ref={direccionRef} />
                </div>
                <div className="w-full h-auto flex flex-col gap-1">
                  <span>Localidad</span>
                  <input className="border rounded-lg p-2"
                    ref={localidadRef} />
                </div>
                <div className="w-full h-auto flex flex-col gap-1">
                  <span>Provincia</span>
                  <input className="border rounded-lg p-2"
                    ref={provinciaRef} />
                </div>
                <div className="w-full h-auto flex flex-col gap-1">
                  <span>País</span>
                  <input className="border rounded-lg p-2"
                    ref={paisRef} />
                </div>
                <div className="w-full h-auto flex flex-col gap-1">
                  <span>Código postal</span>
                  <input className="border rounded-lg p-2"
                    ref={cpRef} />
                </div>
              </div>
            </div>

            <div className="flex w-full h-auto items-end justify-around text-white gap-10">
              <button
                className="h-10 w-full rounded-xl bg-red-500 hover:bg-red-600 shadow-lg"
                onClick={() => props.showModal(false)}
              >
                Cancelar
              </button>
              <button
                className="h-10 w-full rounded-xl bg-blue-500 hover:bg-blue-600 shadow-lg"
                onClick={async () => {
                  // await CrearProveedor(Proveedor);
                }}
              >
                Añadir proveedor
              </button>
            </div>
          </div>
        </motion.div>
      </Backdrop>
    </motion.div>
  );
};

export default AddProveedorModal;
