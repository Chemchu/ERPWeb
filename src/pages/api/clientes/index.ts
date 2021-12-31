import { NextApiRequest, NextApiResponse } from "next";
import { envInformation } from "../../../utils/envInfo";
import { getSession } from "next-auth/react"


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req })
    if (!session) {
        return res.status(401).json({ message: "Not signed in" });
    }

    switch (req.method) {
        case 'GET':
            // Get data from your database
            const response = await (await fetch(`${envInformation.ERPBACK_URL}api/clientes`)).json();
            res.status(200).json(response.message);

            break;
        case 'PUT':
            // Update or create data in your database
            //res.status(200).json({ id, name: req.query.name || `User ${req.query.id}` })
            break;

        case 'DELETE':

            break;

        default:
            res.setHeader('Allow', ['GET', 'PUT'])
            res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}

export default handler;