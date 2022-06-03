import { NextApiRequest, NextApiResponse } from "next";
import queryString from 'query-string';
import { ADD_CLIENTES_FILE as ADD_CLIENTS_FILE, DELETE_CLIENT, QUERY_CLIENT, QUERY_CLIENTS, UPDATE_CLIENT } from "../../../utils/querys";
import GQLQuery, { GQLMutate } from "../../../utils/serverFetcher";

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
    const apiResponse = await (await GQLMutate(
        {
            mutation: ADD_CLIENTS_FILE,
            variables: {
                "csv": reqBody.csv
            }
        }
    )).json();

    return res.status(apiResponse ? 200 : 300).json({ message: apiResponse.message, successful: apiResponse.successful });
}

const GetClientesFromQuery = async (userQuery: queryString.ParsedQuery<string>, res: NextApiResponse) => {
    if (!userQuery.query) { res.status(300).json({ message: `La query no puede estar vacía` }); }

    const apiResponse = await (await GQLQuery(
        {
            query: QUERY_CLIENTS,
            variables: {
                "find": {
                    "query": userQuery.query
                }
            }
        }
    )).json();

    const data = JSON.parse(apiResponse.data);
    return res.status(apiResponse.successful ? 200 : 300).json({ message: apiResponse.successful, data: data.clientes, successful: apiResponse.successful });
}

const GetClienteFromId = async (req: NextApiRequest, res: NextApiResponse) => {
    const reqBody = req.body;

    if (!reqBody.find) { return res.status(300).json({ message: "La búsqueda no puede estar vacía", successful: false }); }
    const apiResponse = await (await GQLMutate(
        {
            mutation: QUERY_CLIENT,
            variables: {
                "find": {
                    "_id": reqBody.find._id
                }
            }
        }
    )).json();

    const data = JSON.parse(apiResponse.data);
    return res.status(apiResponse.successful ? 200 : 300).json({ message: apiResponse.message, successful: apiResponse.successful, data: data.cliente });
}

const UpdateCliente = async (req: NextApiRequest, res: NextApiResponse) => {
    const reqBody = req.body;
    const apiResponse = await (await GQLMutate(
        {
            mutation: UPDATE_CLIENT,
            variables: {
                "id": reqBody._id,
                "nif": reqBody.nif,
                "nombre": reqBody.nombre,
                "calle": reqBody.calle,
                "cp": reqBody.cp
            },
        }
    )).json();
    //const data = JSON.parse(apiResponse.data);
    // data.updateCliente

    return res.status(apiResponse.successful ? 200 : 300).json({ message: apiResponse.message, successful: apiResponse.successful });
}

const DeleteCliente = async (req: NextApiRequest, res: NextApiResponse) => {
    const apiResponse = await (await GQLMutate(
        {
            mutation: DELETE_CLIENT,
            variables: {
                "id": req.query.id
            }
        }
    )).json();

    return res.status(apiResponse.successful ? 200 : 300).json({ message: apiResponse.message, successful: apiResponse.successful });
}

export default handler;