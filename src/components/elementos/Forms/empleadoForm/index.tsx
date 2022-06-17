import { useEffect, useState } from "react";
import useEmpleadoContext from "../../../../context/empleadoContext";
import { Empleado } from "../../../../tipos/Empleado";
import { Roles } from "../../../../tipos/Enums/Roles";
import SimpleListBox from "../simpleListBox";

const EmpleadoForm = (props: { disabled?: boolean, setEmpleado: Function, empleado?: Empleado, setHayCambios?: Function }) => {
    const [Nombre, setNombre] = useState<string>(props.empleado?.nombre || "");
    const [Apellidos, setApellidos] = useState<string>(props.empleado?.apellidos || "");
    const [Correo, setCorreo] = useState<string>(props.empleado?.email || "");
    const [Dni, setDni] = useState<string>(props.empleado?.dni || "");
    const [Rol, setRol] = useState<Roles>(Roles[props.empleado?.rol as keyof typeof Roles] || Roles.Cajero);
    const { Empleado } = useEmpleadoContext();

    useEffect(() => {
        const emp: Empleado = {
            _id: "Creando",
            nombre: Nombre,
            apellidos: Apellidos,
            email: Correo,
            rol: Rol,
            dni: Dni,
        }
        props.setEmpleado(emp);

    }, [Nombre, Correo, Apellidos, Dni, Rol]);

    return (
        <form className="flex flex-col gap-4 w-full pt-10">
            {
                props.empleado &&
                <div className="w-full">
                    <label className="block tracking-wide text-gray-700 font-bold">
                        ID
                    </label>
                    <input disabled className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" type="text"
                        value={props.empleado._id} />
                </div>
            }
            <div className="flex gap-10 w-full ">
                <div className="flex flex-col gap-4 w-1/2 h-full ">

                    <div>
                        <label className="block tracking-wide text-gray-700 font-bold">
                            Nombre
                        </label>
                        <input disabled={props.disabled} className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white ring-blue-500" type="text" placeholder="Por ejemplo `John Doe`"
                            value={Nombre} onChange={(e) => { setNombre(e.target.value); props.setHayCambios && props.setHayCambios(true); }} />
                    </div>
                    <div className="w-full">
                        <label className="block tracking-wide text-gray-700 font-bold">
                            Correo electrónico
                        </label>
                        <input disabled={props.disabled} className="appearance-none ring-blue-500 block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Su dirección de correo electrónico"
                            value={Correo} onChange={(e) => { setCorreo(e.target.value); props.setHayCambios && props.setHayCambios(true); }} />
                    </div>
                    {
                        !props.empleado ?
                            <div className="w-full">
                                <label className="block tracking-wide text-gray-700 font-bold">
                                    Rol
                                </label>
                                <SimpleListBox elementos={[Roles.Cajero, Roles.Gerente]} setElemento={setRol} />
                            </div>
                            :
                            <div className="w-full">
                                <label className="block tracking-wide text-gray-700 font-bold">
                                    Rol
                                </label>
                                <SimpleListBox disabled={props.disabled} elementos={[Roles.Cajero, Roles.Gerente, Roles.Administrador]} setElemento={setRol} defaultValue={props.empleado.rol} />
                            </div>
                    }

                </div>
                <div className="flex flex-col gap-4 w-1/2">
                    <div className="w-full">
                        <label className="block tracking-wide text-gray-700 font-bold">
                            Apellidos
                        </label>
                        <input disabled={props.disabled} className="appearance-none ring-blue-500 block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="Apellidos del nuevo empleado"
                            value={Apellidos} onChange={(e) => { setApellidos(e.target.value); props.setHayCambios && props.setHayCambios(true); }} />
                    </div>
                    <div className="w-full">
                        <label className="block tracking-wide text-gray-700 font-bold">
                            DNI o NIE
                        </label>
                        <input disabled={props.disabled} className="appearance-none ring-blue-500 block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Número del documento de identidad"
                            value={Dni} onChange={(e) => { setDni(e.target.value); props.setHayCambios && props.setHayCambios(true); }} />
                    </div>
                </div>
            </div>
        </form>

    )
}

export default EmpleadoForm;