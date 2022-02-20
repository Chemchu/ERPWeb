import { gql } from "@apollo/client";
import { NextApiRequest, NextApiResponse } from "next";
import GQLFetcher from "../../../utils/serverFetcher";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // const session = await getSession({ req })
    // if (!session) {
    //     return res.status(401).json({ message: "Not signed in" });
    // }

    try {
        const body = req.body;
        const fetchResult = await GQLFetcher.query(
            {
                query: gql`
                query Ventas($limit: Int)  {
                    ventas(limit: $limit) {
                        ${body.neededValues}
                    }
                }
                `,
                variables: {
                    "limit": body.limit,
                }
            }
        );

        if (fetchResult) {
            let vParsed = fetchResult.data.ventas;

            // console.log(vParsed.updatedAt);

            // for (var i = 0; i < fetchResult.data.ventas.length; i++) {
            //     // Transforma Epoch a una fecha legible
            //     let d1 = new Date(0);
            //     let d2 = new Date(0);
            //     d1.setSeconds(fetchResult.data.ventas[i].createdAt);
            //     d2.setSeconds(fetchResult.data.ventas[i].updatedAt);

            //     vParsed[i].createdAt = d1.toLocaleString();
            //     vParsed[i].updatedAt = d2.toLocaleString();
            // }

            // console.log(vParsed);
            return res.status(200).json({ message: `Lista de clientes encontrada`, data: JSON.stringify(vParsed) });
        }

        return res.status(300).json({ message: `Fallo al pedir la lista de clientes` });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: `Error: ${err}` });
    }
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '5mb',
        },
    },
}

export default handler;