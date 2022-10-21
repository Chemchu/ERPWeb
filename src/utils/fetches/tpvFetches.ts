import { SesionEmpleado } from "../../tipos/Empleado";
import { ITPV } from "../../tipos/TPV";
import { notifyError, notifySuccess } from "../toastify";
import { CreateCierreList, CreateTPV, CreateTPVsList } from "../typeCreator";
import queryString from 'query-string';
import { Cierre } from "../../tipos/Cierre";

export const FetchTPV = async (TPVId: string, abortController: AbortController): Promise<ITPV | undefined> => {
    if (!TPVId) { throw "ID de la TPV no puede ser undefined"; }

    try {
        const f = queryString.stringify({ TPVId: TPVId });
        const fetchTPV = await fetch(`/api/tpv/${f}`, { signal: abortController.signal });

        if (!fetchTPV.ok) { notifyError("Error al buscar la TPV"); return undefined; }

        const tpvJson = await fetchTPV.json();
        return CreateTPV(tpvJson.data);
    }
    catch (e) {
        console.error(e);
        notifyError("Error de conexión");
        return undefined;
    }
}

export const FetchTPVs = async (): Promise<ITPV[]> => {
    try {
        const fetchTPV = await fetch(`/api/tpv/`);

        if (!fetchTPV.ok) { notifyError("Error al buscar la TPV"); return []; }

        const tpvJson = await fetchTPV.json();

        return CreateTPVsList(tpvJson.data);
    }
    catch (e) {
        console.error(e);
        notifyError("Error de conexión");
        return [];
    }
}

export const OcuparTPV = async (tpvId: string, emp: SesionEmpleado, cajaInicial: number, setEmpleado: Function): Promise<boolean> => {
    try {
        const f = queryString.stringify({ ocuparTpv: true });
        const fetchRes = await fetch(`/api/tpv/${f}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ tpvId: tpvId, empId: emp._id, cajaInicial: cajaInicial })
            });
        const responseJson = await fetchRes.json();

        if (fetchRes.ok) {
            notifySuccess(responseJson.message);
            let e = emp;
            e.TPV = tpvId;
            setEmpleado(e);
        }
        else { notifyError(responseJson.message); }

        return responseJson.successful;
    }
    catch (e) {
        console.error(e);
        notifyError("Error de conexión");

        return false;
    }
}

export const TransferirTPV = async (tpvId: string, empDestinoId: string): Promise<{ message: string, successful: boolean }> => {
    try {
        const f = queryString.stringify({ transferirTpv: true });
        const fetchRes = await fetch(`/api/tpv/${f}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ tpvId: tpvId, empDestinoId: empDestinoId })
            });

        const responseJson = await fetchRes.json();
        return { message: responseJson.message, successful: responseJson.successful };
    }
    catch (e) {
        console.error(e);
        return { message: "Error: " + e, successful: false };
    }
}

export const FetchTPVsByDisponibilidad = async (isTpvFree: boolean, abortController: AbortController): Promise<ITPV[] | undefined> => {
    try {
        const f = queryString.stringify({ isTpvFree: isTpvFree });
        const fetchTPV = await fetch(`/api/tpv/${f}`, { signal: abortController.signal });

        if (!fetchTPV.ok) { notifyError("Error al buscar la TPV"); return []; }

        const tpvJson = await fetchTPV.json();
        return CreateTPVsList(tpvJson.data);
    }
    catch (e) {
        console.error(e);
        notifyError("Error de conexión");
        return undefined;
    }
}