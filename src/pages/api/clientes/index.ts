import { NextApiRequest, NextApiResponse } from "next";
import { ADD_CLIENT, QUERY_CLIENTS } from "../../../utils/querys";
import GQLFetcher from "../../../utils/serverFetcher";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        switch (req.method) {
            case 'POST':
                return await AddCliente(req, res);
            case 'GET':
                return await GetClientes(req, res);
        }

        return res.status(300).json({ message: `Fallo al pedir la lista de clientes`, successful: false });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: `Error: ${err}`, successful: false });
    }
}

const AddCliente = async (req: NextApiRequest, res: NextApiResponse) => {
    const reqBody = req.body;
    const fetchResult = await GQLFetcher.mutate(
        {
            mutation: ADD_CLIENT,
            variables: {
                "nombre": reqBody.nombre,
                "calle": reqBody.calle,
                "nif": reqBody.nif,
                "cp": reqBody.cp
            },
            fetchPolicy: "no-cache"
        }
    );

    if (!fetchResult.errors) {
        return res.status(200).json({ message: "Éxito al buscar a los clientes", successful: true, clientes: fetchResult.data.clientes });
    }

    return res.status(300).json({ message: "Fallo al buscar los clientes", successful: false });
}

const GetClientes = async (req: NextApiRequest, res: NextApiResponse) => {
    const reqBody = req.body;
    const fetchResult = await GQLFetcher.query(
        {
            query: QUERY_CLIENTS,
            variables: {
                "limit": reqBody.limit || 50
            },
            fetchPolicy: "no-cache"
        }
    );
    if (!fetchResult.errors) {
        return res.status(200).json({ message: "Éxito al buscar a los clientes", successful: true, clientes: fetchResult.data.clientes });
    }

    return res.status(300).json({ message: "Fallo al buscar los clientes", successful: false });
}


export default handler;