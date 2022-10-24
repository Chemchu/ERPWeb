import { Producto } from "../../tipos/Producto";
import { notifyError, notifySuccess } from "../toastify";
import { CreateProductList } from "../typeCreator";
import queryString from "query-string";
import { TipoProductos } from "../../tipos/Enums/TipoProductos";

export const FetchProductos = async (tipoProductos?: TipoProductos): Promise<Producto[]> => {
  try {
    let prodRes = [] as Producto[];
    const pResponse = await fetch("/api/productos");

    if (!pResponse.ok) {
      notifyError("Error al buscar los productos");
      return [];
    }

    const resJson = await pResponse.json();

    prodRes = CreateProductList(resJson.data);
    if (tipoProductos === TipoProductos.Alta) {
      return prodRes.filter((p) => {
        return p.alta === true;
      });
    }
    if (tipoProductos === TipoProductos.Baja) {
      return prodRes.filter((p) => {
        return p.alta === false;
      });
    }

    return prodRes;
  } catch (e: any) {
    notifyError(e);
    return [];
  }
};

export const FetchProductoByQuery = async (userQuery: string, tipoProductos?: TipoProductos): Promise<Producto[]> => {
  try {
    let prodRes = [] as Producto[];
    let id: any = new Object();
    id.query = userQuery.valueOf();

    const query = queryString.stringify(id);

    const pResponse = await fetch(`/api/productos/${query}`);

    if (!pResponse.ok) {
      notifyError("Error al buscar los productos");
      return [];
    }

    const pJson = await pResponse.json();

    prodRes = CreateProductList(pJson.productos);
    if (tipoProductos === TipoProductos.Alta) {
      return prodRes.filter((p) => {
        return p.alta === true;
      });
    }
    if (tipoProductos === TipoProductos.Baja) {
      return prodRes.filter((p) => {
        return p.alta === false;
      });
    }

    return prodRes;
  } catch (e) {
    console.log(e);
    notifyError("Error de conexión");
    return [];
  }
};

export const UpdateProducto = async (producto: Producto): Promise<Boolean> => {
  try {
    const pResponse = await fetch(`/api/productos/${producto._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(producto),
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

export const CreateProducto = async (producto: Producto): Promise<{ message: string; successful: boolean }> => {
  try {
    const pResponse = await fetch(`/api/productos/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(producto),
    });

    const msg = await pResponse.json();
    return { message: msg.message, successful: msg.successful };
  } catch (e) {
    console.log(e);
    return { message: "Error: " + String(e), successful: false };
  }
};

export const DeleteProducto = async (productoId: string): Promise<Boolean> => {
  try {
    const pResponse = await fetch(`/api/productos/${productoId}`, {
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
