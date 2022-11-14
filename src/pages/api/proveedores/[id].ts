import { NextApiRequest, NextApiResponse } from "next";
import GQLQuery, { GQLMutate } from "../../../utils/serverFetcher";
import queryString from "query-string";
import { DELETE_PROVEEDOR, QUERY_PROVEEDORES, QUERY_PROVEEDORES_BY_QUERY, UPDATE_PROVEEDOR } from "../../../utils/querys";
import { Proveedor } from "../../../tipos/Proveedor";

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    if (!req.query.id) {
      return res.status(300).json({
        message: `No se puede recibir una petición sin param por esta ruta`,
        successful: false,
      });
    }

    const method = req.method;
    const query = queryString.parse(req.query.id.toString());
    switch (method) {
      case "GET":
        if (Object.keys(query).length > 0) {
          return await GetProveedorFromQuery(query, res);
        } else {
          return await GetProveedorFromId(req, res);
        }

      case "PUT":
        return await UpdateProveedor(req, res);

      case "DELETE":
        return await DeleteProveedor(req, res);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: `${err}` });
  }
};

const GetProveedorFromId = async (req: NextApiRequest, res: NextApiResponse) => {
  const serverRes = await GQLQuery({
    query: QUERY_PROVEEDORES_BY_QUERY,
    variables: {
      find: {
        query: req.query.id,
      },
    },
  });
  const apiResponse = await serverRes.json();
  const data = JSON.parse(apiResponse.data);

  return res.status(serverRes.ok ? 200 : 300).json({
    message: data.message,
    data: data.proveedores[0],
    successful: data.successful ? data.successful : serverRes.ok,
  });
};

const GetProveedorFromQuery = async (userQuery: queryString.ParsedQuery<string>, res: NextApiResponse) => {
  if (!userQuery.query) {
    res.status(300).json({ message: `La query no puede estar vacía`, successful: false });
  }

  const serverRes = await GQLQuery({
    query: QUERY_PROVEEDORES_BY_QUERY,
    variables: {
      find: {
        query: userQuery.query,
      },
    },
  });
  const apiResponse = await serverRes.json();
  const data = JSON.parse(apiResponse.data);

  return res.status(serverRes.ok ? 200 : 300).json({ proveedores: data.proveedores });
};

const DeleteProveedor = async (req: NextApiRequest, res: NextApiResponse) => {
  const apiResponse = await (
    await GQLMutate({
      mutation: DELETE_PROVEEDOR,
      variables: {
        id: req.query.id,
      },
    })
  ).json();

  const data = JSON.parse(apiResponse.data).deleteProveedor;
  return res.status(data.successful ? 200 : 300).json({ message: data.message, successful: data.successful });
};

const UpdateProveedor = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const prov: Proveedor = req.body;
    const apiResponse = await (
      await GQLMutate({
        mutation: UPDATE_PROVEEDOR,
        variables: {
          id: prov._id,
          proveedorInput: {
            cif: prov.cif,
            contacto: {
              email: prov.email,
              nombre: prov.nombre,
              telefono: prov.telefono
            },
            cp: prov.cp,
            direccion: prov.direccion,
            email: prov.email,
            localidad: prov.localidad,
            nombre: prov.nombre,
            pais: prov.pais,
            provincia: prov.provincia,
            telefono: prov.telefono,
          }
        }
      })
    ).json();

    const data = JSON.parse(apiResponse.data).updateProveedor;
    return res.status(data.successful ? 200 : 300).json({ message: data.message, successful: data.successful });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: `Error interno: respuesta no válida por parte del servidor.`,
      successful: false,
    });
  }
};

export default handler;
