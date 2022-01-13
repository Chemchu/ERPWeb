import { NextApiRequest, NextApiResponse } from "next"
import { envInformation } from "../../../utils/envInfo";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const {
        query: { id, name },
        method,
    } = req;

    switch (method) {
        case 'GET':
            const responseGet = await fetch(`${envInformation.ERPBACK_URL}api/productos/${id}`);
            const resJsonGet = await responseGet.json();

            res.status(responseGet.status).json(resJsonGet.message);
            break;

        case 'POST':
            // Update or create data in your database
            const responsePost = await fetch(`${envInformation.ERPBACK_URL}api/productos/${id}`, {
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
                body: JSON.stringify({ csv: req.body })
            });

            const resJsonPost = await responsePost.json();

            if (responsePost.status === 200) {
                res.status(200).json({ message: `Los productos han sido añadidos correctamente` });
                return;
            }

            res.status(300).json({ message: `Fallo al añadir los siguientes productos: ${resJsonPost.productos}` });

            break;

        case 'DELETE':

            break;

        default:
            res.setHeader('Allow', ['GET', 'DELETE', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}

export default handler;