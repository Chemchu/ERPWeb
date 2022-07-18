import { NextApiRequest, NextApiResponse } from "next"
import { ADD_SALES_FILE, QUERY_SALE, QUERY_SALES } from "../../../utils/querys";
import GQLQuery, { GQLMutate } from "../../../utils/serverFetcher";
import queryString from 'query-string';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (!req.query.id) { return res.status(300).json({ message: `No se puede recibir una petición sin param por esta ruta`, successful: false }); }

    const query = queryString.parse(req.query.id.toString());
    switch (req.method) {
        case 'POST':
            if (req.query.id === "file") {
                return await AddVentaFromFile(req, res);
            }

        case 'GET':
            if (Object.keys(query).length > 0) { return await GetSalesByQuery(query, res); }
            else { return await GetSale(req, res); }

        default:
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

const AddVentaFromFile = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const apiResponse = await (await GQLMutate({
            mutation: ADD_SALES_FILE,
            variables: {
                ventasJson: JSON.stringify(req.body)
            }
        })).json();

        const data = JSON.parse(apiResponse.data).addVentasFile
        return res.status(data.successful ? 200 : 300).json({ message: data.message, successful: data.successful });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error interno. Si el archivo es muy grande, todavía se estará añadiendo. Espere unos minutos", successful: false });
    }
}

const GetSale = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (!req.query.id) { return res.status(300).json({ message: `No se puede recibir una petición sin param por esta ruta`, successful: false }); }

        const query = queryString.parse(req.query.id.toString());
        let serverRes;

        if (query.id) {
            serverRes = await GQLQuery(
                {
                    query: QUERY_SALE,
                    variables: {
                        "id": query.id
                    }
                }
            )
        }
        if (query.fechaInicial && query.fechaFinal) {
            serverRes = await GQLQuery(
                {
                    query: QUERY_SALES,
                    variables: {
                        "find": {
                            "fechaInicial": query.fechaInicial,
                            "fechaFinal": query.fechaFinal
                        }
                    }
                }
            )
        }
        const apiResponse = await serverRes?.json();

        const data = JSON.parse(apiResponse.data);
        return res.status(serverRes?.ok ? 200 : 300).json({ message: data.message, successful: data.successful, data: data.ventas });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: `Error: ${err}`, successful: false });
    }
}

const GetSalesByQuery = async (userQuery: queryString.ParsedQuery<string>, res: NextApiResponse) => {
    if (Object.keys(userQuery).length === 0) { res.status(300).json({ message: `La query no puede estar vacía` }); }
    const serverRes = await GQLQuery(
        {
            query: QUERY_SALES,
            variables: {
                "find": {
                    "query": userQuery.query,
                    "fechaInicial": userQuery.fechaInicial ? userQuery.fechaInicial : null,
                    "fechaFinal": userQuery.fechaFinal ? userQuery.fechaFinal : null
                },
                "limit": 10000
            }
        }
    );
    const apiResponse = await serverRes.json();

    const data = JSON.parse(apiResponse.data);
    return res.status(serverRes.ok ? 200 : 300).json({ message: data.message, data: data.ventas, successful: data.successful });
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '100mb',
        },
    },
}

export default handler;