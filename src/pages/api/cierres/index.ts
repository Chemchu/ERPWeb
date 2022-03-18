import { NextApiRequest, NextApiResponse } from "next";
import { QUERY_CIERRES } from "../../../utils/querys";
import GQLFetcher from "../../../utils/serverFetcher";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        let fetchResult;

        fetchResult = await GQLFetcher.query({
            query: QUERY_CIERRES, variables: {
                "limit": 3000
            }
        });

        if (!fetchResult.error) {
            return res.status(200).json(fetchResult.data);
        }

        return res.status(300).json({ message: `Fallo al pedir la lista de cierres` });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: `Error: ${err}` });
    }
}

export default handler;