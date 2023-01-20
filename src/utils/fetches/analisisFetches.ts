import {
  CreateProductoSummary,
  ProductoSummary,
} from "../../tipos/ProductoSummary";
import { Summary } from "../../tipos/Summary";
import { notifyError } from "../toastify";
import { CreateSummary } from "../typeCreator";

export const FetchResumenVentasDiario = async (
  fecha: Date
): Promise<Summary | undefined> => {
  try {
    const crResponse = await fetch(
      `/api/estadisticas/ventas/summary/${fecha.getTime()}`
    );

    if (!crResponse.ok) {
      notifyError("Error al buscar el resumen diario");
      return undefined;
    }
    const crJson = await crResponse.json();

    const summary = CreateSummary(crJson.data);
    return summary;
  } catch (e) {
    console.error(e);
    notifyError("Error de conexión");
    return undefined;
  }
};

export const FetchResumenVentasRango = async (
  fechaInicial: Date,
  fechaFinal: Date
): Promise<Summary | undefined> => {
  try {
    const crResponse = await fetch(
      `/api/estadisticas/ventas/summary/${fechaInicial.getTime()}&${fechaFinal.getTime()}`
    );

    if (!crResponse.ok) {
      notifyError("Error al buscar el resumen diario");
      return undefined;
    }
    const crJson = await crResponse.json();

    const summary = CreateSummary(crJson.data);
    return summary;
  } catch (e) {
    console.error(e);
    notifyError(`Error: ${e}`);
    return undefined;
  }
};

export const FetchResumenProductosRango = async (
  fechaInicial: Date,
  fechaFinal: Date
): Promise<ProductoSummary[] | undefined> => {
  try {
    const crResponse = await fetch(
      `/api/estadisticas/productos/summary/${fechaInicial.getTime()}&${fechaFinal.getTime()}`
    );

    if (!crResponse.ok) {
      notifyError("Error al buscar el resumen diario");
      return undefined;
    }
    const crJson = await crResponse.json();

    const summary = CreateProductoSummary(crJson.data);
    return summary;
  } catch (e) {
    console.error(e);
    notifyError(`Error: ${e}`);
    return undefined;
  }
};
