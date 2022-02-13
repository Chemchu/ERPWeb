import { gql, useMutation } from "@apollo/client";
import { NextApiRequest, NextApiResponse } from "next"
import GQLFetcher from "../../../utils/serverFetcher";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const ADD_NEW_PRODUCT = gql`
        mutation AddProducto($nombre: String!, $precioVenta: Float!, $ean: String!, $proveedor: String, $familia: String, $precioCompra: Float, $iva: Float, $margen: Float, $promociones: [String], $cantidad: Int, $cantidadRestock: Int, $alta: Boolean) {
                        addProducto(nombre: $nombre, precioVenta: $precioVenta, ean: $ean, proveedor: $proveedor, familia: $familia, precioCompra: $precioCompra, iva: $iva, margen: $margen, promociones: $promociones, cantidad: $cantidad, cantidadRestock: $cantidadRestock, alta: $alta) {
                            message
                            successful
                        }
                    }
        `;

    const AddProduct = (product: {
        nombre: string, pVenta: number, ean: string, proveedor: string, familia: string,
        pCompra: number, iva: number, margen: number, promociones: string, cantidad: number, cantidadRestock: number, alta: boolean
    }) => {
        const [createProduct] = useMutation(ADD_NEW_PRODUCT,
            {
                variables: {
                    "nombre": product.nombre,
                    "precioVenta": product.pVenta,
                    "ean": product.ean,
                    "proveedor": product.proveedor,
                    "familia": product.familia,
                    "precioCompra": product.pCompra,
                    "iva": product.iva,
                    "margen": product.margen,
                    "promociones": product.promociones,
                    "cantidad": product.cantidad,
                    "cantidadRestock": product.cantidadRestock,
                    "alta": product.alta
                }
            });

        return
    }

    try {
        const method = req.method;
        const request = req.body;
        let fetchResult;

        switch (method) {
            case 'POST':




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