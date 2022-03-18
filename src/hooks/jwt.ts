import Cookies from "js-cookie";

const getJwt = () => {
    const authCookie = Cookies.get("authorization");
    if (!authCookie) { throw "Token de autorización inválido o inexistente"; }
    //if (!authCookie) { console.log("Token inexistente en este momento"); return undefined; }

    const base64Url = authCookie.split(" ")[1].split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = JSON.parse(Buffer.from(base64, 'base64').toString('ascii'));

    return jsonPayload;
}

export default getJwt;