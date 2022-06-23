import { NextRequest } from "next/server";

const CheckJWTHealth = async (req: NextRequest) => {
    try {
        // if (req.nextUrl.pathname === '/') { return NextResponse.next(); }

        const url = req.nextUrl.clone();
        if (!req.cookies.authorization) {
            // if (req.nextUrl.pathname.includes("dashboard")) { url.pathname = "/login"; return NextResponse.rewrite(url); }

            // return NextResponse.next();
            return false;
        }

        const authCookie = req.cookies.authorization.split(" ")[1];
        if (IsJwtExpired(authCookie)) {
            // url.pathname = "/login";
            // return NextResponse.rewrite(url).clearCookie("authorization");
            return false;
        }

        if (authCookie) {
            const credentialsValidation = await fetch(`${process.env.ERPGATEWAY_URL}api/graphql`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `query ValidateJwt($jwt: String!) {
                            validateJwt(jwt: $jwt) {
                                validado
                            }
                        }`,
                    variables: {
                        jwt: authCookie
                    }
                })
            })

            const credJson = await credentialsValidation.json();
            const authHealth = JSON.parse(credJson.data);

            // if (!authHealth.validateJwt.validado) { url.pathname = "/login"; return NextResponse.rewrite(url).clearCookie("authorization"); }
            if (!authHealth.validateJwt.validado) { url.pathname = "/login"; return false }
            if (req.nextUrl.pathname === '/login') { url.pathname = "/dashboard"; return true; }

            // return NextResponse.next();
            return true;
        }
    }
    catch (err: any) {
        console.log("Error!!")
        console.log(err);

        const url = req.nextUrl.clone();
        url.pathname = "/serverError"; return false;
    }
}

const IsJwtExpired = (Jwt: string): boolean => {
    let base64Payload = Jwt.split('.')[1];
    let payload = Buffer.from(base64Payload, "base64");
    const exp = JSON.parse(payload.toString()).exp;

    const expDate = new Date(0).setSeconds(exp);
    return expDate <= Date.now();
}