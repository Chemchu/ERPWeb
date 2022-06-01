import { NextApiRequest, NextApiResponse } from "next";
import { ADD_PRODUCT, QUERY_PRODUCTS } from "../../../utils/querys";
import GQLQuery, { GQLMutate } from "../../../utils/serverFetcher";

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
    const variables = {
        "find": null,
        "limit": req.body.limit || 10000
    }
    const fetchResult = await GQLQuery(QUERY_PRODUCTS, variables);

    const apiResponse = await fetchResult.json();
    const data = JSON.parse(apiResponse.data);

    if (!apiResponse.successful) {
        return res.status(300).json({ message: `Fallo al pedir la lista de productos: ${apiResponse.message}` });
    }

    return res.status(200).json(data);
}

const AddProducto = async (req: NextApiRequest, res: NextApiResponse) => {
    const variables = {
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
    const fetchResult = await GQLMutate(ADD_PRODUCT, variables);
    const apiResponse = await fetchResult.json()
    const data = JSON.parse(apiResponse.data);

    if (!apiResponse.successful) {
        return res.status(300).json({ message: `Fallo al pedir la lista de productos: ${apiResponse.message}`, successful: false });
    }

    return res.status(200).json({ message: apiResponse.message, successful: apiResponse.successful, data: data });
}

export default handler;