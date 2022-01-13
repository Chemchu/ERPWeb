import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
    // if (req.url === ("/")) {
    //     return NextResponse.next()
    // }

    // const { data: session, status } = useSession();

    // // const session = await getToken({ req, secret: process.env.SECRET })
    // // // You could also check for any property on the session object,
    // // // like role === "admin" or name === "John Doe", etc.
    // if (!session) return NextResponse.redirect("/api/auth/signin");

    // if (pathname == undefined) {
    //     return null;
    // }

    return NextResponse.next();
}