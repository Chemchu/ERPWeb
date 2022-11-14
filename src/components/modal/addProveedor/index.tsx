import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { In } from "../../../utils/animations";
import { CreateProveedor } from "../../../utils/fetches/proveedorFetches";
import { notifyError, notifyLoading } from "../../../utils/toastify";
import { CreateNuevoProveedor } from "../../../utils/typeCreator";
import { Backdrop } from "../backdrop";

const AddProveedorModal = (props: { showModal: Function, okCallback: Function }) => {
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

  const CrearProveedor = async () => {
    if (!nombreRef.current?.value) {
      notifyError("No se puede crear un proveedor sin nombre");
      return;
    }

    if (!cifRef.current?.value) {
      notifyError("No se puede crear un proveedor sin CIF");
      return;
    }

    const nProveedor = CreateNuevoProveedor(nombreRef.current.value, cifRef.current.value, emailRef.current?.value,
      cTelefonoRef.current?.value, direccionRef.current?.value, localidadRef.current?.value, provinciaRef.current?.value,
      paisRef.current?.value, cpRef.current?.value, cNombreRef.current?.value, cTelefonoRef.current?.value,
      cEmailRef.current?.value);

    if (!nProveedor) {
      notifyError("No se ha podido crear el proveedor")
      return;
    }

    notifyLoading(CreateProveedor(nProveedor), "Creando nuevo proveedor...", () => {
      props.okCallback().then(() => {
        props.showModal(false);
      })
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
          <div className="flex flex-col gap-2 w-full h-full text-left">
            <span className="text-2xl xl:text-3xl cursor-default">Añadir un nuevo proveedor</span>
            <div className="flex flex-col w-full h-full grow py-2 overflow-y-auto">
              <div className="flex flex-col sm:flex-row gap-2 w-full">
                <div className="flex flex-col sm:w-1/2 w-full">
                  <div className="w-full h-20 flex flex-col">
                    <span>Nombre</span>
                    <input className="border rounded-lg p-2"
                      ref={nombreRef} />
                  </div>
                  <div className="w-full h-20 flex flex-col">
                    <span>CIF</span>
                    <input className="border rounded-lg p-2"
                      ref={cifRef} />
                  </div>
                  <div className="w-full h-20 flex flex-col">
                    <span>Correo electrónico</span>
                    <input className="border rounded-lg p-2"
                      ref={emailRef} />
                  </div>
                  <div className="w-full h-20 flex flex-col">
                    <span>Teléfono</span>
                    <input className="border rounded-lg p-2"
                      ref={telefonoRef} />
                  </div>
                  <div className="w-full h-20 flex flex-col">
                    <span>Dirección</span>
                    <input className="border rounded-lg p-2"
                      ref={direccionRef} />
                  </div>
                </div>
                <div className="flex flex-col sm:w-1/2 w-full">
                  <div className="w-full h-20 flex flex-col">
                    <span>Localidad</span>
                    <input className="border rounded-lg p-2"
                      ref={localidadRef} />
                  </div>
                  <div className="w-full h-20 flex flex-col">
                    <span>Provincia</span>
                    <input className="border rounded-lg p-2"
                      ref={provinciaRef} />
                  </div>
                  <div className="w-full h-20 flex flex-col">
                    <span>País</span>
                    <input className="border rounded-lg p-2"
                      ref={paisRef} />
                  </div>
                  <div className="w-full h-20 flex flex-col">
                    <span>Código postal</span>
                    <input className="border rounded-lg p-2"
                      ref={cpRef} />
                  </div>
                </div>
              </div>
              <div className="w-full h-20">
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
                  await CrearProveedor();
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

  const CloseDialog = () => {
    setIsOpen(false);
    if (props.cNombreRef.current) {
      props.cNombreRef.current.value = "";
    }
    if (props.cEmailRef.current) {
      props.cEmailRef.current.value = "";
    }
    if (props.cTelefonoRef.current) {
      props.cTelefonoRef.current.value = "";
    }
  }

  if (!isOpen) {
    return (
      <div className="flex items-center w-full gap-1 hover:text-blue-500 hover:underline cursor-pointer"
        onClick={() => setIsOpen(true)}>
        <span className="text-xl">Personal de contacto</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z" clipRule="evenodd" />
        </svg>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center w-full gap-1 hover:text-blue-500 hover:underline cursor-pointer"
        onClick={CloseDialog}>
        <span className="text-xl">Personal de contacto</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.75 9.25a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z" clipRule="evenodd" />
        </svg>
      </div>
      <div className="flex flex-col w-full">
        <div className="w-full h-20 flex flex-col">
          <span>Nombre de contacto</span>
          <input className="border rounded-lg p-2"
            ref={props.cNombreRef} />
        </div>
        <div className="w-full h-20 flex flex-col">
          <span>Teléfono del contacto</span>
          <input className="border rounded-lg p-2"
            ref={props.cTelefonoRef} />
        </div>
        <div className="w-full h-20 flex flex-col">
          <span>Email del contacto</span>
          <input className="border rounded-lg p-2"
            ref={props.cEmailRef} />
        </div>
      </div>
    </div>
  )
}

export default AddProveedorModal;
