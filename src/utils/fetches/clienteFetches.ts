import { Cliente } from "../../tipos/Cliente";
import { notifyError, notifySuccess } from "../toastify";
import { CreateClientList } from "../typeCreator";
import queryString from "query-string";

export const FetchClientes = async (): Promise<Cliente[]> => {
  try {
    const cResponse = await fetch("/api/clientes");
    const cJson = await cResponse.json();

    if (!cResponse.ok) {
      notifyError(cJson.message);
      return [];
    }

    return CreateClientList(cJson.data);
  } catch (e) {
    console.error(e);
    notifyError("Error de conexión");
    return [];
  }
};

export const FetchClientesByQuery = async (userQuery: string): Promise<Cliente[]> => {
  try {
    let id: any = new Object();
    id.query = userQuery.valueOf();

    const query = queryString.stringify(id);
    const cResponse = await fetch(`/api/clientes/${query}`);

    if (!cResponse.ok) {
      notifyError("Error al buscar los clientes");
      return [];
    }
    const cJson = await cResponse.json();

    return CreateClientList(cJson.data);
  } catch (e) {
    console.error(e);
    notifyError("Error de conexión");
    return [];
  }
};

export const CreateClientes = async (cliente: Cliente): Promise<Boolean> => {
  try {
    const cResponse = await fetch("/api/clientes", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        nif: cliente.nif,
        nombre: cliente.nombre,
        cp: cliente.cp,
        calle: cliente.calle,
      }),
    });
    const cJson = await cResponse.json();

    if (!cResponse.ok) {
      notifyError(cJson.message);
      return false;
    }

    return cJson.successful;
  } catch (e) {
    console.error(e);
    notifyError("Error de conexión");
    return false;
  }
};

export const UpdateCliente = async (cliente: Cliente): Promise<Boolean> => {
  try {
    const pResponse = await fetch(`/api/clientes/${cliente._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cliente),
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

export const DeleteCliente = async (clienteId: string): Promise<Boolean> => {
  try {
    const pResponse = await fetch(`/api/clientes/${clienteId}`, {
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
