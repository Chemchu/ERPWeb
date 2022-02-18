import { gql } from "@apollo/client";
import { NextApiRequest, NextApiResponse } from "next";
import GQLFetcher from "../../../utils/serverFetcher";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const fetchResult = await GQLFetcher.query(
            {
                query: gql`
                        query Tpvs($find: TPVsFind) {
                            tpvs(find: $find) {
                                _id
                                nombre
                                libre
                                enUsoPor
                                cajaInicial
                            }
                        }
                        `,
                variables: {
                    "find": {
                        "libre": false
                    }
                }
            }
        );

        if (!fetchResult.error) {
            let tpvsDisponibles: Map<string, string> = new Map();
            for (let i = 0; i < fetchResult.data.tpvs.length; i++) {
                tpvsDisponibles.set(fetchResult.data.tpvs[i]._id, fetchResult.data.tpvs[i].nombre);
            }

            return res.status(200).json(JSON.stringify({ message: `Éxito al iniciar sesión`, tpvs: JSON.stringify(Array.from(tpvsDisponibles.entries())) }));
        }
        return res.status(300).json({ message: `Fallo al buscar TPV: error GraphQL server` });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(JSON.stringify({ message: `Error al buscar TPVs: error interno` }));
    }
}

export default handler;

