import { Summary } from "../../tipos/Summary";
import { notifyError } from "../toastify";
import { CreateSummary } from "../typeCreator";

export const FetchResumenDiario = async (fecha: Date): Promise<Summary | undefined> => {
    try {
        const crResponse = await fetch(`/api/estadisticas/summary/${fecha.getTime()}`);

        if (!crResponse.ok) { notifyError("Error al buscar el resumen diario"); return undefined; }
        const crJson = await crResponse.json();

        const summary = CreateSummary(crJson.data);
        return summary;
    }
    catch (e) {
        console.error(e);
        notifyError("Error de conexión");
        return undefined;
    }
}

export const FetchResumenRango = async (fecha: Date): Promise<Summary | undefined> => {
    try {
        const crResponse = await fetch(`/api/estadisticas/summary/${fecha.getTime()}`);

        if (!crResponse.ok) { notifyError("Error al buscar el resumen diario"); return undefined; }
        const crJson = await crResponse.json();

        const summary = CreateSummary(crJson.data);
        return summary;
    }
    catch (e) {
        console.error(e);
        notifyError("Error de conexión");
        return undefined;
    }
}
