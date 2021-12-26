import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest, ev: NextFetchEvent) {
    const { pathname } = req.nextUrl

    //console.log(req);


    // if (pathname == undefined) {
    //     return null;
    // }

    // return new Response('Hello, world!')
    return NextResponse.next()
}