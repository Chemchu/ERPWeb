import { NextApiRequest, NextApiResponse } from "next";
import { SesionEmpleado } from "../../../tipos/Empleado";
import { ADD_CIERRE, QUERY_CIERRES } from "../../../utils/querys";
import GQLQuery, { GQLMutate } from "../../../utils/serverFetcher";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        switch (req.method) {
            case 'GET':
                return await GetCierres(req, res);

            case 'POST':
                return await AddCierre(req, res);

            default:
                res.setHeader('Allow', ['GET', 'POST']);
                res.status(405).end(`Method ${req.method} Not Allowed`);
        }

    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: `Error: ${err}` });
    }
}

const GetCierres = async (req: NextApiRequest, res: NextApiResponse) => {
    const apiResponse = await (await GQLQuery({
        query: QUERY_CIERRES, variables: {
            "limit": 3000
        }
    })).json();

    const data = JSON.parse(apiResponse.data);

    return res.status(apiResponse.successful ? 200 : 300).json({ message: apiResponse.message, data: data.cierresTPVs, successful: apiResponse.successful });
}

const AddCierre = async (req: NextApiRequest, res: NextApiResponse) => {
    const Empleado: SesionEmpleado = req.body.Empleado;
    const TotalEfectivo = req.body.TotalEfectivo;
    const TotalTarjeta = req.body.TotalTarjeta;
    const DineroRetirado = req.body.DineroRetirado;
    const TotalPrevistoEnCaja = req.body.TotalPrevistoEnCaja;
    const TotalRealEnCaja = req.body.TotalRealEnCaja;
    const Ventas = req.body.NumVentas;
    const Tpv = req.body.TPV;

    const apiResponse = await (await GQLMutate({
        mutation: ADD_CIERRE,
        variables: {
            "cierre": {
                "tpv": Empleado.TPV,
                "cajaInicial": Tpv.cajaInicial,
                "abiertoPor": {
                    "_id": Tpv.enUsoPor._id,
                    "nombre": Tpv.enUsoPor.nombre,
                    "apellidos": Tpv.enUsoPor.apellidos,
                    "rol": Tpv.enUsoPor.rol,
                    "email": Tpv.enUsoPor.email
                },
                "cerradoPor": {
                    "_id": Empleado._id,
                    "nombre": Empleado.nombre,
                    "apellidos": Empleado.apellidos,
                    "rol": Empleado.rol,
                    "email": Empleado.email
                },
                "apertura": Tpv.updatedAt,
                "ventasEfectivo": Number(TotalEfectivo),
                "ventasTarjeta": Number(TotalTarjeta),
                "ventasTotales": Number(TotalEfectivo) + Number(TotalTarjeta),
                "dineroRetirado": Number(DineroRetirado),
                "fondoDeCaja": Number(TotalRealEnCaja) - Number(DineroRetirado),
                "numVentas": Ventas,
                "dineroEsperadoEnCaja": Number(TotalPrevistoEnCaja),
                "dineroRealEnCaja": Number(TotalRealEnCaja)
            }
        }
    })).json();

    const data = JSON.parse(apiResponse.data);

    if (apiResponse.successful) {
        res.setHeader('Set-Cookie', `authorization=${data.addCierreTPV.token}; HttpOnly; Path=/`);
        res.status(200).json({ message: apiResponse.message, successful: apiResponse.successful, data: data.addCierreTPV.cierre });
        return;
    }
    else {
        res.setHeader('Set-Cookie', `authorization=${apiResponse.data.addCierreTPV.token}; HttpOnly; Path=/`);
        res.status(300).json({ message: apiResponse.message, successful: apiResponse.successful });
        return;
    }
}

export default handler;