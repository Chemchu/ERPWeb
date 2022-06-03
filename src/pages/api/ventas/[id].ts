import { NextApiRequest, NextApiResponse } from "next"
import { ADD_SALES_FILE, QUERY_SALE, QUERY_SALES } from "../../../utils/querys";
import GQLQuery, { GQLMutate } from "../../../utils/serverFetcher";
import queryString from 'query-string';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const query = queryString.parse(req.query.id.toString());

    switch (req.method) {
        case 'POST':
            if (req.query.id === "file") {
                return await AddVentaFromFile(req, res);
            }

        case 'GET':
            if (query.query) { return await GetSalesByQuery(query, res); }
            else { return await GetSale(req, res); }

        default:
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

const AddVentaFromFile = async (req: NextApiRequest, res: NextApiResponse) => {
    const apiResponse = await (await GQLMutate({
        mutation: ADD_SALES_FILE,
        variables: {
            ventasJson: JSON.stringify(req.body)
        }
    })).json();

    return res.status(apiResponse.successful ? 200 : 300).json({ message: apiResponse.message, successful: apiResponse.successful });
}

const GetSale = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const query = queryString.parse(req.query.id.toString());
        let apiResponse;

        if (query.id) {
            apiResponse = await (await GQLQuery(
                {
                    query: QUERY_SALE,
                    variables: {
                        "id": query.id
                    }
                }
            )).json();
        }
        if (query.fechaInicial && query.fechaFinal) {
            apiResponse = await (await GQLQuery(
                {
                    query: QUERY_SALES,
                    variables: {
                        "find": {
                            "fechaInicial": query.fechaInicial,
                            "fechaFinal": query.fechaFinal
                        }
                    }
                }
            )).json();
        }

        const data = JSON.parse(apiResponse.data);
        return res.status(apiResponse.successful ? 200 : 300).json({ message: apiResponse.message, successful: apiResponse.successful, data: data });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: `Error: ${err}`, successful: false });
    }
}

const GetSalesByQuery = async (userQuery: queryString.ParsedQuery<string>, res: NextApiResponse) => {
    if (!userQuery.query) { res.status(300).json({ message: `La query no puede estar vacía` }); }

    const apiResponse = await (await GQLQuery(
        {
            query: QUERY_SALES,
            variables: {
                "find": {
                    "query": userQuery.query,
                    "fechaInicial": userQuery.fechas ? userQuery.fechas[0] : null,
                    "fechaFinal": userQuery.fechas ? userQuery.fechas[1] : null
                }
            }
        }
    )).json();

    const data = JSON.parse(apiResponse.data);
    return res.status(apiResponse.successful ? 200 : 300).json({ message: `Ventas encontradas`, data: data.ventas, successful: apiResponse.successful });
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '50mb',
        },
    },
}

export default handler;