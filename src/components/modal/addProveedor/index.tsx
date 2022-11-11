import { motion } from "framer-motion";
import { useRef, useState } from "react";
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
                <div className="w-full h-auto flex flex-col">
                  <span>Nombre</span>
                  <input className="border rounded-lg p-2"
                    ref={nombreRef} />
                </div>
                <div className="w-full h-auto flex flex-col">
                  <span>CIF</span>
                  <input className="border rounded-lg p-2"
                    ref={cifRef} />
                </div>
                <div className="w-full h-auto flex flex-col">
                  <span>Correo electrónico</span>
                  <input className="border rounded-lg p-2"
                    ref={emailRef} />
                </div>
                <div className="w-full h-auto flex flex-col">
                  <span>Teléfono</span>
                  <input className="border rounded-lg p-2"
                    ref={telefonoRef} />
                </div>
                <div className="w-full h-auto flex flex-col">
                  <span>Dirección</span>
                  <input className="border rounded-lg p-2"
                    ref={direccionRef} />
                </div>

              </div>
              <div className="flex flex-col gap-2 sm:w-1/2 w-full">
                <div className="w-full h-auto flex flex-col">
                  <span>Localidad</span>
                  <input className="border rounded-lg p-2"
                    ref={localidadRef} />
                </div>
                <div className="w-full h-auto flex flex-col">
                  <span>Provincia</span>
                  <input className="border rounded-lg p-2"
                    ref={provinciaRef} />
                </div>
                <div className="w-full h-auto flex flex-col">
                  <span>País</span>
                  <input className="border rounded-lg p-2"
                    ref={paisRef} />
                </div>
                <div className="w-full h-auto flex flex-col">
                  <span>Código postal</span>
                  <input className="border rounded-lg p-2"
                    ref={cpRef} />
                </div>
                <ContactoInput
                  cEmailRef={cEmailRef}
                  cTelefonoRef={cTelefonoRef}
                  cNombreRef={cNombreRef}
                />
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

const ContactoInput = (props: {
  cNombreRef: React.RefObject<HTMLInputElement>,
  cTelefonoRef: React.RefObject<HTMLInputElement>,
  cEmailRef: React.RefObject<HTMLInputElement>
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  if (!isOpen) {
    return (
      <div className="flex items-center w-full h-full gap-1"
        onClick={() => setIsOpen(true)}>
        <span>Personal de contacto</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>

      </div>
    )
  }

  return (
    <div className="flex items-center w-full h-full gap-1"
      onClick={() => setIsOpen(false)}>
      <div>
        <span>Personal de contacto</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
          <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
        </svg>

      </div>
    </div>
  )
}

export default AddProveedorModal;
