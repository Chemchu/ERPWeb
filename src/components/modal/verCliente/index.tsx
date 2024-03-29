import { AnimatePresence, motion } from "framer-motion";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Cliente } from "../../../tipos/Cliente";
import { Roles } from "../../../tipos/Enums/Roles";
import { In } from "../../../utils/animations";
import { DeleteCliente, UpdateCliente } from "../../../utils/fetches/clienteFetches";
import AuthorizationWrapper from "../../authorizationWrapper";
import ClienteForm from "../../elementos/Forms/clienteForm";
import EditableLabel from "../../elementos/Forms/editableLabel";
import { Backdrop } from "../backdrop";
import BorrarButton from "../../elementos/botones/borrarButton";

const VerCliente = (props: {
  showModal: Function;
  cliente: Cliente;
  setCliente: Function;
  setClientes: Dispatch<SetStateAction<Cliente[]>>;
}) => {
  const [nombre, setNombre] = useState<string>(props.cliente.nombre);
  const [hayCambios, setHayCambios] = useState<boolean>(false);
  const [clienteAux, setClienteAux] = useState<Cliente>(props.cliente);

  const GuardarCliente = async () => {
    let cli = clienteAux;
    cli.nombre = nombre;
    cli._id = props.cliente._id;

    const result = await UpdateCliente(cli);

    if (result) {
      props.setCliente(clienteAux);
      props.showModal(false);
    }
  };

  const Eliminar = async () => {
    const deletedCorrectly = await DeleteCliente(props.cliente._id);

    if (deletedCorrectly) {
      props.showModal(false);
      props.setClientes((clientes) => clientes.filter((c: Cliente) => c._id !== props.cliente._id));
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
          className="h-5/6 w-5/6 flex flex-col gap-10 items-center bg-white rounded-2xl p-4"
          onClick={(e) => e.stopPropagation()}
          variants={In}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="flex flex-col gap-4 w-full h-full">
            <div className="flex self-start font-semibold text-2xl w-full h-auto xl:text-3xl justify-between">
              <EditableLabel
                text={nombre}
                setText={setNombre}
                cambiosHandler={setHayCambios}
                placeholder="Nombre del cliente"
                type="input"
              />
              {AuthorizationWrapper([Roles.Administrador, Roles.Gerente])(() => {
                return (
                  <BorrarButton
                    title="¿Borrar cliente?"
                    subtitle={`Vas a borrar a ${props.cliente.nombre} (${props.cliente.nif})`}
                    acceptCallback={Eliminar}
                  />
                );
              })({})}
            </div>
            <ClienteForm setCliente={setClienteAux} cliente={clienteAux} setHayCambios={setHayCambios} />
            <div className="flex w-full gap-4 justify-around items-end text-white">
              <button
                className="flex items-center justify-center w-full h-12 rounded-xl bg-red-500 hover:bg-red-600 shadow-lg"
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
                  className={`flex bg-blue-500 hover:bg-blue-600 h-12 w-full rounded-xl shadow-lg justify-center items-center`}
                  onClick={async () => {
                    await GuardarCliente();
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
                <div className={`flex bg-blue-400 h-12 w-full rounded-xl shadow-lg justify-center items-center`}>
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

export default VerCliente;
