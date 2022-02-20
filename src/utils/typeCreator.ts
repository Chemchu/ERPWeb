import { Cliente } from "../tipos/Cliente";
import { Producto } from "../tipos/Producto";
import { ProductoVendido } from "../tipos/ProductoVendido";
import { Venta } from "../tipos/Venta";

function CreateProduct(p: any): Producto | undefined {
    try {
        if (p.nombre === undefined) return undefined;

        let producto = {
            _id: p._id,
            alta: p.alta,
            cantidad: p.cantidad | 0,
            descripcion: p.descripcion ? p.descripcion : "",
            ean: p.ean,
            familia: p.familia,
            img: p.img,
            iva: p.iva,
            nombre: p.nombre,
            precioCompra: p.precioCompra,
            precioVenta: p.precioVenta,
            tags: p.tags,
            promociones: p.promociones
        } as unknown as Producto

        return producto;
    }
    catch (e) {
        return undefined;
    }
}

function CreateClient(c: any): Cliente | undefined {
    try {
        if (c.nif === undefined) return undefined;

        let client = {
            _id: c._id,
            nombre: c.nombre,
            nif: c.nif,
            calle: c.calle ? c.calle : "",
            cp: c.cp ? c.cp : "",
            telefono: c.telefono ? c.telefono : ""
        } as Cliente

        return client;
    }
    catch (e) {
        return undefined;
    }
}

function CreateSale(s: any): Venta | undefined {
    try {
        let venta: Venta = {
            _id: s._id,
            productos: CreateProductoVendidoList(s.productos),
            dineroEntregadoEfectivo: s.dineroEntregadoEfectivo,
            dineroEntregadoTarjeta: s.dineroEntregadoTarjeta,
            precioVentaTotal: s.precioVentaTotal,
            cambio: s.cambio,
            clienteID: s.cliente || "Cliente Tester",
            vendidoPor: s.vendidoPor || "Tester",
            modificadoPor: s.modificadoPor || "Tester",
            tipo: s.tipo,
            descuentoEfectivo: s.descuentoEfectivo || 0,
            descuentoPorcentaje: s.descuentoPorcentaje || 0,
            createdAt: s.createdAt,
            updatedAt: s.updatedAt
        }

        return venta;
    }
    catch (e) {
        return undefined;
    }
}

function CreateProductoVendido(s: any): ProductoVendido | undefined {
    try {
        let prod: ProductoVendido = {
            _id: s._id,
            nombre: s.nombre,
            familia: s.familia,
            proveedor: s.proveedor,
            ean: s.ean,
            iva: s.iva,
            margen: s.margen,
            precioCompra: s.precioCompra,
            precioVenta: s.precioVenta,
            cantidadVendida: s.cantidadVendida,
            dto: s.dto
        }

        return prod;
    }
    catch (e) {
        return undefined;
    }
}

export function CreateProductList(pList: any[]): Producto[] {
    let res: Producto[] = [];
    pList.forEach((p: any) => {
        const prod = CreateProduct(p);

        if (prod) res.push(prod);
    });

    return res;
}

export function CreateClientList(cList: any[]): Cliente[] {
    if (cList === undefined) { return []; }

    let res: Cliente[] = [];
    cList.forEach((c: any) => {
        const client = CreateClient(c);

        if (client) res.push(client);
    });

    return res;
}

export function CreateSalesList(sList: any[]): Venta[] {
    if (sList === undefined) { return [] as Venta[]; }

    let res: Venta[] = [];
    sList.forEach((c: any) => {
        const venta = CreateSale(c);

        if (venta) res.push(venta);
    });

    return res;
}

export function CreateProductoVendidoList(pList: any[]): ProductoVendido[] {
    let res: ProductoVendido[] = [];
    pList.forEach((p: any) => {
        const prod = CreateProductoVendido(p);

        if (prod) res.push(prod);
    });

    return res;
}