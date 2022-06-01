
import { NextApiRequest, NextApiResponse } from "next";
import { LOGIN } from "../../../utils/querys";
import GQLFetcher from "../../../utils/serverFetcher";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const reqCredentials = req.body;
        const fetchResult = await GQLFetcher.query(
            {
                query: LOGIN,
                variables: {
                    "loginValues": {
                        "email": reqCredentials.email,
                        "password": reqCredentials.password
                    }
                }
            }
        );
        const jsonResponse = JSON.parse(fetchResult.data);

        // Devolver en caso de que todo haya ido bien
        if (!fetchResult.error && jsonResponse.login.token) {
            const token = getJwt(jsonResponse.login.token);
            const productionEnv: boolean = process.env.NODE_ENV !== "development";

            return res.status(200)
                .setHeader('Set-Cookie', `authorization=${jsonResponse.login.token}; HttpOnly; Secure=${productionEnv}; Max-Age=${token.exp - token.iat}; Path=/`)
                .json(JSON.stringify({ message: `Éxito al iniciar sesión` }));
        }

        return res.status(300).json({ message: `Fallo al iniciar sesión: usuario y/o contraseña incorrectos` });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: `Fallo al iniciar sesión: ${err}` });
    }
}


const getJwt = (jwt: string) => {
    const base64Url = jwt.split(" ")[1].split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = JSON.parse(Buffer.from(base64, 'base64').toString('ascii'));

    return jsonPayload;
}

export default handler;

