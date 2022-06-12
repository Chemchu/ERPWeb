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
        return CreateDevolucionList(devoluciones.data);
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
        return CreateDevolucionList(devoluciones.data);
    }
    catch (e) {
        console.error(e);
        notifyError("Error de conexión");
        return [];
    }
}

export const AddDevolucion = async (devolucion: Devolucion) => {
    try {
        const vRes = await fetch(`/api/devoluciones/`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                productosDevueltos: devolucion.productosDevueltos,
                dineroDevuelto: devolucion.dineroDevuelto,
                ventaId: devolucion.ventaId,
                tpv: devolucion.tpv,
                clienteId: devolucion.cliente._id,
                trabajadorId: devolucion.trabajador._id,
                modificadoPorId: devolucion.modificadoPor._id,
            })
        });

        if (!vRes.ok) {
            notifyError("Error al añadir la devolución");
            return [];
        }

        return { message: "Opsie doopsie" }
    }
    catch (err) {

    }
}