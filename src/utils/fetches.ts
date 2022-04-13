import { Cierre } from "../tipos/Cierre";
import { Cliente } from "../tipos/Cliente";
import { CustomerPaymentInformation } from "../tipos/CustomerPayment";
import { Empleado, SesionEmpleado } from "../tipos/Empleado";
import { Producto } from "../tipos/Producto";
import { ProductoVendido } from "../tipos/ProductoVendido";
import { Venta } from "../tipos/Venta";
import { CreateCierreList, CreateClientList, CreateDevolucionList, CreateEmployee, CreateProductList, CreateSalesList, CreateTPV, CreateTPVsList } from "./typeCreator";
import queryString from 'query-string';
import { notifyError, notifySuccess } from "./toastify";
import { TPVType } from "../tipos/TPV";
import { Devolucion } from "../tipos/Devolucion";
import { getJwtFromString } from "../hooks/jwt";

export const FetchProductos = async (): Promise<Producto[]> => {
    try {
        let prodRes = [] as Producto[];

        const pResponse = await fetch('/api/productos');

        if (!pResponse.ok) { notifyError("Error al buscar los productos"); return []; }

        const pJson = await pResponse.json();

        prodRes = CreateProductList(pJson.productos);
        return prodRes.filter((p) => { return p.alta === true });
    }
    catch (e) {
        console.log(e);
        notifyError("Error de conexión");
        return [];
    }

}

export const FetchProductoByQuery = async (userQuery: string): Promise<Producto[]> => {
    try {
        let prodRes = [] as Producto[];
        let id: any = new Object;
        id.query = userQuery.valueOf();

        const query = queryString.stringify(id);

        const pResponse = await fetch(`/api/productos/${query}`);

        if (!pResponse.ok) { notifyError("Error al buscar los productos"); return []; }

        const pJson = await pResponse.json();

        prodRes = CreateProductList(pJson.productos);
        return prodRes.filter((p) => { return p.alta === true });
    }
    catch (e) {
        console.log(e);
        notifyError("Error de conexión");
        return [];
    }

}

export const UpdateProducto = async (producto: Producto): Promise<Boolean> => {
    try {
        const pResponse = await fetch(`/api/productos/${producto._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(producto)
        });

        const msg = await pResponse.json();

        if (!pResponse.ok) { notifyError(msg.message); return false; }
        else { notifySuccess(msg.message); return msg.successful; }

    }
    catch (e) {
        console.log(e);
        notifyError("Error de conexión");
        return false;
    }
}

export const CreateProducto = async (producto: Producto): Promise<Boolean> => {
    try {
        const pResponse = await fetch(`/api/productos/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(producto)
        });

        const msg = await pResponse.json();

        if (!pResponse.ok) { notifyError(msg.message); return false; }
        else { notifySuccess(msg.message); return msg.successful; }
    }
    catch (e) {
        console.log(e);
        notifyError("Error de conexión");
        return false;
    }
}

export const DeleteProducto = async (productoId: string): Promise<Boolean> => {
    try {
        const pResponse = await fetch(`/api/productos/${productoId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const msg = await pResponse.json();

        if (!pResponse.ok) { notifyError(msg.message); return false; }
        else { notifySuccess(msg.message); return msg.successful; }
    }
    catch (e) {
        console.log(e);
        notifyError("Error de conexión");
        return false;
    }
}

export const FetchClientes = async (): Promise<Cliente[]> => {
    try {
        const cResponse = await fetch('/api/clientes', {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                find: {},
                limit: 50,
                neededValues: ["_id", "nombre", "nif", "calle", "cp"]
            })
        });

        if (!cResponse.ok) {
            notifyError("Error al buscar los clientes");
            return [];
        }
        const cJson = await cResponse.json();

        return CreateClientList(cJson.clientes);
    }
    catch (e) {
        console.error(e);
        notifyError("Error de conexión");
        return [];
    }
}

export const FetchVentas = async (): Promise<Venta[]> => {
    try {
        const vRes = await fetch(`/api/ventas/`);

        if (!vRes.ok) {
            notifyError("Error al buscar las ventas");
            return [];
        }

        const ventas = await vRes.json();
        return CreateSalesList(JSON.parse(ventas.data));
    }
    catch (e) {
        console.error(e);
        notifyError("Error de conexión");
        return [];
    }
}

export const FetchDevoluciones = async (): Promise<Devolucion[]> => {
    try {
        const vRes = await fetch(`/api/devoluciones/`);

        if (!vRes.ok) {
            notifyError("Error al buscar las devoluciones");
            return [];
        }

        const devoluciones = await vRes.json();
        return CreateDevolucionList(JSON.parse(devoluciones.data));
    }
    catch (e) {
        console.error(e);
        notifyError("Error de conexión");
        return [];
    }
}

// TODO: que busque por query
export const FetchDevolucionesByQuery = async (query: string): Promise<Devolucion[]> => {
    try {
        const vRes = await fetch(`/api/devoluciones/`);

        if (!vRes.ok) {
            notifyError("Error al buscar las devoluciones");
            return [];
        }

        const devoluciones = await vRes.json();
        return CreateDevolucionList(JSON.parse(devoluciones.data));
    }
    catch (e) {
        console.error(e);
        notifyError("Error de conexión");
        return [];
    }
}

export const FetchVentasByDateRange = async (fechaIni: Date, fechaFin: Date): Promise<Venta[]> => {
    try {
        let fechas: any = new Object;
        fechas.fechaInicial = fechaIni.valueOf();
        fechas.fechaFinal = fechaFin.valueOf();

        const f = queryString.stringify(fechas);

        const vRes = await fetch(`/api/ventas/${f}`, {
            headers: { 'Content-type': 'application/json' },
            method: 'GET',
        });

        if (!vRes.ok) {
            notifyError("Error al buscar las ventas");
            return [];
        }

        const ventas = await vRes.json();
        return CreateSalesList(ventas.data.ventas);
    }
    catch (e) {
        console.error(e);
        notifyError("Error de conexión");
        return [];
    }
}

export const FetchVenta = async (id: string): Promise<Venta[]> => {
    try {
        let query: any = new Object;
        query.id = id;
        const idVenta = queryString.stringify(query);

        const vRes = await fetch(`/api/ventas/${idVenta}`);

        const ventas = await vRes.json();
        return CreateSalesList([ventas.data.venta]);
    }
    catch (e) {
        console.error(e);
        notifyError("Error de conexión");
        return [];
    }
}

export const AddVenta = async (pagoCliente: CustomerPaymentInformation, productosEnCarrito: ProductoVendido[], empleado: SesionEmpleado, clientes: Cliente[], tpv: string): Promise<{ data: any, error: boolean }> => {
    try {
        let cliente;
        if (!pagoCliente.cliente) {
            cliente = clientes.find((c) => c.nombre === "General");
        }
        else {
            cliente = pagoCliente.cliente;
        }

        const addventaRespone = await fetch(`/api/ventas/`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                productosEnCarrito: productosEnCarrito,
                pagoCliente: pagoCliente,
                cliente: cliente,
                empleado: CreateEmployee(empleado),
                tpv: tpv
            })
        });

        if (!addventaRespone.ok) { notifyError("Error al añadir la venta"); return { data: undefined, error: true } }

        const data = await addventaRespone.json();

        const error = addventaRespone.status === 200 ? false : true;
        return { data: data.addVenta, error: error };
    }
    catch (err) {
        console.error(err);
        notifyError("Error de conexión");

        return { data: undefined, error: true }
    }
}

export const FetchEmpleado = async (_id: string): Promise<Empleado | undefined> => {
    if (!_id) { throw "ID del empleado no puede ser undefined"; }

    try {
        const fetchRes = await fetch(`/api/empleado/${_id}`);

        if (!fetchRes.ok) { notifyError("Error al buscar al empleado"); return undefined; }

        const empleadoJson = await fetchRes.json();
        return CreateEmployee(empleadoJson.empleado);
    }
    catch (e) {
        console.error(e);
        notifyError("Error de conexión");

        return undefined;
    }
}

export const FetchVentasByTPV = async (TPV: string): Promise<Venta[]> => {
    if (!TPV) { throw "ID de la TPV no puede ser undefined"; }

    try {
        const fetchVentas = await fetch(`/api/ventas/tpv/${TPV}`);

        if (!fetchVentas.ok) { notifyError("Error al buscar las ventas de dicha TPV"); return []; }

        const ventasJson = await fetchVentas.json();

        return CreateSalesList(JSON.parse(ventasJson.ventas));
    }
    catch (e) {
        console.error(e);
        notifyError("Error de conexión");

        return [];
    }
}

export const FetchVentasByTPVDate = async (TPV: string, fecha: string): Promise<Venta[]> => {
    if (!TPV) { throw "ID de la TPV no puede ser undefined"; }

    try {
        const fetchVentasTPVPorFecha = await fetch(`/api/ventas/tpv/fecha/${TPV}/${fecha}`);

        if (!fetchVentasTPVPorFecha.ok) { notifyError("Error al buscar las ventas"); return []; }

        const ventasJson = await fetchVentasTPVPorFecha.json();
        return CreateSalesList(JSON.parse(ventasJson.ventas));
    }
    catch (e) {
        console.error(e);
        notifyError("Error de conexión");

        return [];
    }
}

export const FetchTPV = async (TPVId: string): Promise<TPVType | undefined> => {
    if (!TPVId) { throw "ID de la TPV no puede ser undefined"; }

    try {
        const f = queryString.stringify({ TPVId: TPVId });
        const fetchTPV = await fetch(`/api/tpv/${f}`);

        if (!fetchTPV.ok) { notifyError("Error al buscar la TPV"); return undefined; }

        const tpvJson = await fetchTPV.json();

        return CreateTPV(JSON.parse(tpvJson.tpv));
    }
    catch (e) {
        console.error(e);
        notifyError("Error de conexión");
        return undefined;
    }
}

export const FetchTPVs = async (): Promise<TPVType[]> => {
    try {
        const fetchTPV = await fetch(`/api/tpv/`);

        if (!fetchTPV.ok) { notifyError("Error al buscar la TPV"); return []; }

        const tpvJson = await fetchTPV.json();
        return CreateTPVsList(JSON.parse(tpvJson.tpvs));
    }
    catch (e) {
        console.error(e);
        notifyError("Error de conexión");
        return [];
    }
}

export const FetchTPVsByDisponibilidad = async (isTpvFree: boolean): Promise<TPVType[]> => {
    try {
        const f = queryString.stringify({ isTpvFree: isTpvFree });
        const fetchTPV = await fetch(`/api/tpv/${f}`);

        if (!fetchTPV.ok) { notifyError("Error al buscar la TPV"); return []; }

        const tpvJson = await fetchTPV.json();
        return CreateTPVsList(JSON.parse(tpvJson.tpv));
    }
    catch (e) {
        console.error(e);
        notifyError("Error de conexión");
        return [];
    }
}

export const FetchCierres = async (): Promise<Cierre[]> => {
    try {
        let cierresRes = [] as Cierre[];

        const crResponse = await fetch('/api/cierres');

        if (!crResponse.ok) { notifyError("Error al buscar los cierres de caja"); return []; }
        const crJson = await crResponse.json();

        cierresRes = CreateCierreList(crJson.cierresTPVs);
        return cierresRes;
    }
    catch (e) {
        console.error(e);
        notifyError("Error de conexión");
        return [];
    }
}

export const FetchCurrentUser = async (): Promise<Empleado> => {
    try {
        const fetchRes = await fetch(`/api/currentUserToken`);
        const empleadoJson = await fetchRes.json();

        if (!fetchRes.ok) { notifyError(empleadoJson.message); return {} as Empleado; }

        const empJwt = getJwtFromString(empleadoJson.token);

        return CreateEmployee(empJwt);
    }
    catch (e) {
        console.error(e);
        notifyError("Error de conexión");

        return {} as Empleado;
    }

}

export const FetchCurrentUserUsingTPV = async (): Promise<boolean> => {
    try {
        const fetchRes = await fetch(`/api/currentUserToken`);
        const empleadoJson = await fetchRes.json();

        if (!fetchRes.ok) { notifyError(empleadoJson.message); return false; }

        const empJwt = getJwtFromString(empleadoJson.token);

        return !!empJwt.TPV;
    }
    catch (e) {
        console.error(e);
        notifyError("Error de conexión");

        return false;
    }

}

export const OcuparTPV = async (tpvId: string, emp: SesionEmpleado, cajaInicial: number, setEmpleado: Function): Promise<boolean> => {
    try {
        const f = queryString.stringify({ ocuparTpv: true });
        const fetchRes = await fetch(`/api/tpv/${f}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ tpvId: tpvId, empId: emp._id, cajaInicial: cajaInicial })
            });
        const tpvOcupadaJson = await fetchRes.json();

        if (fetchRes.ok) {
            notifySuccess(tpvOcupadaJson.message);
            let e = emp;
            e.TPV = tpvId;
            setEmpleado(e);
        }
        else { notifyError(tpvOcupadaJson.message); }

        return tpvOcupadaJson.successful;
    }
    catch (e) {
        console.error(e);
        notifyError("Error de conexión");

        return false;
    }

}

export const AddCierreTPV = async (Empleado: SesionEmpleado, setEmpleado: Function, TotalEfectivo: number, TotalTarjeta: number, DineroRetirado: number,
    TotalPrevistoEnCaja: number, TotalRealEnCaja: number, NumVentas: number): Promise<boolean> => {
    try {
        if (!Empleado.TPV) { return false; }

        const Tpv = await FetchTPV(Empleado.TPV);
        if (!Tpv) { return false; }

        const fetchRes = await fetch(`/api/cierres/`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Empleado: Empleado,
                    NumVentas: NumVentas,
                    TotalEfectivo: TotalEfectivo,
                    TotalTarjeta: TotalTarjeta,
                    ventasTotales: TotalEfectivo + TotalTarjeta,
                    TotalPrevistoEnCaja: TotalPrevistoEnCaja,
                    TotalRealEnCaja: TotalRealEnCaja,
                    DineroRetirado: DineroRetirado,
                    TPV: Tpv
                })
            });
        const tpvOcupadaJson = await fetchRes.json();

        if (fetchRes.ok) {
            notifySuccess(tpvOcupadaJson.message);
            let e = Empleado;
            e.TPV = undefined;
            setEmpleado(e);
        }
        else { notifyError(tpvOcupadaJson.message); }

        return tpvOcupadaJson.successful;
    }
    catch (e) {
        console.error(e);
        notifyError("Error de conexión");

        return false;
    }

}