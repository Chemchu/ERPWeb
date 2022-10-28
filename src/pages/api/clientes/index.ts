import { NextApiRequest, NextApiResponse } from "next";
import { ADD_CLIENT, QUERY_CLIENTS } from "../../../utils/querys";
import GQLQuery, { GQLMutate } from "../../../utils/serverFetcher";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case "POST":
        return await AddCliente(req, res);
      case "GET":
        return await GetClientes(req, res);
    }

    return res.status(300).json({
      message: `Fallo al pedir la lista de clientes`,
      successful: false,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: `Error: ${err}`, successful: false });
  }
};

const AddCliente = async (req: NextApiRequest, res: NextApiResponse) => {
  const reqBody = req.body;
  const apiResponse = await (
    await GQLMutate({
      mutation: ADD_CLIENT,
      variables: {
        nombre: reqBody.nombre,
        calle: reqBody.calle,
        nif: reqBody.nif,
        cp: reqBody.cp,
      },
    })
  ).json();

  const data = JSON.parse(apiResponse.data).addCliente;
  return res.status(data.successful ? 200 : 300).json({ message: data.message, successful: data.successful });
};

const GetClientes = async (req: NextApiRequest, res: NextApiResponse) => {
  const reqBody = req.body;
  const serverRes = await GQLQuery({
    query: QUERY_CLIENTS,
    variables: {
      limit: reqBody.limit || 50,
    },
  });
  const apiResponse = await serverRes.json();

  const data = JSON.parse(apiResponse.data);
  return res.status(serverRes.ok ? 200 : 300).json({
    message: data.message,
    successful: data.successful == undefined ? serverRes.ok : data.successful,
    data: data.clientes,
  });
};

export default handler;
