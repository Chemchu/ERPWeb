import { notifyError } from "../toastify";

export const FetchNotificaciones = async (): Promise<string[]> => {
  try {
    const prodNotificaciones = await fetch(`api/notificaciones/productos`)
    const prodJson = await prodNotificaciones.json()

    if (prodJson.data) {
      return prodJson.data;
    }
    return [];
  } catch (e: any) {
    notifyError(e);
    return [];
  }
};

