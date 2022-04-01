import { NextApiRequest, NextApiResponse } from "next";
import { getJwtFromString } from "../../../hooks/jwt";
import { Cliente } from "../../../tipos/Cliente";
import { CustomerPaymentInformation } from "../../../tipos/CustomerPayment";
import { Empleado } from "../../../tipos/Empleado";
import { Producto } from "../../../tipos/Producto";
import { ADD_SALE, QUERY_SALES } from "../../../utils/querys";
import GQLFetcher from "../../../utils/serverFetcher";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // const session = await getSession({ req })
    // if (!session) {
    //     return res.status(401).json({ message: "Not signed in" });
    // }

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
    const fetchResult = await GQLFetcher.query(
        {
            query: QUERY_SALES,
            variables: {
                "limit": 3000,
            },
            fetchPolicy: "no-cache"
        }
    );

    if (fetchResult) {
        let vParsed = fetchResult.data.ventas;
        return res.status(200).json({ message: `Lista de clientes encontrada`, data: JSON.stringify(vParsed) });
    }

    return res.status(300).json({ message: `Fallo al pedir la lista de clientes` });
}

const AddSale = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const productosEnCarrito: Producto[] = req.body.productosEnCarrito;
        const pagoCliente: CustomerPaymentInformation = req.body.pagoCliente;
        const cliente: Cliente = req.body.cliente;
        const empleado: Empleado = req.body.empleado;
        const jwt = getJwtFromString(req.cookies.authorization);

        const fetchResult = await GQLFetcher.mutate(
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
                        "tpv": jwt.TPV
                    }
                },
                fetchPolicy: "no-cache"
            }
        );

        if (fetchResult.errors) {
            return res.status(300).json({ message: `Fallo al buscar la venta` });
        }
        return res.status(200).json(fetchResult.data);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: `Error: ${err}` });
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