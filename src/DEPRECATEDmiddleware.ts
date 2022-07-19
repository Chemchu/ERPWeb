// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { SesionEmpleado } from './tipos/Empleado';
import { Roles } from './tipos/Enums/Roles';
import getJwtFromString from './hooks/jwt';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    console.log(request);

    const response = new NextResponse()
    const { value, } = request.cookies.getWithOptions('authorization')
    const [jwt, isValidCookie] = getJwtFromString(value);

    if (!isValidCookie) {
        return {
            redirect: {
                permanent: false,
                destination: `/login`
            },
        };
    }

    let emp: SesionEmpleado = {
        _id: jwt._id,
        apellidos: jwt.apellidos,
        email: jwt.email,
        nombre: jwt.nombre,
        rol: Roles[jwt.rol as keyof typeof Roles] || Roles.Cajero,
    }

    if (jwt.TPV) {
        emp.TPV = jwt.TPV
    }

    return {
        props: {
            EmpleadoSesion: emp as SesionEmpleado
        }
    }
    // // set a cookie
    // response.cookies.set('vercel', 'fast')

    // // set another cookie with options
    // response.cookies.set('nextjs', 'awesome', { path: '/test' })

    // // get all the details of a cookie
    // const { value, options } = response.cookies.getWithOptions('vercel')
    // console.log(value) // => 'fast'
    // console.log(options) // => { Path: '/test' }

    // // deleting a cookie will mark it as expired
    // response.cookies.delete('vercel')

    // // clear all cookies means mark all of them as expired
    // response.cookies.clear()

    return response
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/dashboard/:path*',
}