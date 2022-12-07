import { Venta } from "../../tipos/Venta";
import { notifyError } from "../toastify";
import { CreateEmployee, CreateSalesList } from "../typeCreator";
import queryString from "query-string";
import { CustomerPaymentInformation } from "../../tipos/CustomerPayment";
import { ProductoVendido } from "../../tipos/ProductoVendido";
import { SesionEmpleado } from "../../tipos/Empleado";
import { Cliente } from "../../tipos/Cliente";

export const FetchVentas = async (): Promise<Venta[]> => {
  try {
    const vRes = await fetch(`/api/ventas/`);

    if (!vRes.ok) {
      notifyError("Error al buscar las ventas");
      return [];
    }

    const ventas = await vRes.json();
    return CreateSalesList(ventas.data);
  } catch (e) {
    console.error(e);
    notifyError("Error de conexión");
    return [];
  }
};

export const FetchVentaByQuery = async (userQuery: string, fechas?: string[]): Promise<Venta[]> => {
  try {
    let query: any = new Object();
    query.query = userQuery;
    query.fechas = fechas ? fechas : null;
    const queryObject = queryString.stringify(query);

    const vRes = await fetch(`/api/ventas/${queryObject}`);
    const resJson = await vRes.json();
    return CreateSalesList(resJson.data);
  } catch (e) {
    console.error(e);
    notifyError("Error de conexión");
    return [];
  }
};

export const FetchVentasByDateRange = async (fechaIni: Date, fechaFin: Date): Promise<Venta[]> => {
  try {
    let fechas: any = new Object();
    fechas.fechaInicial = fechaIni.valueOf();
    fechas.fechaFinal = fechaFin.valueOf();

    const f = queryString.stringify(fechas);

    const vRes = await fetch(`/api/ventas/${f}`, {
      headers: { "Content-type": "application/json" },
      method: "GET",
    });

    if (!vRes.ok) {
      notifyError("Error al buscar las ventas");
      return [];
    }

    const ventas = await vRes.json();
    return CreateSalesList(ventas.data);
  } catch (e) {
    console.error(e);
    notifyError("Error de conexión");
    return [];
  }
};

export const AddVenta = async (
  pagoCliente: CustomerPaymentInformation,
  productosEnCarrito: ProductoVendido[],
  empleado: SesionEmpleado,
  clientes: Cliente[],
  tpv: string
): Promise<{ data: any | undefined; error: boolean }> => {
  try {
    let cliente;
    if (!pagoCliente.cliente) {
      cliente = clientes.find((c) => c.nombre === "General");
    } else {
      cliente = pagoCliente.cliente;
    }

    const productosVendidos = productosEnCarrito.map((prod) => {
      prod.precioVenta = Number(prod.precioVenta);
      prod.precioFinal = Number(prod.precioFinal);
      return prod;
    });

    const addVentaRespone = await fetch(`/api/ventas/`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        productosEnCarrito: productosVendidos,
        pagoCliente: pagoCliente,
        cliente: cliente,
        empleado: CreateEmployee(empleado),
        tpv: tpv,
      }),
    });

    if (!addVentaRespone.ok) {
      notifyError("Error al añadir la venta");
      return { data: undefined, error: true };
    }

    const response = await addVentaRespone.json();

    const error = addVentaRespone.status === 200 ? false : true;
    return { data: response.data, error: error };
  } catch (err) {
    console.error(err);
    notifyError("Error de conexión");

    return { data: undefined, error: true };
  }
};

export const ModificarVenta = async (idVenta: string, tipoVenta: string
): Promise<{ data: any | undefined; error: boolean }> => {
  try {
    const addVentaRespone = await fetch(`/api/ventas/${idVenta}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({
        tipoVenta: tipoVenta
      }),
    });

    if (!addVentaRespone.ok) {
      notifyError("Error al modificar la venta");
      return { data: undefined, error: true };
    }

    const response = await addVentaRespone.json();

    const error = addVentaRespone.status === 200 ? false : true;
    return { data: response.data, error: error };
  } catch (err) {
    console.error(err);
    notifyError("Error de conexión");

    return { data: undefined, error: true };
  }
};

export const FetchVentasByTPV = async (TPV: string): Promise<Venta[]> => {
  if (!TPV) {
    throw "ID de la TPV no puede ser undefined";
  }

  try {
    const fetchVentas = await fetch(`/api/ventas/tpv/${TPV}`);

    if (!fetchVentas.ok) {
      notifyError("Error al buscar las ventas de dicha TPV");
      return [];
    }

    const ventasJson = await fetchVentas.json();

    return CreateSalesList(ventasJson.data);
  } catch (e) {
    console.error(e);
    notifyError("Error de conexión");

    return [];
  }
};

export const FetchVentasByTPVDate = async (TPV: string, fecha: string): Promise<Venta[]> => {
  if (!TPV) {
    throw "ID de la TPV no puede ser undefined";
  }

  try {
    const fetchVentasTPVPorFecha = await fetch(`/api/ventas/tpv/fecha/${TPV}/${fecha}`);
    if (!fetchVentasTPVPorFecha.ok) {
      notifyError("Error al buscar las ventas");
      return [];
    }

    const ventasJson = await fetchVentasTPVPorFecha.json();
    return CreateSalesList(ventasJson.data);
  } catch (e) {
    console.error(e);
    notifyError("Error de conexión");

    return [];
  }
};
