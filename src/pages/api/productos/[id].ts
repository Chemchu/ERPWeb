import { NextApiRequest, NextApiResponse } from "next"
import { ADD_PRODUCT, ADD_PRODUCTOS_FILE, QUERY_PRODUCT } from "../../../utils/querys";
import GQLFetcher from "../../../utils/serverFetcher";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const method = req.method;

        switch (method) {
            case 'POST':
                if (req.query.id === "file") {
                    await AddProductosFromFile(req, res);
                }
                else {
                    await AddProducto(req, res);
                }

            case 'GET':
                await GetProductoFromId(req, res);
        }

        res.status(300).json({ message: `Fallo en la consulta` });
        return;
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: `${err}` });
    }
}

const GetProductoFromId = async (req: NextApiRequest, res: NextApiResponse) => {
    let fetchResult = await GQLFetcher.query(
        {
            query: QUERY_PRODUCT,
            variables: {
                "find": {
                    "_id": req.query.id
                }
            }
        }
    );

    if (fetchResult.data.Producto) {
        res.status(200).json({ message: `Producto encontrado`, producto: fetchResult.data.Producto });
        return;
    }

    res.status(300).json({ message: `Fallo al añadir el producto` });
    return;
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
    return res.status(300).json({ message: `Fallo al añadir el producto: ${response.data.message}` });
}

export default handler;