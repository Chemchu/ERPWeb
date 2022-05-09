import { Devolucion } from "../../tipos/Devolucion";
import { notifyError } from "../toastify";
import { CreateDevolucionList } from "../typeCreator";

export const FetchDevoluciones = async (): Promise<Devolucion[]> => {
    try {
        const vRes = await fetch(`/api/devoluciones/`);

        if (!vRes.ok) {
            notifyError("Error al buscar las devoluciones");
            return [];
        }

        const devoluciones = await vRes.json();
        return CreateDevolucionList(JSON.parse(devoluciones.data));
    }
    catch (e) {
        console.error(e);
        notifyError("Error de conexión");
        return [];
    }
}

export const FetchDevolucionesByQuery = async (query: string): Promise<Devolucion[]> => {
    try {
        const vRes = await fetch(`/api/devoluciones/`);

        if (!vRes.ok) {
            notifyError("Error al buscar las devoluciones");
            return [];
        }

        const devoluciones = await vRes.json();
        return CreateDevolucionList(JSON.parse(devoluciones.data));
    }
    catch (e) {
        console.error(e);
        notifyError("Error de conexión");
        return [];
    }
}