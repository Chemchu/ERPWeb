import { NextApiRequest, NextApiResponse } from "next";
import { ADD_CIERRE, OCUPY_TPV, QUERY_TPV, QUERY_TPVS, TRANSFERIR_TPV } from "../../../utils/querys";
import GQLQuery, { GQLMutate } from "../../../utils/serverFetcher";
import queryString from 'query-string';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (!req.query.id) { return res.status(300).json({ message: `No se puede recibir una petición sin param por esta ruta`, successful: false }); }

        const query = queryString.parse(req.query.id.toString());
        switch (req.method) {
            case 'GET':
                if (query.isTpvFree !== undefined) { return await GetTpvsByDisponibilidad(req, res); }
                else { return await GetTpvById(req, res); }

            case 'PUT':
                if (query.transferirTpv !== undefined && query.transferirTpv) { return await TransferirTPV(req, res); }
                else return await OcuparTpvById(req, res);

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
    if (!req.query.id) { return res.status(300).json({ message: `No se puede recibir una petición sin param por esta ruta`, successful: false }); }

    const query = queryString.parse(req.query.id.toString());
    const serverRes = await GQLQuery(
        {
            query: QUERY_TPV,
            variables: {
                "find": {
                    "_id": query.TPVId
                },
                "limit": 3000
            }
        }
    )
    const apiResponse = await serverRes.json()

    const data = JSON.parse(apiResponse.data);
    return res.status(serverRes.ok ? 200 : 300).json({ message: data.message, data: data.tpv, successful: data.successful });
}

const GetTpvsByDisponibilidad = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (!req.query.id) { return res.status(300).json({ message: `No se puede recibir una petición sin param por esta ruta`, successful: false }); }

        const query = queryString.parse(req.query.id.toString());
        const isLibre: boolean = Boolean(query.isTpvFree);

        const serverRes = await GQLQuery(
            {
                query: QUERY_TPVS,
                variables: {
                    "find": {
                        "libre": isLibre
                    },
                    "limit": 100
                }
            }
        )
        const apiResponse = await serverRes.json()

        const data = JSON.parse(apiResponse.data);
        return res.status(serverRes.ok ? 200 : 300).json({ message: data.message, data: data.tpvs });
    }
    catch (err) {
        return res.status(300).json({ message: "Error al buscar las TPVs", successful: false });
    }
}

const OcuparTpvById = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const serverRes = await GQLMutate(
            {
                mutation: OCUPY_TPV,
                variables: {
                    "idEmpleado": req.body.empId,
                    "idTpv": req.body.tpvId,
                    "cajaInicial": req.body.cajaInicial
                }
            }
        )
        const apiResponse = await serverRes.json()

        const data = JSON.parse(apiResponse.data);
        if (data.ocupyTPV.successful) {
            res.setHeader('Set-Cookie', `authorization=${data.ocupyTPV.token}; HttpOnly; Path=/`);
            return res.status(200).json({ message: `Éxito al abrir la TPV`, successful: true });
        }

        return res.status(300).json({ message: `Fallo al buscar la TPV`, successful: data.ocupyTPV.successful });
    }
    catch (err) {
        return res.status(300).json({ message: "Error al abrir la caja", successful: false });
    }
}

const TransferirTPV = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const serverRes = await GQLMutate(
            {
                mutation: TRANSFERIR_TPV,
                variables: {
                    "idEmpleadoDestinatario": req.body.empDestinoId,
                    "idTpv": req.body.tpvId,
                }
            }
        )
        const apiResponse = await serverRes.json()

        const data = JSON.parse(apiResponse.data);
        if (data.transferirTpv.successful) {
            res.setHeader('Set-Cookie', `authorization=${data.transferirTpv.token}; HttpOnly; Path=/`);
            res.status(200)
        }
        else {
            res.status(300)
        }

        return res.json({ message: data.transferirTpv.message, successful: data.transferirTpv.successful });
    }
    catch (err) {
        return res.status(300).json({ message: "Error: " + err, successful: false });
    }
}

export default handler;

