import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
    if (req.url === '/') { return NextResponse.next(); }

    if (req.cookies.authorization === undefined) {
        if (req.url.includes("dashboard")) { return NextResponse.redirect('/login'); }

        return NextResponse.next();
    }

    const authCookie = req.cookies.authorization.split(" ")[1];
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

        if (!credentialsValidation.data.validateJwt.validado) { return NextResponse.redirect(`/login`).clearCookie("authorization"); }
        if (req.url === '/login') { return NextResponse.redirect(`/dashboard`); }
    }
}