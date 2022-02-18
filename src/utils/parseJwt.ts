export const parseJwt = (token: string) => {
    const base64Url = token.split(" ")[1].split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = JSON.parse(Buffer.from(base64, 'base64').toString('ascii'));

    return jsonPayload;
};
