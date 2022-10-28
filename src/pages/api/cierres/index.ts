import { NextApiRequest, NextApiResponse } from "next";
import { ADD_CIERRE, QUERY_CIERRES } from "../../../utils/querys";
import GQLQuery, { GQLMutate } from "../../../utils/serverFetcher";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case "GET":
        return await GetCierres(req, res);

      case "POST":
        return await AddCierre(req, res);

      default:
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: `Error: ${err}` });
  }
};

const GetCierres = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const serverRes = await GQLQuery({
      query: QUERY_CIERRES,
      variables: {
        limit: 1,
      },
    });

    const apiResponse = await serverRes.json();
    const data = JSON.parse(apiResponse.data);

    return res.status(serverRes.ok ? 200 : 300).json({
      message: "Éxito al buscar los cierres",
      data: data.cierresTPVs,
      successful: serverRes.ok,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error al buscar los cierres",
      data: undefined,
      successful: false,
    });
  }
};

const AddCierre = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const apiResponse = await (
      await GQLMutate({
        mutation: ADD_CIERRE,
        variables: {
          cierre: {
            tpv: req.body.tpv,
            empleadoCerrandoId: req.body.empleadoCerrandoId,
            ventasEfectivo: Number(req.body.ventasEfectivo),
            ventasTarjeta: Number(req.body.ventasTarjeta),
            ventasTotales: Number(req.body.ventasTotales),
            dineroEsperadoEnCaja: Number(req.body.dineroEsperadoEnCaja),
            dineroRealEnCaja: Number(req.body.dineroRealEnCaja),
            dineroRetirado: Number(req.body.dineroRetirado),
          },
        },
      })
    ).json();

    const data = JSON.parse(apiResponse.data);
    if (data.addCierreTPV.successful) {
      res.setHeader("Set-Cookie", `authorization=${data.addCierreTPV.token}; HttpOnly; Path=/`);
      res.status(200).json({
        message: data.addCierreTPV.message,
        successful: data.addCierreTPV.successful,
        data: data.addCierreTPV.cierre,
      });
      return;
    } else {
      res.setHeader("Set-Cookie", `authorization=${data.addCierreTPV.token}; HttpOnly; Path=/`);
      res.status(300).json({
        message: data.addCierreTPV.message,
        successful: data.addCierreTPV.successful,
      });
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(300).json({ message: err, successful: false });
    return;
  }
};

export default handler;
