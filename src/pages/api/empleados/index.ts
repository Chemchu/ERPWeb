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
    const serverRes = await GQLQuery(
        {
            query: QUERY_EMPLEADOS,
            variables: {
                "find": null,
                "limit": 3000
            }
        }
    )
    const apiResponse = await serverRes.json()

    const data = JSON.parse(apiResponse.data);
    return res.status(serverRes.ok ? 200 : 300).json({ message: data.message, data: data.empleados, successful: data.successful });
}

export default handler;