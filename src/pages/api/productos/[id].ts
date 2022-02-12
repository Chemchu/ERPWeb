import { gql, useMutation } from "@apollo/client";
import { NextApiRequest, NextApiResponse } from "next"
import GQLFetcher from "../../../utils/serverFetcher";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const method = req.method;
        const request = req.body;
        let fetchResult;

        switch (method) {
            case 'POST':
                const productsToAdd =
                    gql`
                    mutation AddProducto($nombre: String!, $precioVenta: Float!, $ean: String!, $proveedor: String, $familia: String, $precioCompra: Float, $iva: Float, $margen: Float, $promociones: [String], $cantidad: Int, $cantidadRestock: Int, $alta: Boolean) {
                                    addProducto(nombre: $nombre, precioVenta: $precioVenta, ean: $ean, proveedor: $proveedor, familia: $familia, precioCompra: $precioCompra, iva: $iva, margen: $margen, promociones: $promociones, cantidad: $cantidad, cantidadRestock: $cantidadRestock, alta: $alta) {
                                        message
                                        successful
                                    }
                                }
                    `;
                useMutation(productsToAdd, {
                    variables: {
                        "nombre": null,
                        "precioVenta": 10,
                        "ean": 100,
                        "proveedor": null,
                        "familia": null,
                        "precioCompra": null,
                        "iva": null,
                        "margen": null,
                        "promociones": null,
                        "cantidad": null,
                        "cantidadRestock": null,
                        "alta": null
                    }
                });

                // if (fetchResult.data.successful) {
                //     return res.status(200).json({ message: `Productos añadidos` });
                // }

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


        // const fetchResult = await GQLFetcher.query(
        //     {
        //         query: gql`
        //         query Producto($find: ProductoFind!) {
        //             producto(find: $find) {
        //                 ${request.neededValues.map((p: string) => { return p + ", " })}
        //             }
        //         }
        //         `,
        //         variables: {
        //             "find": {
        //                 "_id": request.find._id,
        //                 "nombre": request.find.nombre,
        //                 "ean": request.find.ean
        //             }
        //         }
        //     }
        // );

        return res.status(300).json({ message: `Fallo al pedir el producto` });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: `Error: ${err}` });
    }
}

export default handler;