import { NextApiRequest, NextApiResponse } from "next";
import { QUERY_TPVS } from "../../../utils/querys";
import GQLQuery from "../../../utils/serverFetcher";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const apiResponse = await (await GQLQuery(
            {
                query: QUERY_TPVS,
                variables: {
                    "limit": 100,
                    "find": null
                }
            }
        )).json();

        const data = JSON.parse(apiResponse.data);
        return res.status(apiResponse.successful ? 200 : 300).json({ message: `Éxito al iniciar sesión`, data: data.tpvs, successful: apiResponse.successful });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(JSON.stringify({ message: `Error al buscar TPVs: error interno`, successful: false }));
    }
}

export default handler;

