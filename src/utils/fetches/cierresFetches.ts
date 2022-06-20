import { Cierre } from "../../tipos/Cierre";
import { notifyError } from "../toastify";
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

export const FetchCierresByQuery = async (userQuery: string, fechas?: string[]): Promise<Cierre[]> => {
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
        notifyError("Error de conexión");
        return [];
    }
}
