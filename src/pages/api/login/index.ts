import { gql } from "@apollo/client";
import { NextApiRequest, NextApiResponse } from "next";
import GQLFetcher from "../../../utils/serverFetcher";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const reqCredentials = req.body;
        const fetchResult = await GQLFetcher.query(
            {
                query: gql`
                query Login($loginValues: Credentials!) {
                    login(loginValues: $loginValues) {
                        message
                        success
                        token
                    }
                }
                `,
                variables: {
                    "loginValues": {
                        "email": reqCredentials.email,
                        "password": reqCredentials.password
                    }
                }
            }
        );

        // Devolver en caso de que todo haya ido bien
        if (!fetchResult.error) {
            return res.status(200).json(JSON.stringify({ message: `Éxito al iniciar sesión`, token: fetchResult.data.login.token }));
        }

        return res.status(300).json({ message: `Fallo al iniciar sesión: usuario y/o contraseña incorrectos` });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: `Fallo al iniciar sesión: ${err}` });
    }
}

export default handler;

