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
    const prov = req.body

    const serverRes = await GQLMutate({
      mutation: ADD_PROVEEDOR,
      variables: {
        fields: {
          nombre: prov.nombre,
          direccion: prov.direccion,
          localidad: prov.localidad,
          provincia: prov.provincia,
          cp: prov.cp,
          pais: prov.pais,
          telefono: prov.telefono,
          email: prov.email,
          cif: prov.cif,
          contacto: {
            nombre: prov.contacto.nombre,
            telefono: prov.contacto.telefono,
            email: prov.contacto.email
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
      message: "Error al intentar crear el proveedor: " + err,
      successful: false,
    });
  }
};

export default handler;
