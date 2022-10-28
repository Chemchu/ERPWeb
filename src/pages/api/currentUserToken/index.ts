import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { cookies } = req;
  try {
    if (cookies.authorization) {
      // Devolver en caso de que todo haya ido bien
      return res.status(200).json(
        JSON.stringify({
          message: `Empleado encontrado`,
          token: req.cookies.authorization,
        })
      );
    }

    return res.status(300).json(JSON.stringify({ message: `Empleado no encontrado`, token: undefined }));
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: `Fallo al de consexión con el servidor: ${err}` });
  }
};

export default handler;
