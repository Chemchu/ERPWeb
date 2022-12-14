import { NextApiRequest, NextApiResponse } from "next";
import { UPDATE_TIPO_SALE } from "../../../../utils/querys";
import GQLQuery, { GQLMutate } from "../../../../utils/serverFetcher";
import queryString from "query-string";
import { Venta } from "../../../../tipos/Venta";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.query.id) {
    return res.status(300).json({
      message: `No se puede recibir una petición sin param por esta ruta`,
      successful: false,
    });
  }

  switch (req.method) {
    case "PUT":
      return await UpdateTipoVenta(req, res);

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

const UpdateTipoVenta = async (req: NextApiRequest, res: NextApiResponse) => {
  // return res.json({ message: "Hola!!!", successful: true }) // Se llama data y no message porque notifyPromise no encuentra el valor de message
  try {
    const venta: Venta = req.body;
    const apiResponse = await (
      await GQLMutate({
        mutation: UPDATE_TIPO_SALE,
        variables: {
          id: req.query.id,
          tipo: venta.tipo,
          dineroEntregadoEfectivo: venta.tipo == "Efectivo" ? venta.precioVentaTotal : 0,
          dineroEntregadoTarjeta: venta.tipo == "Tarjeta" ? venta.precioVentaTotal : 0,
          cambio: 0,
          modificadoPor: {
            _id: venta.modificadoPor._id,
            nombre: venta.modificadoPor.nombre,
            apellidos: venta.modificadoPor.apellidos,
            rol: venta.modificadoPor.rol,
            email: venta.modificadoPor.email,
          },
        },
      })
    ).json();

    const data = JSON.parse(apiResponse.data).updateVenta;
    return res.status(data.successful ? 200 : 300).json({ message: data.message, successful: data.successful });
  }
  catch (e) {
    console.log(e);
    return res.status(500).json({
      message: `Error interno: respuesta no válida por parte del servidor.`,
      successful: false,
    });
  }
}

export default handler
