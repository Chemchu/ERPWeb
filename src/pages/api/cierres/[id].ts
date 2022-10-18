import { NextApiRequest, NextApiResponse } from "next";
import { ADD_CIERRES_FILE, DELETE_CIERRE, QUERY_CIERRES } from "../../../utils/querys";
import GQLQuery, { GQLMutate } from "../../../utils/serverFetcher";
import queryString from 'query-string';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (!req.query.id) { return res.status(300).json({ message: `No se puede recibir una petición sin param por esta ruta`, successful: false }); }

        const method = req.method;
        const query = queryString.parse(req.query.id.toString());

        switch (method) {
            case 'GET':
                if (Object.keys(query).length > 0) { return await GetCierresFromQuery(query, res); }
                else {
                    return res.status(300).json({ message: `Las consulta no puede estar vacía`, successful: false });
                }
            case 'POST':
                if (req.query.id === "file") {
                    return await AddCierresFromFile(req, res);
                }

            case 'DELETE':
                return await DeleteCierre(req, res);
        }

        return res.status(300).json({ message: `Solo se acepta metodo GET, POST y DELETE`, successful: false });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: `${err}` });
    }
}

const DeleteCierre = async (req: NextApiRequest, res: NextApiResponse) => {
    const apiResponse = await (await GQLMutate({
        mutation: DELETE_CIERRE,
        variables: {
            "id": req.query.id
        }
    })).json();

    const data = JSON.parse(apiResponse.data).deleteCierreTPV;
    return res.status(data.successful ? 200 : 300).json({ message: data.message, successful: data.successful });
}

const AddCierresFromFile = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const apiResponse = await (await GQLMutate({
            mutation: ADD_CIERRES_FILE,
            variables: {
                csv: JSON.stringify(req.body)
            }
        })).json();

        const data = JSON.parse(apiResponse.data).addCierresFile;
        return res.status(data.successful ? 200 : 300).json({ message: data.message, successful: data.successful });
    }
    catch (err) {

    }
}

const GetCierresFromQuery = async (userQuery: queryString.ParsedQuery<string>, res: NextApiResponse) => {
    try {
        const apiResponse = await (await GQLQuery({
            query: QUERY_CIERRES,
            variables: {
                "find": {
                    "fechaInicial": userQuery.fechas ? userQuery.fechas[0] : null,
                    "fechaFinal": userQuery.fechas ? userQuery.fechas[1] : null,
                    "query": userQuery.query || null
                }
            }
        })).json();

        const data = JSON.parse(apiResponse.data);
        return res.status(200).json({ message: "Cierres encontrados", successful: true, data: data.cierresTPVs });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: `Error: ${err}`, successful: false });
    }
}


export default handler;