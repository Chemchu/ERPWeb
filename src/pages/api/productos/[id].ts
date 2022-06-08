import { NextApiRequest, NextApiResponse } from "next"
import { ADD_PRODUCT, ADD_PRODUCTOS_FILE, DELETE_PRODUCT, QUERY_PRODUCT, QUERY_PRODUCTS, UPDATE_PRODUCT } from "../../../utils/querys";
import GQLQuery, { GQLMutate } from "../../../utils/serverFetcher";
import queryString from 'query-string';
import { Producto } from "../../../tipos/Producto";

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
        const method = req.method;
        const query = queryString.parse(req.query.id.toString());

        switch (method) {
            case 'POST':
                if (req.query.id === "file") {
                    return await AddProductosFromFile(req, res);
                }

            case 'GET':
                if (query.query) { return await GetProductosFromQuery(query, res); }
                else { return await GetProductoFromId(req, res); }

            case 'PUT':
                return await UpdateProducto(req, res);

            case 'DELETE':
                return await DeleteProducto(req, res);
        }

    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: `${err}` });
    }
}

const GetProductoFromId = async (req: NextApiRequest, res: NextApiResponse) => {
    const serverRes = await GQLQuery({
        query: QUERY_PRODUCT, variables: {
            "find": {
                "_id": req.query.id
            }
        }
    });
    const apiResponse = await serverRes.json();
    const data = JSON.parse(apiResponse.data);

    return res.status(serverRes.ok ? 200 : 300).json({ message: data.message, data: data.producto, successful: data.successful ? data.successful : serverRes.ok });
}

const GetProductosFromQuery = async (userQuery: queryString.ParsedQuery<string>, res: NextApiResponse) => {
    if (!userQuery.query) { res.status(300).json({ message: `La query no puede estar vacía`, successful: false }); }

    const serverRes = await GQLQuery({
        query: QUERY_PRODUCTS, variables: {
            "find": {
                "query": userQuery.query
            }
        }
    })
    const apiResponse = await serverRes.json();
    const data = JSON.parse(apiResponse.data);

    return res.status(serverRes.ok ? 200 : 300).json({ message: data.message, productos: data.productos, successful: data.successful ? data.successful : serverRes.ok });
}

const AddProductosFromFile = async (req: NextApiRequest, res: NextApiResponse) => {
    const apiResponse = await (await GQLMutate({
        mutation: ADD_PRODUCTOS_FILE,
        variables: {
            csv: JSON.stringify(req.body)
        }
    })).json();

    const data = JSON.parse(apiResponse.data);
    return res.status(data.successful ? 200 : 300).json({ message: data.message, successful: data.successful });
}

const DeleteProducto = async (req: NextApiRequest, res: NextApiResponse) => {
    const apiResponse = await (await GQLMutate({
        mutation: DELETE_PRODUCT,
        variables: {
            "id": req.query.id
        }
    })).json();

    const data = JSON.parse(apiResponse.data);
    return res.status(data.successful ? 200 : 300).json({ message: data.message, successful: data.successful });
}

const UpdateProducto = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const prod: Producto = req.body;
        const apiResponse = await (await GQLMutate({
            mutation: UPDATE_PRODUCT,
            variables: {
                "producto": {
                    "_id": prod._id,
                    "nombre": prod.nombre,
                    "proveedor": prod.proveedor,
                    "familia": prod.familia,
                    "precioVenta": prod.precioVenta,
                    "precioCompra": prod.precioCompra,
                    "iva": prod.iva,
                    "margen": prod.margen,
                    "promociones": prod.promociones,
                    "ean": prod.ean,
                    "cantidad": prod.cantidad,
                    "cantidadRestock": prod.cantidadRestock,
                    "alta": prod.alta
                }
            }
        })).json();

        const data = JSON.parse(apiResponse.data);
        return res.status(data.successful ? 200 : 300).json({ message: data.message, successful: data.successful });

    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: `Error interno: respuesta no válida por parte del servidor.`, successful: false });
    }
}

export default handler;