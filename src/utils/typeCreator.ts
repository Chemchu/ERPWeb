import { Cliente } from "../tipos/Cliente";
import { Producto } from "../tipos/Producto";
import { ProductoVendido } from "../tipos/ProductoVendido";
import { Venta } from "../tipos/Venta";

function CreateProduct(p: any): Producto | undefined {
    try {
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
        } as Producto

        return producto;
    }
    catch (e) {
        return undefined;
    }
}

function CreateClient(c: any): Cliente | undefined {
    try {
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
            descuentoTarjeta: s.descuentoTarjeta || 0,
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
            producto: s._id,
            cantidad: s.cantidad,
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
    let res: Cliente[] = [];
    cList.forEach((c: any) => {
        const client = CreateClient(c);

        if (client) res.push(client);
    });

    return res;
}

export function CreateSalesList(sList: any[]): Venta[] {
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