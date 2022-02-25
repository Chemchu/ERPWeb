import { gql } from "@apollo/client";
import { NextApiRequest, NextApiResponse } from "next";
import GQLFetcher from "../../../utils/serverFetcher";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const fetchResult = await GQLFetcher.query(
            {
                query: gql`
                query Empleado($find: EmpleadoFind!) {
                    empleado(find: $find) {
                        nombre
                        apellidos
                        _id
                        rol
                        email
                    }
                }
                `,
                variables: {
                    "find": {
                        "_id": req.query.id
                    }
                }
            }
        );

        // Devolver en caso de que todo haya ido bien
        if (!fetchResult.error) {
            return res.status(200).json(JSON.stringify({ message: `Empleado encontrado`, empleado: fetchResult.data.empleado }));
        }

        return res.status(300).json({ message: `Fallo al buscar el empleado` });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: `Fallo al de consexión con el servidor: ${err}` });
    }
}

export default handler;

