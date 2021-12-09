import { Client } from "../../tipos/Client";
import { Producto } from "../../tipos/DBProduct";

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

function CreateClient(c: any): Client | undefined {
    try {
        let client = {
            _id: c._id,
            nombre: c.nombre,
            nif: c.nif,
            calle: c.calle ? c.calle : "",
            cp: c.cp ? c.cp : "",
            telefono: c.telefono ? c.telefono : ""
        } as Client

        return client;
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

export function CreateClientList(cList: any[]): Client[] {
    let res: Client[] = [];
    cList.forEach((c: any) => {
        const client = CreateClient(c);

        if (client) res.push(client);
    });

    return res;
}