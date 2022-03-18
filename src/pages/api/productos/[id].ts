import { NextApiRequest, NextApiResponse } from "next"
import { envInformation } from "../../../utils/envInfo";
import { ADD_PRODUCT, ADD_PRODUCTOS_FILE, QUERY_PRODUCT } from "../../../utils/querys";
import GQLFetcher from "../../../utils/serverFetcher";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const method = req.method;
        let fetchResult;
        let response;

        switch (method) {
            case 'POST':
                if (req.query.id === "file") {
                    response = await GQLFetcher.mutate({
                        mutation: ADD_PRODUCTOS_FILE,
                        variables: {
                            csv: JSON.stringify(req.body)
                        }
                    });

                }
                else {
                    response = await GQLFetcher.mutate({
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
                }

                if (response.errors) {
                    res.status(300).json({ message: `Fallo al añadir el producto: ${response.errors[0]}` });
                    return;
                }

                if (response.data.successful) {
                    res.status(200).json({ message: response.data.message });
                    return;
                }

                res.status(300).json({ message: `Fallo al añadir el producto: ${response.data.message}` });
                return;

            case 'GET':
                fetchResult = await GQLFetcher.query(
                    {
                        query: QUERY_PRODUCT,
                        variables: {
                            "find": {
                                "_id": req.query.id
                            }
                        }
                    }
                );

                if (!fetchResult.errors) {
                    res.status(200).json({ message: `Producto encontrado` });
                    return;
                }

                res.status(300).json({ message: `Fallo al añadir el producto` });
                return;
        }

        res.status(300).json({ message: `Fallo al pedir el producto` });
        return;
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: `${err}` });
    }
}

export default handler;