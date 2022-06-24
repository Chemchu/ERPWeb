import { JWT } from "../tipos/JWT";

export const getJwtFromString = (jwt: string): [JWT, boolean] => {
    try {
        const base64Url = jwt.split(" ")[1].split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = JSON.parse(Buffer.from(base64, 'base64').toString('ascii'));

        return [jsonPayload as JWT, true];
    }
    catch (err) {
        return [{} as JWT, false]
    }
}

export default getJwtFromString;