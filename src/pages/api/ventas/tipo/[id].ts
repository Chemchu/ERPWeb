import { NextApiRequest, NextApiResponse } from "next";
import { UPDATE_SALE } from "../../../../utils/querys";
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

  const query = queryString.parse(req.query.id.toString());
  switch (req.method) {
    // case "POST":
    //   if (req.query.id === "file") {
    //     return await AddVentaFromFile(req, res);
    //   }
    //
    // case "GET":
    //   if (Object.keys(query).length > 0) {
    //     return await GetSalesByQuery(query, res);
    //   } else {
    //     return await GetSale(req, res);
    //   }
    //
    case "PUT":
      return await UpdateTipoVenta(req, res);

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

const UpdateTipoVenta = async (req: NextApiRequest, res: NextApiResponse) => {
  return res.json({ message: "Hola!!!", successful: true }) // Se llama data y no message porque notifyPromise no encuentra el valor de message
}

export default handler
