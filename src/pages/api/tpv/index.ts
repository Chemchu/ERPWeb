import { NextApiRequest, NextApiResponse } from "next";
import { QUERY_TPVS } from "../../../utils/querys";
import GQLQuery from "../../../utils/serverFetcher";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const serverRes = await GQLQuery(
            {
                query: QUERY_TPVS,
                variables: {
                    "limit": 100,
                    "find": null
                }
            }
        )
        const apiResponse = await serverRes.json()

        const data = JSON.parse(apiResponse.data);
        return res.status(serverRes.ok ? 200 : 300).json({ message: data.message, data: data.tpvs, successful: data.successful });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(JSON.stringify({ message: `Error al buscar TPVs: error interno`, successful: false }));
    }
}

export default handler;

