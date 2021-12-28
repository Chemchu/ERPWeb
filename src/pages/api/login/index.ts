import { NextApiRequest, NextApiResponse } from "next";
import { envInformation } from "../../../utils/envInfo";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const loginPostConfig = {
            email: req.body.email,
            password: req.body.password
        }

        // Petición login
        const resFromAPI = await (await fetch(`${envInformation.ERPBACK_URL}login/authenticate`, {
            method: 'GET',
            body: JSON.stringify(loginPostConfig)
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

