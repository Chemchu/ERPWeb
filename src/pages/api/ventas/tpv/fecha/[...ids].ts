import { NextApiRequest, NextApiResponse } from "next"
import { QUERY_SALES } from "../../../../../utils/querys";
import GQLQuery from "../../../../../utils/serverFetcher";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // const session = await getSession({ req })
    // if (!session) {
    //     return res.status(401).json({ message: "Not signed in" });
    // }

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

        const fetchResult = await GQLQuery.query({
            query: QUERY_SALES,
            variables: {
                find: {
                    tpv: ids[0],
                    createdAt: ids[1]
                }
            },
            fetchPolicy: "no-cache"
        });

        if (fetchResult.error) {
            return res.status(300).json({ message: `Fallo al pedir la lista de ventas por TPV` });
        }
        return res.status(200).json({ message: `Lista de ventas por TPV encontrada`, ventas: JSON.stringify(fetchResult.data.ventas) });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: `Error: ${err}` });
    }
}

export default handler;