import { NextApiRequest, NextApiResponse } from "next"
import { envInformation } from "../../../utils/envInfo";
import { ADD_PRODUCT, QUERY_PRODUCT } from "../../../utils/querys";
import GQLFetcher from "../../../utils/serverFetcher";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const method = req.method;
        let fetchResult;

        switch (method) {
            case 'POST':

                // const responsePost = await fetch(`${envInformation.ERPBACK_URL}api/productos/${req.query.id}`, {
                //     headers: { 'Content-Type': 'application/json' },
                //     method: 'POST',
                //     body: JSON.stringify({ csv: req.body })
                // });

                // const resJsonPost = await responsePost.json();

                // if (responsePost.status === 200) {
                //     res.status(200).json({ message: `Los productos han sido añadidos correctamente` });
                //     return;
                // }

                // res.status(300).json({ message: `Fallo al añadir los siguientes productos: ${resJsonPost.productos}` });

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

                if (response.errors) {
                    return res.status(300).json({ message: `Fallo al añadir el producto: ${response.errors[0]}` });
                }

                if (response.data.successful) {
                    return res.status(200).json({ message: response.data.message });
                }

                res.status(300).json({ message: `Fallo al añadir el producto: ${response.data.message}` });
                break;

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

                if (fetchResult.data.success) {
                    return res.status(200).json({ message: `Producto encontrado` });
                }

                break;
            default:
                break;
        }

        return res.status(300).json({ message: `Fallo al pedir el producto` });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: `Error: ${err}` });
    }
}

export default handler;