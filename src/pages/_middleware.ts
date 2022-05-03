import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
    try {
        if (req.nextUrl.pathname === '/') { return NextResponse.next(); }

        const url = req.nextUrl.clone();

        if (!req.cookies.authorization) {
            if (req.nextUrl.pathname.includes("dashboard")) { url.pathname = "/login"; return NextResponse.rewrite(url); }

            return NextResponse.next();
        }

        const authCookie = req.cookies.authorization.split(" ")[1];

        if (IsJwtExpired(authCookie)) {
            url.pathname = "/login";
            return NextResponse.rewrite(url).clearCookie("authorization");
        }

        if (authCookie) {
            const credentialsValidation = await (await fetch(`${process.env.ERPBACK_URL}graphql`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        query: `query ValidateJwt($jwt: String!) {
                            validateJwt(jwt: $jwt) {
                                validado
                            }
                        }`,
                        variables: {
                            jwt: authCookie
                        }
                    }
                )
            })).json();

            if (!credentialsValidation.data.validateJwt.validado) { url.pathname = "/login"; return NextResponse.rewrite(url).clearCookie("authorization"); }
            if (req.nextUrl.pathname === '/login') { url.pathname = "/dashboard"; return NextResponse.rewrite(url); }
        }
    }
    catch (err) {
        const url = req.nextUrl.clone();
        url.pathname = "/serverError"; return NextResponse.rewrite(url);
    }
}

const IsJwtExpired = (Jwt: string): boolean => {
    let base64Payload = Jwt.split('.')[1];
    let payload = atob(base64Payload);
    const exp = JSON.parse(payload.toString()).exp;

    const expDate = new Date(0).setSeconds(exp);
    return expDate <= Date.now();
}
