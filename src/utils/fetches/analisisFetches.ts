import { Summary } from "../../tipos/Summary";
import { notifyError } from "../toastify";
import { CreateSummary } from "../typeCreator";

export const FetchResumenDiario = async (fecha: Date): Promise<Summary | undefined> => {
    try {
        const crResponse = await fetch(`/api/cierres/${fecha.getMilliseconds()}`);

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
