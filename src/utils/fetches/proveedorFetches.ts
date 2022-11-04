import { notifyError, notifySuccess } from "../toastify";
import { Proveedor } from "../../tipos/Proveedor";
import { CreateProveedorList } from "../typeCreator";

export const FetchProveedores = async (): Promise<Proveedor[]> => {
  try {
    let provRes = [] as Proveedor[];
    const pResponse = await fetch("/api/proveedores");

    if (!pResponse.ok) {
      notifyError("Error al buscar los proveedores");
      return [];
    }

    const resJson = await pResponse.json();

    provRes = CreateProveedorList(resJson.data);
    return provRes;
  } catch (e: any) {
    notifyError(e);
    return [];
  }
};

export const UpdateProveedor = async (proveedor: Proveedor): Promise<Boolean> => {
  try {
    const pResponse = await fetch(`/api/proveedores/${proveedor._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(proveedor),
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

export const CreateProveedor = async (proveedor: Proveedor): Promise<{ message: string; successful: boolean }> => {
  try {
    const pResponse = await fetch(`/api/proveedores`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(proveedor),
    });

    const msg = await pResponse.json();
    return { message: msg.message, successful: msg.successful };
  } catch (e) {
    console.log(e);
    return { message: "Error: " + String(e), successful: false };
  }
};

export const DeleteProveedor = async (proveedorId: string): Promise<Boolean> => {
  try {
    const pResponse = await fetch(`/api/proveedores/${proveedorId}`, {
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
