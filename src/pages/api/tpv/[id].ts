import { NextApiRequest, NextApiResponse } from "next";
import { ADD_CIERRE, OCUPY_TPV, QUERY_TPV, QUERY_TPVS } from "../../../utils/querys";
import GQLQuery, { GQLMutate } from "../../../utils/serverFetcher";
import queryString from 'query-string';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (!req.query.id) { return res.status(300).json({ message: `No se puede recibir una petición sin param por esta ruta`, successful: false }); }

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

const GetTpvsByUcupabilidad = async (req: NextApiRequest, res: NextApiResponse) => {
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

const AddCierre = async (req: NextApiRequest, res: NextApiResponse) => {
    const serverRes = await GQLMutate(
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
    )
    const apiResponse = await serverRes.json()
    const data = JSON.parse(apiResponse.data);

    if (data.addCierreTPV.successful) {
        res.setHeader('Set-Cookie', `authorization=${data.addCierreTPV.token}; HttpOnly; Path=/`);
        return res.status(200).json({ message: `Éxito al cerrar la TPV`, successful: true });
    }

    return res.status(300).json({ message: `Fallo al cerrar la TPV`, successful: data.addCierreTPV.successful });
}

export default handler;

