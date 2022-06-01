import { NextApiRequest, NextApiResponse } from "next"
import { QUERY_SALES } from "../../../../utils/querys";
import GQLQuery from "../../../../utils/serverFetcher";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // const session = await getSession({ req })
    // if (!session) {
    //     return res.status(401).json({ message: "Not signed in" });
    // }

    switch (req.method) {
        case 'GET':
            return await GetSaleByDate(req, res);

        case 'DELETE':

            break;

        default:
            res.setHeader('Allow', ['GET', 'DELETE']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

const GetSaleByDate = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const fetchResult = await GQLQuery.query({
            query: QUERY_SALES,
            variables: {
                find: {
                    createdAt: req.query.id
                }
            }
        });

        if (fetchResult.error) {
            return res.status(300).json({ message: `Fallo al pedir la lista de ventas por fecha` });
        }
        return res.status(200).json({ message: `Lista de ventas por fecha encontrada`, ventas: JSON.stringify(fetchResult.data.ventas) });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: `Error: ${err}` });
    }
}

export default handler;