import { gql } from "@apollo/client";
import { NextApiRequest, NextApiResponse } from "next";
import GQLFetcher from "../../../utils/serverFetcher";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const reqCredentials = req.body;
        let fetchResult;

        if (reqCredentials.find) {
            fetchResult = await GQLFetcher.query(
                {
                    query: gql`
                query Clientes($find: ClientesFind, $limit: Int) {
                    clientes(find: $find, limit: $limit) {
                        ${reqCredentials.neededValues.map((c: string) => { return c })}
                    }
                }
                `,
                    variables: {
                        "find": {
                            "_ids": reqCredentials.find._ids,
                            "nombre": reqCredentials.find.nombre
                        },
                        "limit": reqCredentials.limit
                    }
                }
            );
        }
        else {
            fetchResult = await GQLFetcher.query(
                {
                    query: gql`
                query Clientes($limit: Int) {
                    clientes(limit: $limit) {
                        ${reqCredentials.neededValues.map((c: string) => { return c })}
                    }
                }
                `
                }
            );
        }


        if (!fetchResult.error) {
            return res.status(200).json(fetchResult.data);
        }

        return res.status(300).json({ message: `Fallo al pedir la lista de clientes` });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: `Error: ${err}` });
    }
}

export default handler;