import { Cliente } from "../tipos/Cliente";
import { Empleado } from "../tipos/Empleado";
import { Producto } from "../tipos/Producto";
import { Venta } from "../tipos/Venta";
import { CreateClientList, CreateEmployee, CreateProductList, CreateSalesList, CreateTPV } from "./typeCreator";

export const FetchProductos = async (): Promise<Producto[]> => {
    try {
        let prodRes = [] as Producto[];

        const pResponse = await fetch('/api/productos', {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                find: {},
                limit: 3000,
                neededValues: ["_id", "nombre", "proveedor", "familia",
                    "precioVenta", "precioCompra", "iva", "margen",
                    "ean", "promociones", "cantidad", "cantidadRestock", "alta"]
            })
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
        const vRes = await fetch('/api/ventas', {
            headers: { 'Content-type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({ limit: 3000 })
        });

        const ventas = await vRes.json();
        return CreateSalesList(JSON.parse(ventas.data));
    }
    catch (e) {
        console.log(e);
        return [];
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

    const fetchVentas = await fetch(`/api/ventas/tpv/fecha/${fecha}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(TPV)
    });

    const ventasJson = await fetchVentas.json();
    return CreateSalesList(JSON.parse(ventasJson.ventas));
}

export const FetchTPV = async (TPV: string) => {
    if (!TPV) { throw "ID de la TPV no puede ser undefined"; }

    const fetchTPV = await fetch(`/api/tpv/${TPV}`);
    const tpvJson = await fetchTPV.json();

    return CreateTPV(JSON.parse(tpvJson.tpv));
}