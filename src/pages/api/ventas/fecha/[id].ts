import { NextApiRequest, NextApiResponse } from "next"
import { QUERY_SALES } from "../../../../utils/querys";
import GQLQuery from "../../../../utils/serverFetcher";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case 'GET':
            return await GetSaleByDate(req, res);

        default:
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

const GetSaleByDate = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const serverRes = await GQLQuery({
            query: QUERY_SALES,
            variables: {
                find: {
                    createdAt: req.query.id
                }
            }
        })
        const apiResponse = await serverRes.json();

        const data = JSON.parse(apiResponse.data);
        return res.status(serverRes.ok ? 200 : 300).json({ message: data.message, data: data.ventas, successful: data.successful });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: `Error: ${err}`, successful: false });
    }
}

export default handler;