import { NextApiRequest, NextApiResponse } from "next";
import { LOGIN } from "../../../utils/querys";
import GQLQuery from "../../../utils/serverFetcher";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const reqCredentials = req.body;
    const apiResponse = await (
      await GQLQuery({
        query: LOGIN,
        variables: {
          loginValues: {
            email: reqCredentials.email,
            password: reqCredentials.password,
          },
        },
      })
    ).json();
    const data = JSON.parse(apiResponse.data).login;

    if (data == null || data == undefined) {
      return res.status(300).json({
        message: `Fallo al iniciar sesión: usuario y/o contraseña incorrectos`,
        successful: false,
      });
    }
    if (data.successful) {
      const token = getJwt(data.token);
      const productionEnv: boolean = process.env.NODE_ENV !== "development";

      return res
        .status(200)
        .setHeader(
          "Set-Cookie",
          `authorization=${
            data.token
          }; HttpOnly; Secure=${productionEnv}; Max-Age=${
            token.exp - token.iat
          }; Path=/`
        )
        .json({
          message: `Éxito al iniciar sesión`,
          successful: data.successful,
        });
    }

    return res.status(300).json({
      message: `Fallo al iniciar sesión: usuario y/o contraseña incorrectos`,
      successful: false,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: `Fallo al iniciar sesión: ${err}`, successful: false });
  }
};

const getJwt = (jwt: string) => {
  const base64Url = jwt.split(" ")[1].split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = JSON.parse(
    Buffer.from(base64, "base64").toString("utf-8")
  );

  return jsonPayload;
};

export default handler;
