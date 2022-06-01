import { NextApiRequest, NextApiResponse } from "next";
import { ADD_CIERRE, OCUPY_TPV, QUERY_TPV, QUERY_TPVS } from "../../../utils/querys";
import GQLQuery from "../../../utils/serverFetcher";
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
            // if (query.ocuparTpv) { return await OcuparTpvById(req, res); }
            // else { return await AddCierre(req, res); }

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
    const query = queryString.parse(req.query.id.toString());
    const fetchResult = await GQLQuery.query(
        {
            query: QUERY_TPV,
            variables: {
                "find": {
                    "_id": query.TPVId
                },
                "limit": 3000
            },
            fetchPolicy: "no-cache"
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

    const fetchResult = await GQLQuery.query(
        {
            query: QUERY_TPVS,
            variables: {
                "find": {
                    "libre": isLibre
                },
                "limit": 100
            },
            fetchPolicy: "no-cache"
        }
    );
    if (fetchResult.data.tpvs) {
        return res.status(200).json(JSON.stringify({ message: `Éxito al buscar la TPV`, tpv: JSON.stringify(fetchResult.data.tpvs) }));
    }

    return res.status(300).json(JSON.stringify({ message: `Fallo al buscar la TPV` }));
}

const OcuparTpvById = async (req: NextApiRequest, res: NextApiResponse) => {
    const fetchResult = await GQLQuery.mutate(
        {
            mutation: OCUPY_TPV,
            variables: {
                "idEmpleado": req.body.empId,
                "idTpv": req.body.tpvId,
                "cajaInicial": req.body.cajaInicial
            },
            fetchPolicy: "no-cache"
        }
    );

    if (fetchResult.data.ocupyTPV.successful) {
        res.setHeader('Set-Cookie', `authorization=${fetchResult.data.ocupyTPV.token}; HttpOnly; Path=/`);
        return res.status(200).json(JSON.stringify({ message: `Éxito al abrir la TPV`, successful: true }));
    }

    return res.status(300).json(JSON.stringify({ message: `Fallo al buscar la TPV`, successful: fetchResult.data.ocupyTPV.successful }));
}

const AddCierre = async (req: NextApiRequest, res: NextApiResponse) => {
    const fetchResult = await GQLQuery.mutate(
        {
            mutation: ADD_CIERRE,
            variables: {
                "cierre": {
                    "tpv": req.body.TPV,
                    "cajaInicial": req.body.cajaInicial,
                    "abiertoPor": {
                        "_id": req.body.enUsoPor._id,
                        "nombre": req.body.enUsoPor.nombre,
                        "apellidos": req.body.enUsoPor.apellidos,
                        "rol": req.body.enUsoPor.rol,
                        "email": req.body.enUsoPor.email
                    },
                    "cerradoPor": {
                        "_id": req.body._id,
                        "nombre": req.body.nombre,
                        "apellidos": req.body.apellidos,
                        "rol": req.body.rol,
                        "email": req.body.email
                    },
                    "apertura": req.body.updatedAt,
                    "ventasEfectivo": Number(req.body.TotalEfectivo),
                    "ventasTarjeta": Number(req.body.TotalTarjeta),
                    "ventasTotales": Number(req.body.TotalEfectivo) + Number(req.body.TotalTarjeta),
                    "dineroRetirado": Number(req.body.DineroRetirado),
                    "fondoDeCaja": Number(req.body.TotalRealEnCaja) - Number(req.body.DineroRetirado),
                    "numVentas": req.body.Ventas.length || 0,
                    "dineroEsperadoEnCaja": Number(req.body.TotalPrevistoEnCaja),
                    "dineroRealEnCaja": Number(req.body.TotalRealEnCaja)
                }
            }
        }
    );

    if (fetchResult.data.addCierreTPV.successful) {
        res.setHeader('Set-Cookie', `authorization=${fetchResult.data.addCierreTPV.token}; HttpOnly; Path=/`);
        return res.status(200).json(JSON.stringify({ message: `Éxito al cerrar la TPV`, successful: true }));
    }

    return res.status(300).json(JSON.stringify({ message: `Fallo al cerrar la TPV`, successful: fetchResult.data.addCierreTPV.successful }));
}

export default handler;

