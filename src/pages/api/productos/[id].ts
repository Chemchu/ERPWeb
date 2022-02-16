import { gql, useMutation } from "@apollo/client";
import { NextApiRequest, NextApiResponse } from "next"
import { envInformation } from "../../../utils/envInfo";
import GQLFetcher from "../../../utils/serverFetcher";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const method = req.method;
        const request = req.body;
        let fetchResult;

        switch (method) {
            case 'POST':

                const responsePost = await fetch(`${envInformation.ERPBACK_URL}api/productos/${req.query.id}`, {
                    headers: { 'Content-Type': 'application/json' },
                    method: 'POST',
                    body: JSON.stringify({ csv: req.body })
                });

                const resJsonPost = await responsePost.json();

                if (responsePost.status === 200) {
                    res.status(200).json({ message: `Los productos han sido añadidos correctamente` });
                    return;
                }

                res.status(300).json({ message: `Fallo al añadir los siguientes productos: ${resJsonPost.productos}` });

                break;

            case 'GET':

                fetchResult = await GQLFetcher.query(
                    {
                        query: gql`
                query Producto($find: ProductoFind!) {
                    producto(find: $find) {
                        ${request.neededValues.map((p: string) => { return p + ", " })}
                    }
                }
                `,
                        variables: {
                            "find": {
                                "_id": request.find._id,
                                "nombre": request.find.nombre,
                                "ean": request.find.ean
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