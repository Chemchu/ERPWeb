import { NextApiRequest, NextApiResponse } from "next";
import { ADD_PRODUCT, QUERY_PRODUCTS } from "../../../utils/querys";
import GQLFetcher from "../../../utils/serverFetcher";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        switch (req.method) {
            case 'GET':
                return await GetProductos(req, res);

            case 'POST':
                return await AddProducto(req, res);

            default:
                return res.status(400).json({ message: `Solo se puede hacer un GET / POST en productos` });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: `${err}` });
    }
}

const GetProductos = async (req: NextApiRequest, res: NextApiResponse) => {
    const fetchResult = await GQLFetcher.query({
        query: QUERY_PRODUCTS,
        variables: {
            "find": null,
            "limit": req.body.limit || 10000
        }
    });

    if (fetchResult.errors) {
        return res.status(300).json({ message: `Fallo al pedir la lista de productos: ${fetchResult.errors[0]}` });
    }

    if (fetchResult.data) {
        return res.status(200).json(fetchResult.data);
    }

    return res.status(300).json({ message: `Fallo al pedir la lista de productos` });
}

const AddProducto = async (req: NextApiRequest, res: NextApiResponse) => {
    const fetchResult = await GQLFetcher.mutate({
        mutation: ADD_PRODUCT,
        variables: {
            "producto": {
                "nombre": req.body.nombre,
                "proveedor": req.body.proveedor,
                "familia": req.body.familia,
                "precioVenta": req.body.precioVenta,
                "precioCompra": req.body.precioCompra,
                "iva": req.body.iva,
                "margen": req.body.margen,
                "ean": req.body.ean,
                "cantidad": req.body.cantidad,
                "cantidadRestock": req.body.cantidadRestock,
                "alta": req.body.alta
            }
        }
    });

    if (fetchResult.errors) {
        return res.status(300).json({ message: `Fallo al pedir la lista de productos: ${fetchResult.errors[0]}`, successful: false });
    }

    if (fetchResult.data) {
        return res.status(200).json({ message: fetchResult.data.addProducto.message, successful: fetchResult.data.addProducto.successful });
    }

    return res.status(300).json({ message: `Fallo al pedir la lista de productos`, successful: false });
}

// fetchResult = await GQLFetcher.query({
//     query: QUERY_PRODUCTS,
//     variables: {
//         "find": find,
//         "limit": limit
//     }
// });

// if (fetchResult.errors) {
//     return res.status(300).json({ message: `Fallo al pedir la lista de productos: ${fetchResult.errors[0]}` });
// }

// if (fetchResult.data) {
//     return res.status(200).json(fetchResult.data);
// }

// return res.status(300).json({ message: `Fallo al pedir la lista de productos` });


export default handler;