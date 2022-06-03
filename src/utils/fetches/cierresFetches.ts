import { Cierre } from "../../tipos/Cierre";
import { notifyError } from "../toastify";
import { CreateCierreList } from "../typeCreator";

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
