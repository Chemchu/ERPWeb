import { NextApiRequest, NextApiResponse } from "next";
import { envInformation } from "../../../utils/envInfo";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {

        if (req.method !== 'POST') {
            res.setHeader('Allow', ['POST'])
            res.status(405).end(`Method ${req.method} Not Allowed`)
        }

        // Petición login
        const resFromAPI = await (await fetch(`${envInformation.ERPBACK_URL}login/authenticate`, {
            method: 'GET',
            body: JSON.stringify({ email: req.body.email, password: req.body.password })
        })).json();

        console.log(resFromAPI);

        if (resFromAPI.data.success) {
            return res.status(200).json({ message: `Éxito al iniciar sesión` });
        }
        else {
            return res.status(300).json({ message: `Error al iniciar sesión: ${resFromAPI.message}` });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: `Fallo al iniciar sesión: ${err}` });
    }
}

export default handler;

