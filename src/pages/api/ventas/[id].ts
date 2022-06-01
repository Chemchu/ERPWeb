import { NextApiRequest, NextApiResponse } from "next"
import { ADD_SALES_FILE, QUERY_SALE, QUERY_SALES } from "../../../utils/querys";
import GQLQuery from "../../../utils/serverFetcher";
import queryString from 'query-string';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // const session = await getSession({ req })
    // if (!session) {
    //     return res.status(401).json({ message: "Not signed in" });
    // }
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
    const response = await GQLQuery.mutate({
        mutation: ADD_SALES_FILE,
        variables: {
            ventasJson: JSON.stringify(req.body)
        }
    });

    if (response.data.addVentasFile.successful) {
        return res.status(200).json({ message: response.data.addVentasFile.message });
    }

    return res.status(300).json({ message: `Fallo al añadir las ventas: ${response.data.message}` });
}

const GetSale = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const query = queryString.parse(req.query.id.toString());
        let fetchResult;

        if (query.id) {
            fetchResult = await GQLQuery.query(
                {
                    query: QUERY_SALE,
                    variables: {
                        "id": query.id
                    },
                    fetchPolicy: "no-cache"
                }
            );
        }
        if (query.fechaInicial && query.fechaFinal) {
            fetchResult = await GQLQuery.query(
                {
                    query: QUERY_SALES,
                    variables: {
                        "find": {
                            "fechaInicial": query.fechaInicial,
                            "fechaFinal": query.fechaFinal
                        }
                    },
                    fetchPolicy: "no-cache"
                }
            );
        }

        if (!fetchResult?.error) {
            return res.status(200).json({ data: fetchResult?.data });
        }
        return res.status(300).json({ message: `Fallo al buscar la venta` });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: `Error: ${err}` });
    }
}

const GetSalesByQuery = async (userQuery: queryString.ParsedQuery<string>, res: NextApiResponse) => {
    if (!userQuery.query) { res.status(300).json({ message: `La query no puede estar vacía` }); }

    const fetchResult = await GQLQuery.query(
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
    );

    if (fetchResult.data.ventas) {
        return res.status(200).json({ message: `Ventas encontradas`, ventas: fetchResult.data.ventas });
    }

    return res.status(300).json({ message: `Fallo al realizar la búsqueda` });
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '50mb',
        },
    },
}

export default handler;