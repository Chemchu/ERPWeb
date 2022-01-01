import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { envInformation } from "../../../utils/envInfo";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req })
    if (!session) {
        return res.status(401).json({ message: "Not signed in" });
    }

    switch (req.method) {
        case 'GET':
            const response = await fetch(`${envInformation.ERPBACK_URL}api/ventas`);
            const resJson = await response.json();

            let rParsed = resJson.message;
            for (var i = 0; i < resJson.message.length; i++) {
                rParsed[i].createdAt = new Date(resJson.message[i].createdAt).toLocaleString();
                rParsed[i].updatedAt = new Date(resJson.message[i].updatedAt).toLocaleString();
            }

            res.status(response.status).json(resJson.message);
            break;
        case 'PUT':
            // Update or create data in your database
            //res.status(200).json({ id, name: name || `User ${id}` })
            break;

        case 'DELETE':

            break;

        default:
            res.setHeader('Allow', ['GET', 'PUT'])
            res.status(405).end(`Method ${req.method} Not Allowed`)
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