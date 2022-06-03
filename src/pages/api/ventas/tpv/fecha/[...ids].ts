import { NextApiRequest, NextApiResponse } from "next"
import { QUERY_SALES } from "../../../../../utils/querys";
import GQLQuery from "../../../../../utils/serverFetcher";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case 'GET':
            return await GetSaleByTPVDate(req, res);

        default:
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

const GetSaleByTPVDate = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { ids } = req.query;

        const apiResponse = await (await GQLQuery({
            query: QUERY_SALES,
            variables: {
                find: {
                    tpv: ids[0],
                    createdAt: ids[1]
                }
            }
        })).json();

        const data = JSON.parse(apiResponse.data);
        return res.status(apiResponse.successful ? 200 : 300).json({ message: apiResponse.message, data: data.ventas, successful: apiResponse.successful });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: `Error: ${err}`, successful: false });
    }
}

export default handler;