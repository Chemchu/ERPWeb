import { NextApiRequest, NextApiResponse } from "next";
import { QUERY_PRODUCTS } from "../../../utils/querys";
import GQLFetcher from "../../../utils/serverFetcher";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        let fetchResult;
        const find = req.body.find ? req.body.find : null;
        const limit = req.body.limit ? req.body.limit : 10000;

        switch (req.method) {
            case 'GET':
                fetchResult = await GQLFetcher.query({
                    query: QUERY_PRODUCTS,
                    variables: {
                        "find": find,
                    }
                });

                if (fetchResult.errors) {
                    return res.status(300).json({ message: `Fallo al pedir la lista de productos: ${fetchResult.errors[0]}` });
                }

                if (fetchResult.data) {
                    return res.status(200).json(fetchResult.data);
                }

                return res.status(300).json({ message: `Fallo al pedir la lista de productos` });

            case 'POST':
                fetchResult = await GQLFetcher.query({
                    query: QUERY_PRODUCTS,
                    variables: {
                        "find": find,
                        "limit": limit
                    }
                });

                if (fetchResult.errors) {
                    return res.status(300).json({ message: `Fallo al pedir la lista de productos: ${fetchResult.errors[0]}` });
                }

                if (fetchResult.data) {
                    return res.status(200).json(fetchResult.data);
                }

                return res.status(300).json({ message: `Fallo al pedir la lista de productos` });
                break;

            default:
                return res.status(400).json({ message: `Solo se puede hacer un GET / POST en productos` });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: `${err}` });
    }
}


export default handler;