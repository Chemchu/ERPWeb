import { gql } from "@apollo/client";
import { NextApiRequest, NextApiResponse } from "next"
import GQLFetcher from "../../../utils/serverFetcher";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    // const session = await getSession({ req })
    // if (!session) {
    //     return res.status(401).json({ message: "Not signed in" });
    // }

    const {
        query: { id, name },
        method,
    } = req;

    try {
        const reqCredentials = req.body;
        const fetchResult = await GQLFetcher.query(
            {
                query: gql`
                query Producto($find: ProductoFind!) {
                    producto(find: $find) {
                        ${reqCredentials.neededValues.map((p: string) => { return p + ", " })}
                    }
                }
                `,
                variables: {
                    "find": {
                        "_id": reqCredentials.find._id,
                        "nombre": reqCredentials.find.nombre,
                        "ean": reqCredentials.find.ean
                    }
                }
            }
        );

        if (fetchResult.data.success) {
            return res.status(200).json({ message: `Producto encontrado` });
        }

        return res.status(300).json({ message: `Fallo al pedir el producto` });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: `Error: ${err}` });
    }
}

export default handler;