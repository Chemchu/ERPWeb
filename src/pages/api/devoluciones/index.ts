import { NextApiRequest, NextApiResponse } from "next";
import { ADD_DEVOLUCION, QUERY_DEVOLUCIONES } from "../../../utils/querys";
import { GQLQuery, GQLMutate } from "../../../utils/serverFetcher";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        switch (req.method) {
            case 'GET':
                return await GetDevoluciones(req, res);

            case 'POST':
                return await AddDevolucion(req, res);

            default:
                res.setHeader('Allow', ['GET', 'POST']);
                res.status(405).end(`Method ${req.method} Not Allowed`);
        }

    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: `Error: ${err}` });
    }
}

const GetDevoluciones = async (req: NextApiRequest, res: NextApiResponse) => {
    const serverRes = await GQLQuery(
        {
            query: QUERY_DEVOLUCIONES,
            variables: {
                "limit": 1000,
            }
        }
    );
    const apiResponse = await serverRes.json()

    let data = JSON.parse(apiResponse.data);
    return res.status(serverRes.ok ? 200 : 300).json({ message: data.message, data: data.devoluciones, successful: data.successful });
}
const AddDevolucion = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const serverRes = await GQLMutate(
            {
                mutation: ADD_DEVOLUCION,
                variables: {
                    "fields": {
                        "productosDevueltos": req.body.productosDevueltos,
                        "dineroDevuelto": req.body.dineroDevuelto,
                        "ventaId": req.body.ventaId,
                        "tpv": req.body.tpv,
                        "clienteId": req.body.clienteId,
                        "trabajadorId": req.body.trabajadorId,
                        "modificadoPorId": req.body.modificadoPorId,
                    }
                }
            }
        );
        const apiResponse = await serverRes.json();

        const data = JSON.parse(apiResponse.data);
        return res.status(serverRes.ok ? 200 : 300).json({ data: data.addDevolucion, message: data.message, successful: data.successful });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: `Error: ${err}`, successful: false });
    }
}

export default handler;