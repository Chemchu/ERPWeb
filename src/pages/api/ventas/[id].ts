import { NextApiRequest, NextApiResponse } from "next"
import { ADD_SALE, QUERY_SALE } from "../../../utils/querys";
import GQLFetcher from "../../../utils/serverFetcher";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // const session = await getSession({ req })
    // if (!session) {
    //     return res.status(401).json({ message: "Not signed in" });
    // }

    switch (req.method) {
        case 'GET':
            return await GetSale(req, res);

        case 'POST':
            return await AddSale(req, res);

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

const GetSale = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const fetchResult = await GQLFetcher.query(
            {
                query: QUERY_SALE,
                variables: {
                    "id": req.query.id
                }
            }
        );

        if (fetchResult.error) {
            return res.status(300).json({ message: `Fallo al buscar la venta` });
        }
        return res.status(200).json({ message: `Venta encontrada` });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: `Error: ${err}` });
    }
}

const AddSale = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const productosEnCarrito = req.body.productosEnCarrito;
        const pagoCliente = req.body.pagoCliente;
        const cliente = req.body.cliente;
        const empleado = req.body.empleado;
        const jwt = req.body.jwt;

        const fetchResult = await GQLFetcher.mutate(
            {
                mutation: ADD_SALE,
                variables: {
                    "fields": {
                        "productos": productosEnCarrito,
                        "dineroEntregadoEfectivo": Number(pagoCliente.pagoEnEfectivo.toFixed(2)),
                        "dineroEntregadoTarjeta": Number(pagoCliente.pagoEnTarjeta.toFixed(2)),
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
                }
            }
        );

        if (fetchResult.errors) {
            return res.status(300).json({ message: `Fallo al buscar la venta` });
        }
        return res.status(200).json({ message: `Venta encontrada` });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: `Error: ${err}` });
    }
}

export default handler;