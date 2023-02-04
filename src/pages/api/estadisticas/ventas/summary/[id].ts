import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!req.query.id) {
      return res.status(300).json({
        message: `No se puede recibir una petición sin param por esta ruta`,
        successful: false,
      });
    }

    const method = req.method;
    switch (method) {
      case "GET":
        const fecha: string =
          typeof req.query.id === "string" ? req.query.id : req.query.id[0];
        return await GetSalesSummaryByDate(fecha, res);
    }

    return res
      .setHeader("Cache-Control", "no-store")
      .status(300)
      .json({ message: `Solo se acepta metodo GET`, successful: false });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: `${err}` });
  }
};

const GetSalesSummaryByDate = async (date: string, res: NextApiResponse) => {
  try {
    const apiResponse = await (
      await fetch(
        // TODO: Falta hacer este endpoint en ERPGateway y ERPAnalytics
        `${process.env.ERPGATEWAY_URL}api/analytics/ventas/summary/${date}`
      )
    ).json();

    const data = JSON.parse(apiResponse.data);
    return res
      .setHeader("Cache-Control", "no-store")
      .status(apiResponse.successful ? 200 : 300)
      .json({
        message: apiResponse.message,
        successful: apiResponse.successful,
        data: data,
      });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: `Error: ${err}`, successful: false });
  }
};

export default handler;
