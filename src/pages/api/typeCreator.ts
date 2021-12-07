import { DBProduct } from "../../tipos/DBProduct";

function CreateProduct(p: any): DBProduct | undefined {
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
        } as DBProduct

        return producto;
    }
    catch (e) {
        return undefined;
    }
}

export function CreateProductList(pList: any[]): DBProduct[] {
    let res: DBProduct[] = []
    pList.forEach((p: any) => {
        const prod = CreateProduct(p);

        if (prod) res.push(prod);
    });

    return res;
}