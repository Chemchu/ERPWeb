import { NextApiRequest, NextApiResponse } from "next";
import { getJwtFromString } from "../../../hooks/jwt";
import { Cliente } from "../../../tipos/Cliente";
import { CustomerPaymentInformation } from "../../../tipos/CustomerPayment";
import { Empleado } from "../../../tipos/Empleado";
import { Producto } from "../../../tipos/Producto";
import { ADD_SALE, QUERY_SALES } from "../../../utils/querys";
import GQLQuery, { GQLMutate } from "../../../utils/serverFetcher";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        switch (req.method) {
            case 'GET':
                return await GetSales(req, res);

            case 'POST':
                return await AddSale(req, res);

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

const GetSales = async (req: NextApiRequest, res: NextApiResponse) => {
    const serverRes = await GQLQuery(
        {
            query: QUERY_SALES,
            variables: {
                "limit": 3000,
            }
        }
    );
    const apiResponse = await serverRes.json()

    let data = JSON.parse(apiResponse.data);
    return res.status(serverRes.ok ? 200 : 300).json({ message: data.message, data: data.ventas, successful: data.successful });
}

const AddSale = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const productosEnCarrito: Producto[] = req.body.productosEnCarrito;
        const pagoCliente: CustomerPaymentInformation = req.body.pagoCliente;
        const cliente: Cliente = req.body.cliente;
        const empleado: Empleado = req.body.empleado;
        const tpv = req.body.tpv;

        const serverRes = await GQLMutate(
            {
                mutation: ADD_SALE,
                variables: {
                    "fields": {
                        "productos": productosEnCarrito,
                        "dineroEntregadoEfectivo": Number(pagoCliente.pagoEnEfectivo.toFixed(2)),
                        "dineroEntregadoTarjeta": Number(pagoCliente.pagoEnTarjeta.toFixed(2)),
                        "precioVentaTotalSinDto": Number(pagoCliente.precioTotalSinDto.toFixed(2)),
                        "precioVentaTotal": Number(pagoCliente.precioTotal.toFixed(2)),
                        "tipo": pagoCliente.tipo,
                        "cambio": Number(pagoCliente.cambio.toFixed(2)),
                        "cliente": cliente,
                        "vendidoPor": empleado,
                        "modificadoPor": empleado,
                        "descuentoEfectivo": Number(pagoCliente.dtoEfectivo.toFixed(2)) || 0,
                        "descuentoPorcentaje": Number(pagoCliente.dtoPorcentaje.toFixed(2)) || 0,
                        "tpv": tpv
                    }
                }
            }
        );
        const apiResponse = await serverRes.json();

        const data = JSON.parse(apiResponse.data);
        return res.status(serverRes.ok ? 200 : 300).json({ data: data.addVenta, message: data.message, successful: data.successful });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: `Error: ${err}`, successful: false });
    }
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '5mb',
        },
    },
}

export default handler;