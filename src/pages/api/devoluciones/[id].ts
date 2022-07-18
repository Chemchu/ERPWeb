import { NextApiRequest, NextApiResponse } from "next";
import queryString from 'query-string';
import { QUERY_DEVOLUCIONES } from "../../../utils/querys";
import GQLQuery from "../../../utils/serverFetcher";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (!req.query.id) { return res.status(300).json({ message: `No se puede recibir una petición sin param por esta ruta`, successful: false }); }

    const query = queryString.parse(req.query.id.toString());
    switch (req.method) {
        case 'POST':

        case 'GET':
            if (Object.keys(query).length > 0) { return await GetDevolucionesByQuery(query, res); }
            else { return await GetDevolucion(req, res); }

        default:
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

const GetDevolucionesByQuery = async (userQuery: queryString.ParsedQuery<string>, res: NextApiResponse) => {
    if (Object.keys(userQuery).length <= 0) { res.status(300).json({ message: `La query no puede estar vacía` }); }

    const serverRes = await GQLQuery(
        {
            query: QUERY_DEVOLUCIONES,
            variables: {
                find: {
                    query: userQuery.query,
                    fechaInicial: userQuery.fechaInicial || null,
                    fechaFinal: userQuery.fechaFinal || null
                },
                limit: 150
            }
        }
    );
    const apiResponse = await serverRes.json();

    const data = JSON.parse(apiResponse.data);
    return res.status(serverRes.ok ? 200 : 300).json({ message: data.message, data: data.devoluciones, successful: data.successful });
}

const GetDevolucion = async (req: NextApiRequest, res: NextApiResponse) => {

}

export default handler;