import { Cierre } from "../../tipos/Cierre";
import { notifyError, notifySuccess } from "../toastify";
import { CreateCierreList } from "../typeCreator";
import queryString from 'query-string';

export const FetchCierres = async (): Promise<Cierre[]> => {
    try {
        let cierresRes = [] as Cierre[];

        const crResponse = await fetch('/api/cierres');

        if (!crResponse.ok) { notifyError("Error al buscar los cierres de caja"); return []; }
        const crJson = await crResponse.json();

        cierresRes = CreateCierreList(crJson.data);
        return cierresRes;
    }
    catch (e) {
        console.error(e);
        notifyError("Error de conexión");
        return [];
    }
}

export const FetchCierresByQuery = async (userQuery?: string, fechas?: string[]): Promise<Cierre[]> => {
    try {
        let query: any = new Object;
        query.query = userQuery;
        query.fechas = fechas ? fechas : null;
        const queryObject = queryString.stringify(query);
        let cierresRes = [] as Cierre[];

        const crResponse = await fetch(`/api/cierres/${queryObject}`);
        if (!crResponse.ok) { notifyError("Error al buscar los cierres de caja"); return []; }

        const crJson = await crResponse.json();
        cierresRes = CreateCierreList(crJson.data);
        return cierresRes;
    }
    catch (e) {
        console.error(e);
        notifyError(String(e));
        return [];
    }
}

export const DeleteCierre = async (cierreId: string): Promise<Boolean> => {
    try {
        const pResponse = await fetch(`/api/cierres/${cierreId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const msg = await pResponse.json();

        if (!pResponse.ok) { notifyError(msg.message); return false; }
        else { notifySuccess(msg.message); return msg.successful; }
    }
    catch (e) {
        console.log(e);
        notifyError("Error de conexión");
        return false;
    }
}