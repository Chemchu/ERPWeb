import { NextApiRequest, NextApiResponse } from "next";
import { QUERY_CIERRES } from "../../../utils/querys";
import GQLQuery from "../../../utils/serverFetcher";
import queryString from 'query-string';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const method = req.method;
        const query = queryString.parse(req.query.id.toString());

        switch (method) {
            case 'GET':
                if (Object.keys(query).length > 0) { return await GetCierresFromQuery(query, res); }
                else {
                    return res.status(300).json({ message: `Las consulta no puede estar vacía`, successful: false });
                }
        }

        return res.status(300).json({ message: `Solo se acepta metodo GET`, successful: false });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: `${err}` });
    }
}

const GetCierresFromQuery = async (userQuery: queryString.ParsedQuery<string>, res: NextApiResponse) => {
    try {
        const apiResponse = await (await GQLQuery({
            query: QUERY_CIERRES,
            variables: {
                "find": {
                    "fechaInicial": userQuery.fechaInicial || null,
                    "fechaFinal": userQuery.fechaFinal || null,
                    "query": userQuery.query || null
                }
            }
        })).json();

        const data = JSON.parse(apiResponse.data).cierresTPVs;
        return res.status(apiResponse.successful ? 200 : 300).json({ message: data.message, successful: data.successful, data: data.data });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: `Error: ${err}`, successful: false });
    }
}


export default handler;