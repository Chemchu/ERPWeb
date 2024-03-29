import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { useState } from "react";
import useEmpleadoContext from "../../../context/empleadoContext";
import { Empleado } from "../../../tipos/Empleado";
import { Roles } from "../../../tipos/Enums/Roles";
import { In } from "../../../utils/animations";
import { DeleteEmpleado, UpdateEmpleado } from "../../../utils/fetches/empleadoFetches";
import { notifyLoading } from "../../../utils/toastify";
import AuthorizationWrapper from "../../authorizationWrapper";
import EditableLabel from "../../elementos/Forms/editableLabel";
import EmpleadoForm from "../../elementos/Forms/empleadoForm";
import { Backdrop } from "../backdrop";
import BorrarButton from "../../elementos/botones/borrarButton";

export const VerEmpleado = (props: {
  empleado: Empleado;
  setEmpleado: Function;
  setEmpleados: Function;
  showModal: Function;
}) => {
  const [Nombre, setNombre] = useState<string>(props.empleado.nombre || "");
  const [EmpleadoAux, setEmpleadoAux] = useState<Empleado>();
  const [hayCambios, setHayCambios] = useState<boolean>(false);

  const { Empleado } = useEmpleadoContext();

  useEffect(() => {
    if (!EmpleadoAux) {
      setHayCambios(false);
      return;
    }
  }, [EmpleadoAux]);

  const GuardarCambios = async (empleado: Empleado | undefined) => {
    if (!empleado) {
      return;
    }

    const emp: Empleado = {
      _id: empleado._id,
      apellidos: empleado.apellidos,
      email: empleado.email,
      nombre: empleado.nombre,
      rol: empleado.rol,
      dni: empleado.dni,
    };

    notifyLoading(UpdateEmpleado(emp), "Actualizando..", () => {
      props.setEmpleado(emp);
      setHayCambios(false);
      props.showModal(false);
    });
  };

  const Eliminar = async () => {
    const deletedCorrectly = await DeleteEmpleado(props.empleado._id);

    if (deletedCorrectly) {
      props.setEmpleados((empleados: any) => empleados.filter((c: Empleado) => c._id !== props.empleado._id));
      props.showModal(false);
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
                disabled={Empleado.rol === Roles.Cajero && Empleado._id !== props.empleado._id}
                text={Nombre}
                setText={setNombre}
                cambiosHandler={setHayCambios}
                placeholder="Nombre del producto"
                type="input"
              />
              {AuthorizationWrapper([Roles.Administrador, Roles.Gerente])(() => {
                return (
                  <BorrarButton
                    title="¿Borrar empleado?"
                    subtitle={`Vas a borrar a ${props.empleado.nombre} (${props.empleado.email})`}
                    acceptCallback={Eliminar}
                  />
                );
              })({})}
            </div>
            <EmpleadoForm setEmpleado={setEmpleadoAux} empleado={props.empleado} setHayCambios={setHayCambios} />
            <div className="flex w-full gap-10 text-white self-end items-end justify-around">
              <button
                className="flex items-center justify-center h-12 w-full rounded-xl bg-red-500 hover:bg-red-600 shadow-lg"
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
                    await GuardarCambios(EmpleadoAux);
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
                <div className={`flex bg-blue-400 h-12 w-full rounded-xl shadow-lg justify-center items-center `}>
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

export default VerEmpleado;
