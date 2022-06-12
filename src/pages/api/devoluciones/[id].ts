import { NextApiRequest, NextApiResponse } from "next";
import queryString from 'query-string';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const query = queryString.parse(req.query.id.toString());

    switch (req.method) {
        case 'POST':

        case 'GET':
            if (query.query) { return await GetDevolucionesByQuery(query, res); }
            else { return await GetDevolucion(req, res); }

        default:
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

const GetDevolucionesByQuery = async (query: queryString.ParsedQuery<string>, res: NextApiResponse) => {

}

const GetDevolucion = async (req: NextApiRequest, res: NextApiResponse) => {

}

export default handler;