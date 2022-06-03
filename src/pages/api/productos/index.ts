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
    const apiResponse = await (await GQLQuery({
        query: QUERY_PRODUCTS, variables: {
            "find": null,
            "limit": req.body.limit || 10000
        }
    })).json();
    const data = JSON.parse(apiResponse.data);

    return res.status(apiResponse.successful ? 200 : 300).json({ message: apiResponse.message, successful: apiResponse.successful, data: data.productos });
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
    const apiResponse = await (await GQLMutate({ mutation: ADD_PRODUCT, variables: variables })).json();
    const data = JSON.parse(apiResponse.data);

    return res.status(apiResponse.successful ? 200 : 300).json({ message: apiResponse.message, successful: apiResponse.successful, data: data.producto });
}

export default handler;