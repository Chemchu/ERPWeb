import getJwtFromString from "../../hooks/jwt";
import { Empleado } from "../../tipos/Empleado";
import { notifyError } from "../toastify";
import { CreateEmployee, CreateEmployeeList } from "../typeCreator";

export const FetchEmpleado = async (_id: string): Promise<Empleado | undefined> => {
    if (!_id) { throw "ID del empleado no puede ser undefined"; }

    try {
        const fetchRes = await fetch(`/api/empleado/${_id}`);

        if (!fetchRes.ok) { notifyError("Error al buscar al empleado"); return undefined; }

        const empleadoJson = await fetchRes.json();
        return CreateEmployee(empleadoJson.empleado);
    }
    catch (e) {
        console.error(e);
        notifyError("Error de conexión");

        return undefined;
    }
}

export const FetchEmpleados = async (): Promise<Empleado[]> => {
    try {
        const fetchRes = await fetch(`/api/empleado/`);

        if (!fetchRes.ok) { notifyError("Error al buscar al empleado"); return []; }

        const empleadoJson = await fetchRes.json();
        return CreateEmployeeList(empleadoJson.empleados);
    }
    catch (e) {
        console.error(e);
        notifyError("Error de conexión");

        return [];
    }
}

export const UpdateEmpleado = async (empleado: Empleado): Promise<Boolean> => {
    try {
        // const pResponse = await fetch(`/api/productos/${empleado._id}`, {
        //     method: 'PUT',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(empleado)
        // });

        // const msg = await pResponse.json();

        // if (!pResponse.ok) { notifyError(msg.message); return false; }
        // else { notifySuccess(msg.message); return msg.successful; }

        return false;

    }
    catch (e) {
        console.log(e);
        notifyError("Error de conexión");
        return false;
    }
}

export const FetchCurrentUser = async (): Promise<Empleado> => {
    try {
        const fetchRes = await fetch(`/api/currentUserToken`);
        const empleadoJson = await fetchRes.json();

        if (!fetchRes.ok) { notifyError(empleadoJson.message); return {} as Empleado; }

        const empJwt = getJwtFromString(empleadoJson.token);

        return CreateEmployee(empJwt);
    }
    catch (e) {
        console.error(e);
        notifyError("Error de conexión");

        return {} as Empleado;
    }

}