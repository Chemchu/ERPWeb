import { Devolucion } from "../../tipos/Devolucion";
import { SesionEmpleado } from "../../tipos/Empleado";
import { ProductoDevuelto } from "../../tipos/ProductoDevuelto";
import { Venta } from "../../tipos/Venta";
import { notifyError } from "../toastify";
import { CreateDevolucionList } from "../typeCreator";

export const FetchDevoluciones = async (): Promise<Devolucion[]> => {
    try {
        const vRes = await fetch(`/api/devoluciones/`);

        if (!vRes.ok) {
            notifyError("Error al buscar las devoluciones");
            return [];
        }

        const devoluciones = await vRes.json();

        return CreateDevolucionList(devoluciones.data);
    }
    catch (e) {
        console.error(e);
        notifyError("Error de conexión");
        return [];
    }
}

export const FetchDevolucionesByQuery = async (query: string): Promise<Devolucion[]> => {
    try {
        const vRes = await fetch(`/api/devoluciones/`);

        if (!vRes.ok) {
            notifyError("Error al buscar las devoluciones");
            return [];
        }

        const devoluciones = await vRes.json();
        return CreateDevolucionList(devoluciones.data);
    }
    catch (e) {
        console.error(e);
        notifyError("Error de conexión");
        return [];
    }
}

export const AddDevolucion = async (venta: Venta, productosDevolver: Map<string, number>, empleado: SesionEmpleado) => {
    try {
        const productos: ProductoDevuelto[] = []
        console.log("lol AddDevolucion fetcher");


        venta.productos.forEach((prod) => {
            const cantidadDevuelta = productosDevolver.get(prod._id)
            if (!cantidadDevuelta) { return }

            const precio = prod.precioFinal ? prod.precioFinal : prod.cantidadVendida * (prod.precioVenta * ((100 - prod.dto) / 100));

            productos.push({
                _id: prod._id,
                nombre: prod.nombre,
                proveedor: prod.proveedor,
                familia: prod.familia,
                precioVenta: prod.precioVenta,
                precioCompra: prod.precioCompra,
                precioFinal: precio,
                dto: prod.dto,
                iva: prod.iva,
                margen: prod.margen,
                ean: prod.ean,
                cantidadDevuelta: cantidadDevuelta
            })
        })

        const vRes = await fetch(`/api/devoluciones/`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                productosDevueltos: productos,
                trabajadorId: empleado._id,
                modificadoPorId: empleado._id,
                clienteId: venta.cliente._id,
                tpv: empleado.TPV,
                ventaId: venta._id,
            })
        });

        if (!vRes.ok) {
            notifyError("Error al añadir la devolución");
            return [];
        }

        return { message: "Opsie doopsie" }
    }
    catch (err) {

    }
}