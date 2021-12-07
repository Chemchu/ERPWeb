import { Producto } from "../../tipos/DBProduct";

function CreateProduct(p: any): Producto | undefined {
    try {
        let producto = {
            _id: p._id,
            alta: p.alta,
            cantidad: p.cantidad,
            descripcion: p.descripcion,
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

export function CreateProductList(pList: any[]): Producto[] {
    let res: Producto[] = []
    pList.forEach((p: any) => {
        const prod = CreateProduct(p);

        if (prod) res.push(prod);
    });

    return res;
}