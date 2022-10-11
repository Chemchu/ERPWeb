import { NextApiRequest, NextApiResponse } from "next"
import { DELETE_MERMA, QUERY_MERMA, QUERY_MERMAS, UPDATE_MERMA } from "../../../utils/querys";
import GQLQuery, { GQLMutate } from "../../../utils/serverFetcher";
import queryString from 'query-string';
import { Merma } from "../../../tipos/Merma";

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
        if (!req.query.id) { return res.status(300).json({ message: `No se puede recibir una petición sin param por esta ruta`, successful: false }); }

        const method = req.method;
        const query = queryString.parse(req.query.id.toString());
        switch (method) {
            case 'GET':
                if (Object.keys(query).length > 0) { return await GetMermaFromQuery(query, res); }
                else { return await GetMermaFromId(req, res); }

            case 'PUT':
                return await UpdateMerma(req, res);

            case 'DELETE':
                return await DeleteMerma(req, res);
        }

    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: `${err}` });
    }
}

const GetMermaFromId = async (req: NextApiRequest, res: NextApiResponse) => {
    const serverRes = await GQLQuery({
        query: QUERY_MERMAS, variables: {
            "find": {
                "_id": req.query.id
            }
        }
    });
    const apiResponse = await serverRes.json();
    const data = JSON.parse(apiResponse.data);

    return res.status(serverRes.ok ? 200 : 300).json({ message: data.message, data: data.merma, successful: data.successful ? data.successful : serverRes.ok });
}

const GetMermaFromQuery = async (userQuery: queryString.ParsedQuery<string>, res: NextApiResponse) => {
    if (!userQuery.query) { res.status(300).json({ message: `La query no puede estar vacía`, successful: false }); }

    const serverRes = await GQLQuery({
        query: QUERY_MERMA,
        variables: {
            "find": {
                "_id": userQuery
            }
        }
    })
    const apiResponse = await serverRes.json();
    const data = JSON.parse(apiResponse.data);

    return res.status(serverRes.ok ? 200 : 300).json({ mermas: data.mermas });
}


const DeleteMerma = async (req: NextApiRequest, res: NextApiResponse) => {
    const apiResponse = await (await GQLMutate({
        mutation: DELETE_MERMA,
        variables: {
            "id": req.query.id
        }
    })).json();

    const data = JSON.parse(apiResponse.data).deleteMerma;
    return res.status(data.successful ? 200 : 300).json({ message: data.message, successful: data.successful });
}

const UpdateMerma = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const merma: Merma = req.body;
        const apiResponse = await (await GQLMutate({
            mutation: UPDATE_MERMA,
            variables: {
                "merma": {
                    "productos": [
                        {
                            "_id": null,
                            "cantidad": null,
                            "motivo": null
                        }
                    ],
                    "empleadoId": null
                }
            }
        })).json();

        const data = JSON.parse(apiResponse.data).updateMerma;
        return res.status(data.successful ? 200 : 300).json({ message: data.message, successful: data.successful });

    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: `Error interno: respuesta no válida por parte del servidor.`, successful: false });
    }
}

export default handler;