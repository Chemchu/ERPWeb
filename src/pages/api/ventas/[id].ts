import { NextApiRequest, NextApiResponse } from "next"
import { QUERY_SALE } from "../../../utils/querys";
import GQLFetcher from "../../../utils/serverFetcher";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // const session = await getSession({ req })
    // if (!session) {
    //     return res.status(401).json({ message: "Not signed in" });
    // }

    switch (req.method) {
        case 'GET':
            return await GetSale(req, res);

        case 'DELETE':

            break;

        default:
            res.setHeader('Allow', ['GET', 'DELETE', 'POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

const GetSale = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const fetchResult = await GQLFetcher.query(
            {
                query: QUERY_SALE,
                variables: {
                    "id": req.query.id
                }
            }
        );

        if (fetchResult.error) {
            return res.status(300).json({ message: `Fallo al buscar la venta` });
        }
        return res.status(200).json({ message: `Venta encontrada` });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: `Error: ${err}` });
    }
}

export default handler;