import { NextApiRequest, NextApiResponse } from "next";
import queryString from 'query-string';
import { ADD_CLIENTES_FILE as ADD_CLIENTS_FILE, DELETE_CLIENT, QUERY_CLIENT, QUERY_CLIENTS, UPDATE_CLIENT } from "../../../utils/querys";
import GQLFetcher from "../../../utils/serverFetcher";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const query = queryString.parse(req.query.id.toString());

        switch (req.method) {
            case 'POST':
                if (req.query.id === "file") {
                    return await AddClientesFromFile(req, res);
                }

            case 'GET':
                if (query.query) { return await GetClientesFromQuery(query, res); }
                return await GetClienteFromId(req, res);

            case 'PUT':
                return await UpdateCliente(req, res);

            case 'DELETE':
                return await DeleteCliente(req, res);
        }

        return res.status(300).json({ message: `Fallo al pedir el cliente`, successful: false });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: `Error: ${err}`, successful: false });
    }
}

const AddClientesFromFile = async (req: NextApiRequest, res: NextApiResponse) => {

    const reqBody = req.body;
    const fetchResult = await GQLFetcher.mutate(
        {
            mutation: ADD_CLIENTS_FILE,
            variables: {
                "csv": reqBody.csv
            },
            fetchPolicy: "no-cache"
        }
    );
    if (!fetchResult.errors) {
        return res.status(200).json({ message: fetchResult.data.message, successful: fetchResult.data.successful });
    }

    return res.status(300).json({ message: "Fallo al añadir los clientes", successful: false });
}

const GetClientesFromQuery = async (userQuery: queryString.ParsedQuery<string>, res: NextApiResponse) => {
    if (!userQuery.query) { res.status(300).json({ message: `La query no puede estar vacía` }); }

    const fetchResult = await GQLFetcher.query(
        {
            query: QUERY_CLIENTS,
            variables: {
                "find": {
                    "query": userQuery.query
                }
            },
            fetchPolicy: "no-cache"
        }
    );

    if (fetchResult.data.clientes) {
        return res.status(200).json({ message: `Productos encontrados`, clientes: fetchResult.data.clientes, successful: true });
    }

    return res.status(300).json({ message: `Fallo al realizar la búsqueda`, successful: false });
}

const GetClienteFromId = async (req: NextApiRequest, res: NextApiResponse) => {
    const reqBody = req.body;

    if (reqBody.find) {
        const fetchResult = await GQLFetcher.mutate(
            {
                mutation: QUERY_CLIENT,
                variables: {
                    "find": {
                        "_id": reqBody.find._id
                    }
                },
                fetchPolicy: "no-cache"
            }
        );
        if (!fetchResult.errors) {
            return res.status(200).json({ message: "Éxito al buscar al cliente", successful: true, clientes: fetchResult.data.cliente });
        }
    }

    return res.status(300).json({ message: "Fallo al buscar al cliente", successful: false });
}

const UpdateCliente = async (req: NextApiRequest, res: NextApiResponse) => {

    const reqBody = req.body;
    const fetchResult = await GQLFetcher.mutate(
        {
            mutation: UPDATE_CLIENT,
            variables: {
                "id": reqBody.id,
                "nif": reqBody.nif,
                "nombre": reqBody.nombre,
                "calle": reqBody.calle,
                "cp": reqBody.cp
            },
            fetchPolicy: "no-cache"
        }
    );
    if (!fetchResult.errors) {
        return res.status(200).json({ message: fetchResult.data.message, successful: fetchResult.data.successful });
    }

    return res.status(300).json({ message: "Fallo al actualizar el cliente", successful: false });
}

const DeleteCliente = async (req: NextApiRequest, res: NextApiResponse) => {

    const reqBody = req.body;
    const fetchResult = await GQLFetcher.mutate(
        {
            mutation: DELETE_CLIENT,
            variables: {
                "id": reqBody._id
            },
            fetchPolicy: "no-cache"
        }
    );
    if (!fetchResult.errors) {
        return res.status(200).json({ message: fetchResult.data.message, successful: fetchResult.data.successful });
    }

    return res.status(300).json({ message: "Fallo al borrar el cliente", successful: false });
}

export default handler;