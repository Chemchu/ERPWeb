import { gql } from "@apollo/client";
import { NextApiRequest, NextApiResponse } from "next"
import GQLFetcher from "../../../utils/serverFetcher";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // const session = await getSession({ req })
    // if (!session) {
    //     return res.status(401).json({ message: "Not signed in" });
    // }

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
            return res.status(200).json({ message: `Lista de clientes encontrada` });
        }

        return res.status(300).json({ message: `Fallo al pedir la lista de clientes` });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: `Error: ${err}` });
    }

    // switch (method) {
    //     case 'GET':
    //         // Get data from your database 
    //         const response = await fetch(`${envInformation.ERPBACK_URL}api/ventas/${id}`);
    //         const resJson = await response.json();

    //         res.status(response.status).json(resJson.message);
    //         break;

    //     case 'PUT':
    //         // Update or create data in your database
    //         res.status(200).json({ id, name: name || `Venta ${id}` });
    //         break;

    //     case 'DELETE':

    //         break;

    //     default:
    //         res.setHeader('Allow', ['GET', 'DELETE', 'PUT']);
    //         res.status(405).end(`Method ${method} Not Allowed`);
    // }
}

export default handler;