import { NextApiRequest, NextApiResponse } from "next";
import { QUERY_CIERRES } from "../../../utils/querys";
import GQLQuery from "../../../utils/serverFetcher";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const apiResponse = await (await GQLQuery({
            query: QUERY_CIERRES,
            variables: {
                "find": {
                    "fecha": req.query.id
                }
            }
        })).json();

        const data = JSON.parse(apiResponse.data).cierresTPVs;

        console.log(data);


        return res.status(apiResponse.successful ? 200 : 300).json({ message: data.message, successful: data.successful, data: data.data });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: `Error: ${err}`, successful: false });
    }
}

export default handler;