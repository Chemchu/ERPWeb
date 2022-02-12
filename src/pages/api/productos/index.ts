import { gql } from "@apollo/client";
import { NextApiRequest, NextApiResponse } from "next";
import GQLFetcher from "../../../utils/serverFetcher";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const request = req.body;
        let fetchResult;

        if (request.find) {
            fetchResult = await GQLFetcher.query(
                {
                    query: gql`
                query Productos($limit: Int, $find: ProductosFind) {
                    productos(limit: $limit, find: $find) {
                        ${request.neededValues.map((p: string) => { return p })}
                    }
                }
                `,
                    variables: {
                        "find": {
                            "_ids": request.find._ids,
                            "nombre": request.find.nombre,
                            "familia": request.find.familia,
                            "proveedor": request.find.proveedor
                        },
                        "limit": request.limit
                    }
                }
            );
        }
        else {
            fetchResult = await GQLFetcher.query(
                {
                    query: gql`
                query Productos($limit: Int) {
                    productos(limit: $limit) {
                        ${request.neededValues.map((p: string) => { return p })}
                    }
                }
                `
                }
            );
        }

        if (!fetchResult.error) {
            return res.status(200).json(fetchResult.data);
        }

        return res.status(300).json({ message: `Fallo al pedir la lista de productos` });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: `${err}` });
    }
}


export default handler;