import { NextApiRequest, NextApiResponse } from "next";
import { ADD_PROVEEDOR, QUERY_PROVEEDORES } from "../../../utils/querys";
import GQLQuery, { GQLMutate } from "../../../utils/serverFetcher";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case "GET":
        return await GetProveedores(req, res);

      case "POST":
        return await AddProveedor(req, res);

      default:
        return res.status(400).json({ message: `Solo se puede hacer un GET / POST en proveedores` });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: `${err}` });
  }
};

const GetProveedores = async (req: NextApiRequest, res: NextApiResponse) => {
  const serverRes = await GQLQuery({
    query: QUERY_PROVEEDORES,
    variables: {
      find: null,
      limit: req.body.limit || 10000,
    },
  });
  const apiResponse = await serverRes.json();
  const data = JSON.parse(apiResponse.data);

  return res.status(serverRes.ok ? 200 : 300).json({
    message: data.message,
    successful: data.successful ? data.successful : serverRes.ok,
    data: data.proveedores,
  });
};

const AddProveedor = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const serverRes = await GQLMutate({
      mutation: ADD_PROVEEDOR,
      variables: {
        fields: {
          nombre: req.body.nombre,
          direccion: req.body.direccion,
          localidad: req.body.localidad,
          provincia: req.body.provincia,
          cp: req.body.cp,
          pais: req.body.pais,
          telefono: req.body.telefono,
          email: req.body.email,
          cif: req.body.cif,
          contacto: {
            nombre: req.body.contacto.nombre,
            telefono: req.body.contacto.telefono,
            email: req.body.contacto.email
          }
        }
      }
    });
    const apiResponse = await serverRes.json();

    const data = JSON.parse(apiResponse.data);
    return res.status(data.addProveedor.successful ? 200 : 300).json({
      message: data.addProveedor.message,
      successful: data.addProveedor.successful || false,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error al intentar crear el proveedor",
      successful: false,
    });
  }
};

export default handler;
