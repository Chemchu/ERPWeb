import { Cierre } from "../tipos/Cierre";
import { Cliente } from "../tipos/Cliente";
import { CustomerPaymentInformation } from "../tipos/CustomerPayment";
import { Empleado } from "../tipos/Empleado";
import { JWT } from "../tipos/JWT";
import { Producto } from "../tipos/Producto";
import { ProductoVendido } from "../tipos/ProductoVendido";
import { Venta } from "../tipos/Venta";
import { CreateCierreList, CreateClientList, CreateEmployee, CreateProductList, CreateSalesList, CreateTPV } from "./typeCreator";

export const FetchProductos = async (): Promise<Producto[]> => {
    try {
        let prodRes = [] as Producto[];

        const pResponse = await fetch('/api/productos', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ limit: 3000 })
        });

        if (pResponse.status > 200) { return []; }

        const pJson = await pResponse.json();

        prodRes = CreateProductList(pJson.productos);
        return prodRes.filter((p) => { return p.alta === true });
    }
    catch (e) {
        console.log(e);
        return [];
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

        if (cResponse.status > 200) { return []; }

        const cJson = await cResponse.json();

        return CreateClientList(cJson.clientes);
    }
    catch (e) {
        console.log();
        return [];
    }
}

export const FetchVentas = async (): Promise<Venta[]> => {
    try {
        const vRes = await fetch(`/api/ventas/`, {
            headers: { 'Content-type': 'application/json' },
            method: 'GET',
            //body: JSON.stringify({ limit: 3000 })
        });

        const ventas = await vRes.json();
        return CreateSalesList(JSON.parse(ventas.data));
    }
    catch (e) {
        console.log(e);
        return [];
    }
}

export const FetchVenta = async (id: string): Promise<Venta[]> => {
    try {
        const vRes = await fetch(`/api/ventas/${id}`);

        const ventas = await vRes.json();
        return CreateSalesList([ventas.data.venta]);
    }
    catch (e) {
        console.log(e);
        return [];
    }
}

export const AddVenta = async (pagoCliente: CustomerPaymentInformation, productosEnCarrito: ProductoVendido[], empleado: Empleado, clientes: Cliente[], jwt: JWT): Promise<{ data: any, error: boolean }> => {
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
                empleado: empleado,
                jwt: jwt
            })
        });

        const data = await addventaRespone.json();

        const error = addventaRespone.status === 200 ? false : true;
        return { data: data.addVenta, error: error };
    }
    catch (err) {
        return { data: undefined, error: true }
    }
}

export const FetchEmpleado = async (_id: string): Promise<Empleado> => {
    if (!_id) { throw "ID del empleado no puede ser undefined"; }
    const fetchRes = await fetch(`/api/empleado/${_id}`);

    const empleadoJson = await fetchRes.json();
    return CreateEmployee(empleadoJson.empleado);
}

export const FetchSalesByTPV = async (TPV: string): Promise<Venta[]> => {
    if (!TPV) { throw "ID de la TPV no puede ser undefined"; }

    const fetchVentas = await fetch(`/api/ventas/tpv/${TPV}`);
    const ventasJson = await fetchVentas.json();

    return CreateSalesList(JSON.parse(ventasJson.ventas));
}

export const FetchSalesByTPVDate = async (TPV: string, fecha: string): Promise<Venta[]> => {
    if (!TPV) { throw "ID de la TPV no puede ser undefined"; }

    const fetchVentasTPVPorFecha = await fetch(`/api/ventas/tpv/fecha/${TPV}/${fecha}`);

    const ventasJson = await fetchVentasTPVPorFecha.json();
    return CreateSalesList(JSON.parse(ventasJson.ventas));
}

export const FetchTPV = async (TPV: string) => {
    if (!TPV) { throw "ID de la TPV no puede ser undefined"; }

    const fetchTPV = await fetch(`/api/tpv/${TPV}`);
    const tpvJson = await fetchTPV.json();

    return CreateTPV(JSON.parse(tpvJson.tpv));
}

export const FetchCierres = async (): Promise<Cierre[]> => {
    try {
        let cierresRes = [] as Cierre[];

        const crResponse = await fetch('/api/cierres');

        if (crResponse.status > 200) { return []; }
        const crJson = await crResponse.json();

        cierresRes = CreateCierreList(crJson.cierresTPVs);
        return cierresRes;
    }
    catch (e) {
        console.log(e);
        return [];
    }
}