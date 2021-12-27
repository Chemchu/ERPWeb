import { NextApiRequest, NextApiResponse } from "next"
import { envInformation } from "../../../utils/envInfo";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const {
        query: { id, name },
        method,
    } = req;

    switch (method) {
        case 'GET':
            // Get data from your database 
            const response = await (await fetch(`${envInformation.ERPBACK_URL}api/clientes/${id}`)).json();
            res.status(200).json(response);
            break;

        case 'PUT':
            // Update or create data in your database
            res.status(200).json({ id, name: name || `Cliente ${id}` });
            break;

        case 'DELETE':

            break;

        default:
            res.setHeader('Allow', ['GET', 'DELETE', 'PUT']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}

export default handler;