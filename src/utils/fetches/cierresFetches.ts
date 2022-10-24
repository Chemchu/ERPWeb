import { Cierre } from "../../tipos/Cierre";
import { notifyError, notifySuccess } from "../toastify";
import { CreateCierreList } from "../typeCreator";
import queryString from "query-string";
import { SesionEmpleado } from "../../tipos/Empleado";
import { FetchTPV } from "./tpvFetches";

export const FetchCierres = async (): Promise<Cierre[]> => {
  try {
    let cierresRes = [] as Cierre[];

    const crResponse = await fetch("/api/cierres");

    if (!crResponse.ok) {
      notifyError("Error al buscar los cierres de caja");
      return [];
    }
    const crJson = await crResponse.json();

    cierresRes = CreateCierreList(crJson.data);
    return cierresRes;
  } catch (e) {
    console.error(e);
    notifyError("Error de conexión");
    return [];
  }
};

export const FetchCierresByQuery = async (userQuery?: string, fechas?: string[]): Promise<Cierre[]> => {
  try {
    let query: any = new Object();
    query.query = userQuery;
    query.fechas = fechas ? fechas : null;
    const queryObject = queryString.stringify(query);
    let cierresRes = [] as Cierre[];

    const crResponse = await fetch(`/api/cierres/${queryObject}`);
    if (!crResponse.ok) {
      notifyError("Error al buscar los cierres de caja");
      return [];
    }

    const crJson = await crResponse.json();
    cierresRes = CreateCierreList(crJson.data);
    return cierresRes;
  } catch (e) {
    console.error(e);
    notifyError(String(e));
    return [];
  }
};

export const NuevoCierreTPV = async (
  Empleado: SesionEmpleado,
  setEmpleado: Function,
  TotalEfectivo: number,
  TotalTarjeta: number,
  DineroRetirado: number,
  TotalPrevistoEnCaja: number,
  TotalRealEnCaja: number,
  abortController: AbortController
): Promise<Cierre | undefined> => {
  try {
    if (!Empleado.TPV) {
      return undefined;
    }

    const Tpv = await FetchTPV(Empleado.TPV, abortController);
    if (!Tpv) {
      return undefined;
    }

    const fetchRes = await fetch(`/api/cierres/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tpv: Tpv._id,
        empleadoCerrandoId: Empleado._id,
        ventasEfectivo: TotalEfectivo,
        ventasTarjeta: TotalTarjeta,
        ventasTotales: TotalEfectivo + TotalTarjeta,
        dineroEsperadoEnCaja: TotalPrevistoEnCaja,
        dineroRealEnCaja: TotalRealEnCaja,
        dineroRetirado: DineroRetirado,
      }),
      signal: abortController.signal,
    });

    const tpvOcupadaJson = await fetchRes.json();
    if (tpvOcupadaJson.successful) {
      notifySuccess(tpvOcupadaJson.message);
      let e = Empleado;
      e.TPV = undefined;
      setEmpleado(e);
    } else {
      notifyError(tpvOcupadaJson.message);
      return undefined;
    }

    const cierre = CreateCierreList([tpvOcupadaJson.data])[0];
    return cierre;
  } catch (e) {
    console.error(e);
    notifyError("Error de conexión");

    return undefined;
  }
};

export const DeleteCierre = async (cierreId: string): Promise<Boolean> => {
  try {
    const pResponse = await fetch(`/api/cierres/${cierreId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const msg = await pResponse.json();

    if (!pResponse.ok) {
      notifyError(msg.message);
      return false;
    } else {
      notifySuccess(msg.message);
      return msg.successful;
    }
  } catch (e) {
    console.log(e);
    notifyError("Error de conexión");
    return false;
  }
};
