import { gql } from "@apollo/client";
import { NextApiRequest, NextApiResponse } from "next";
import { QUERY_TPV } from "../../../utils/querys";
import GQLFetcher from "../../../utils/serverFetcher";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const fetchResult = await GQLFetcher.query(
            {
                query: QUERY_TPV,
                variables: {
                    "find": {
                        "_id": req.query.id
                    }
                }
            }
        );

        if (fetchResult.error) {
            return res.status(300).json({ message: `Fallo al buscar TPV: error GraphQL server` });
        }

        return res.status(200).json(JSON.stringify({ message: `Éxito al buscar la TPV`, tpv: JSON.stringify(fetchResult.data.tpv) }));
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(JSON.stringify({ message: `Error al buscar TPVs: error interno` }));
    }
}

export default handler;

