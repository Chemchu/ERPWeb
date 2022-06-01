import { NextApiRequest, NextApiResponse } from "next";
import { QUERY_EMPLEADOS } from "../../../utils/querys";
import GQLQuery from "../../../utils/serverFetcher";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        switch (req.method) {
            case 'GET':
                return await GetEmpleados(req, res);

            default:
                return res.status(400).json({ message: `Solo se puede hacer un GET / POST en productos` });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: `${err}` });
    }
}

const GetEmpleados = async (req: NextApiRequest, res: NextApiResponse) => {
    const fetchResult = await GQLQuery.query(
        {
            query: QUERY_EMPLEADOS,
            variables: {
                "find": null,
                "limit": 3000
            }
        }
    );

    if (fetchResult.errors) {
        return res.status(300).json({ message: `Fallo al pedir la lista de productos: ${fetchResult.errors[0]}` });
    }

    if (fetchResult.data) {
        return res.status(200).json(fetchResult.data);
    }

    return res.status(300).json({ message: `Fallo al pedir la lista de productos` });
}

export default handler;