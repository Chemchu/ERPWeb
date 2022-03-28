import { NextApiRequest, NextApiResponse } from "next";
import { QUERY_TPV, QUERY_TPVS } from "../../../utils/querys";
import GQLFetcher from "../../../utils/serverFetcher";
import queryString from 'query-string';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const query = queryString.parse(req.query.id.toString());
        const isLibre: boolean = Boolean(query.isTpvFree);
        let fetchResult;

        if (query.isTpvFree !== undefined) {
            fetchResult = await GQLFetcher.query(
                {
                    query: QUERY_TPVS,
                    variables: {
                        "find": {
                            "libre": isLibre
                        },
                        "limit": 3000
                    }
                }
            );
        }
        else {
            const tpvId: string = String(query.TPVId);
            fetchResult = await GQLFetcher.query(
                {
                    query: QUERY_TPV,
                    variables: {
                        "find": {
                            "_id": tpvId
                        },
                        "limit": 3000
                    }
                }
            );
        }

        if (fetchResult.errors) {
            return res.status(300).json({ message: `Fallo al buscar TPV: error GraphQL server` });
        }

        return res.status(200).json(JSON.stringify({ message: `Éxito al buscar la TPV`, tpv: JSON.stringify(fetchResult.data.tpvs || fetchResult.data.tpv) }));
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(JSON.stringify({ message: `Error al buscar TPVs: error interno` }));
    }
}

export default handler;

