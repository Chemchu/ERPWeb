import { NextApiRequest, NextApiResponse } from "next";
import { envInformation } from "../../../utils/envInfo";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const {
        query: { id, name },
        method,
    } = req;

    switch (method) {
        case 'GET':
            // Get data from your database 
            const response = await (await fetch(`${envInformation.ERPBACK_URL}api/ventas`)).json();

            let rParsed = response.message;
            for (var i = 0; i < response.message.length; i++) {
                rParsed[i].createdAt = new Date(response.message[i].createdAt).toLocaleString();
                rParsed[i].updatedAt = new Date(response.message[i].updatedAt).toLocaleString();
            }

            res.status(200).json(rParsed);
            break;
        case 'PUT':
            // Update or create data in your database
            res.status(200).json({ id, name: name || `User ${id}` })
            break;

        case 'DELETE':

            break;

        default:
            res.setHeader('Allow', ['GET', 'PUT'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '5mb',
        },
    },
}

export default handler;