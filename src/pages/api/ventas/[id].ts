import { gql, useMutation } from "@apollo/client";
import { NextApiRequest, NextApiResponse } from "next"
import GQLFetcher from "../../../utils/serverFetcher";

const ADD_SALE = gql`
    mutation AddVenta($fields: VentaFields!) {
        addVenta(fields: $fields) {
            message
            successful
        }
    }`
    ;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // const session = await getSession({ req })
    // if (!session) {
    //     return res.status(401).json({ message: "Not signed in" });
    // }

    switch (req.method) {
        case 'GET':
            return await GetSale(req, res);

        case 'POST':
            break;

        case 'DELETE':

            break;

        default:
            res.setHeader('Allow', ['GET', 'DELETE', 'POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

const AddSale = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const salesValues = req.body;
        const [addVentasToDB, { data, loading, error }] = useMutation(ADD_SALE,
            {
                variables: {
                    "fields": {
                        "productos": salesValues.productos,
                        "dineroEntregadoEfectivo": salesValues.dineroEntregadoEfectivo,
                        "dineroEntregadoTarjeta": salesValues.dineroEntregadoTarjeta,
                        "precioVentaTotal": salesValues.precioVentaTotal,
                        "cambio": salesValues.cambio,
                        "cliente": salesValues.cliente,
                        "vendidoPor": salesValues.vendidoPor,
                        "modificadoPor": salesValues.modificadoPor,
                        "tipo": salesValues.tipo,
                        "descuentoEfectivo": salesValues.descuentoEfectivo,
                        "descuentoTarjeta": salesValues.descuentoTarjeta
                    }
                }
            });

        const fetchResult = await GQLFetcher.query(
            {
                query: gql`
                mutation AddVenta($fields: VentaFields!) {
                    addVenta(fields: $fields) {
                        message
                        successful
                    }
                }
                `,
                variables: {
                    "id": salesValues.id
                }
            }
        );

        if (fetchResult.data.success) {
            return res.status(200).json({ message: `Lista de ventas encontrada` });
        }

        return res.status(300).json({ message: `Fallo al pedir la lista de ventas` });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: `Error: ${err}` });
    }
}

const GetSale = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const reqCredentials = req.body;
        const fetchResult = await GQLFetcher.query(
            {
                query: gql`
                query Venta($id: ID!) {
                    venta(_id: $id) {
                        ${reqCredentials.neededValues.map((v: string) => { return v + ", " })}
                    }
                }
                `,
                variables: {
                    "id": reqCredentials.id
                }
            }
        );

        if (fetchResult.data.success) {
            return res.status(200).json({ message: `Lista de ventas encontrada` });
        }

        return res.status(300).json({ message: `Fallo al pedir la lista de ventas` });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: `Error: ${err}` });
    }

}

export default handler;