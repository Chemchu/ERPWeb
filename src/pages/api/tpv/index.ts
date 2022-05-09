import { NextApiRequest, NextApiResponse } from "next";
import { QUERY_TPVS } from "../../../utils/querys";
import GQLFetcher from "../../../utils/serverFetcher";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const fetchResult = await GQLFetcher.query(
            {
                query: QUERY_TPVS,
                variables: {
                    "limit": 100,
                    "find": null
                },
                fetchPolicy: "no-cache"
            }
        );

        if (!fetchResult.errors) {
            return res.status(200).json(JSON.stringify({ message: `Éxito al iniciar sesión`, tpvs: JSON.stringify(fetchResult.data.tpvs) }));
        }
        return res.status(300).json({ message: `Fallo al buscar TPV: error GraphQL server` });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(JSON.stringify({ message: `Error al buscar TPVs: error interno` }));
    }
}

export default handler;

