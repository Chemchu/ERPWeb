import { NextApiRequest, NextApiResponse } from "next";
import { Producto } from "../../../../tipos/Producto";
import { QUERY_PRODUCTS } from "../../../../utils/querys";
import GQLQuery from "../../../../utils/serverFetcher";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case "GET":
        return await GetNotificacionesProductos(req, res);

      default:
        return res.status(400).json({ message: `Solo se puede hacer un GET / POST en productos` });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: `${err}` });
  }
};

const GetNotificacionesProductos = async (req: NextApiRequest, res: NextApiResponse) => {
  const serverRes = await GQLQuery({
    query: QUERY_PRODUCTS,
    variables: {
      find: null,
      limit: req.body.limit || 10000,
    },
  });
  const apiResponse = await serverRes.json();
  const data = JSON.parse(apiResponse.data);

  // Recogemos la cookie de la ultima vez que se han actualizado los productos
  const cookies = req.cookies;
  if (!cookies["productoUpdateStamp"]) {
    const productoUpdateStamp = Date.now();

    return res
      .status(200)
      .setHeader("Set-Cookie", `productoUpdateStamp=${productoUpdateStamp}; Path=/`)
      .send({ message: "Sistema de notificaciones añadido" })
  }

  const productosANotificar: string[] = []
  // Iteramos sobre todos los productos y comprobamos si han sido modificados recientemente
  for (let index = 0; index < data.productos.length; index++) {
    const producto: Producto = data.productos[index];
    if (producto.updatedAt <= Number(cookies.productoUpdateStamp)) { continue; }

    productosANotificar.push(`El producto ${producto.nombre} ha sido actualizado recientemente. Tal vez sea necesario imprimir una nueva etiqueta.`);
  }

  return res.status(serverRes.ok ? 200 : 300).json({
    data: productosANotificar
  });
};

export default handler;
