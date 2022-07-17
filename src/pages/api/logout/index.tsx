import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        switch (req.method) {
            case 'GET':
                return res.status(200)
                    .setHeader('Set-Cookie', `authorization=deleted; HttpOnly; expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/`)
                    .json({ message: "Logout at" + Date.now });

            default:
                res.setHeader('Allow', ['GET']);
                res.status(405).end(`Method ${req.method} Not Allowed`);
        }

    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: `Error: ${err}` });
    }
}

export default handler;

