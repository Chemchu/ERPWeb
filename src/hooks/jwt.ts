import { JWT } from "../tipos/JWT";

export const getJwtFromString = (jwt: string | undefined): [JWT, boolean] => {
  if (!jwt) {
    return [{} as JWT, false];
  }

  try {
    const base64Url = jwt.split(" ")[1].split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = JSON.parse(Buffer.from(base64, "base64").toString("utf-8"));

    return [jsonPayload as JWT, true];
  } catch (err) {
    return [{} as JWT, false];
  }
};

export default getJwtFromString;
