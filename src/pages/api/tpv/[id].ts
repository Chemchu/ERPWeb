import { NextApiRequest, NextApiResponse } from "next";
import { OCUPY_TPV, QUERY_TPV, QUERY_TPVS } from "../../../utils/querys";
import GQLFetcher from "../../../utils/serverFetcher";
import queryString from 'query-string';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const query = queryString.parse(req.query.id.toString());

        switch (req.method) {
            case 'GET':
                if (query.isTpvFree !== undefined) { return await GetTpvsByUcupabilidad(req, res); }
                else { return await GetTpvById(req, res); }

            case 'PUT':
                return await OcuparTpvById(req, res);

            default:
                res.setHeader('Allow', ['GET', 'PUT']);
                res.status(405).end(`Method ${req.method} Not Allowed`);
        }

        return res.json({ message: `Fallo al buscar TPV` });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(JSON.stringify({ message: `Error al buscar TPVs: error interno` }));
    }
}

const GetTpvById = async (req: NextApiRequest, res: NextApiResponse) => {
    const fetchResult = await GQLFetcher.query(
        {
            query: QUERY_TPV,
            variables: {
                "find": {
                    "_id": req.query.idvId
                },
                "limit": 3000
            }
        }
    );

    if (fetchResult.data.tpv) {
        return res.status(200).json(JSON.stringify({ message: `Éxito al buscar la TPV`, tpv: JSON.stringify(fetchResult.data.tpv) }));
    }

    return res.status(300).json(JSON.stringify({ message: `Fallo al buscar la TPV` }));
}

const GetTpvsByUcupabilidad = async (req: NextApiRequest, res: NextApiResponse) => {
    const query = queryString.parse(req.query.id.toString());
    const isLibre: boolean = Boolean(query.isTpvFree);

    const fetchResult = await GQLFetcher.query(
        {
            query: QUERY_TPVS,
            variables: {
                "find": {
                    "libre": isLibre
                },
                "limit": 3000
            }
        }
    );
    if (fetchResult.data.tpvs) {
        return res.status(200).json(JSON.stringify({ message: `Éxito al buscar la TPV`, tpv: JSON.stringify(fetchResult.data.tpvs) }));
    }

    return res.status(300).json(JSON.stringify({ message: `Fallo al buscar la TPV` }));
}

const OcuparTpvById = async (req: NextApiRequest, res: NextApiResponse) => {
    const fetchResult = await GQLFetcher.mutate(
        {
            mutation: OCUPY_TPV,
            variables: {
                "idEmpleado": req.body.empId,
                "idTpv": req.body.tpvId,
                "cajaInicial": req.body.cajaInicial
            }
        }
    );

    if (fetchResult.data.ocupyTPV.successful) {
        res.setHeader('Set-Cookie', `authorization=${fetchResult.data.ocupyTPV.token}; HttpOnly; Path=/`);
        return res.status(200).json(JSON.stringify({ message: `Éxito al abrir la TPV`, successful: true }));
    }

    return res.status(300).json(JSON.stringify({ message: `Fallo al buscar la TPV`, successful: fetchResult.data.ocupyTPV.successful }));
}

export default handler;

