import { gql } from "@apollo/client";
import { NextApiRequest, NextApiResponse } from "next";
import { QUERY_SALES } from "../../../utils/querys";
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
                query: QUERY_SALES,
                variables: {
                    "limit": body.limit,
                }
            }
        );

        if (fetchResult) {
            let vParsed = fetchResult.data.ventas;
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