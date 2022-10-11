import { NextApiRequest, NextApiResponse } from "next";
import { ADD_MERMA, QUERY_MERMAS } from "../../../utils/querys";
import GQLQuery, { GQLMutate } from "../../../utils/serverFetcher";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        switch (req.method) {
            case 'GET':
                return await GetMermas(req, res);

            case 'POST':
                return await AddMerma(req, res);

            default:
                return res.status(400).json({ message: `Solo se puede hacer un GET / POST en productos` });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: `${err}` });
    }
}

const GetMermas = async (req: NextApiRequest, res: NextApiResponse) => {
    const serverRes = await GQLQuery({
        query: QUERY_MERMAS, variables: {
            "find": null,
            "limit": req.body.limit || 10000
        }
    });
    const apiResponse = await serverRes.json();
    const data = JSON.parse(apiResponse.data);

    return res.status(serverRes.ok ? 200 : 300).json({ message: data.message, successful: data.successful ? data.successful : serverRes.ok, data: data.mermas });
}

const AddMerma = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const serverRes = await GQLMutate({
            mutation: ADD_MERMA,
            variables: {
                "merma": {
                    "productos": req.body.productos,
                    "empleadoId": req.body.empleadoId
                }
            }
        });
        const apiResponse = await serverRes.json();

        const data = JSON.parse(apiResponse.data);
        return res.status(data.addMerma.successful ? 200 : 300).json({ message: data.addMerma.message, successful: data.addMerma.successful || false });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: `Error al intentar la merma: ${err}`, successful: false });
    }
}

export default handler;