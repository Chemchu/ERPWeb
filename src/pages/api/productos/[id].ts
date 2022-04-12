import { NextApiRequest, NextApiResponse } from "next"
import { ADD_PRODUCT, ADD_PRODUCTOS_FILE, DELETE_PRODUCT, QUERY_PRODUCT, QUERY_PRODUCTS, UPDATE_PRODUCT } from "../../../utils/querys";
import GQLFetcher from "../../../utils/serverFetcher";
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
            // else {
            //     return await AddProducto(req, res);
            // }

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
    const fetchResult = await GQLFetcher.query(
        {
            query: QUERY_PRODUCT,
            variables: {
                "find": {
                    "_id": req.query.id
                }
            }
        }
    );

    if (fetchResult.data.producto) {
        return res.status(200).json({ message: `Producto encontrado`, producto: fetchResult.data.producto });
    }

    return res.status(300).json({ message: `Fallo al realizar la búsqueda` });
}

const GetProductosFromQuery = async (userQuery: queryString.ParsedQuery<string>, res: NextApiResponse) => {
    if (!userQuery.query) { res.status(300).json({ message: `La query no puede estar vacía` }); }

    const fetchResult = await GQLFetcher.query(
        {
            query: QUERY_PRODUCTS,
            variables: {
                "find": {
                    "query": userQuery.query
                }
            }
        }
    );

    if (fetchResult.data.productos) {
        return res.status(200).json({ message: `Productos encontrados`, productos: fetchResult.data.productos });
    }

    return res.status(300).json({ message: `Fallo al realizar la búsqueda` });
}

const AddProductosFromFile = async (req: NextApiRequest, res: NextApiResponse) => {
    const response = await GQLFetcher.mutate({
        mutation: ADD_PRODUCTOS_FILE,
        variables: {
            csv: JSON.stringify(req.body)
        }
    });

    if (response.data.addProductosFile.successful) {
        return res.status(200).json({ message: response.data.addProductosFile.message });
    }

    return res.status(300).json({ message: `Fallo al añadir los productos: ${response.data.message}` });
}

const AddProducto = async (req: NextApiRequest, res: NextApiResponse) => {
    const response = await GQLFetcher.mutate({
        mutation: ADD_PRODUCT,
        variables: {
            "precioVenta": req.body.precioVenta,
            "ean": req.query.id,
            "iva": req.body.iva,
            "proveedor": req.body.proveedor,
            "familia": req.body.familia,
            "nombre": req.body.nombre,
            "precioCompra": req.body.precioCompra,
            "margen": req.body.margen,
            "cantidad": req.body.cantidad,
            "cantidadRestock": req.body.cantidadRestock,
            "alta": req.body.alta
        }
    });

    if (response.data.addProducto.successful) {
        return res.status(200).json({ message: response.data.addProducto.message });
    }
    return res.status(300).json({ message: `Fallo al añadir el producto: ${response.data.addProducto.message}` });
}

const DeleteProducto = async (req: NextApiRequest, res: NextApiResponse) => {
    const response = await GQLFetcher.mutate({
        mutation: DELETE_PRODUCT,
        variables: {
            "id": req.query.id
        }
    });

    if (response.data.deleteProducto.successful) {
        return res.status(200).json({ message: response.data.deleteProducto.message, successful: response.data.deleteProducto.successful });
    }
    return res.status(300).json({ message: `Fallo al añadir el producto: ${response.data.deleteProducto.message}`, successful: response.data.deleteProducto.successful });
}

const UpdateProducto = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const prod: Producto = req.body;

        const response = await GQLFetcher.mutate({
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
        });

        if (response.data.updateProducto.successful) {
            res.status(200).json({ message: response.data.updateProducto.message, successful: response.data.updateProducto.successful });
            return;
        }

        res.status(300).json({ message: `Fallo al actualizar el producto: ${response.data.message}`, successful: false });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: `Error interno: respuesta no válida por parte del servidor.`, successful: false });
    }
}

export default handler;