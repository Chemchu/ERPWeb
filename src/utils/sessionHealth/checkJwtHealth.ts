import { GetServerSidePropsContext, PreviewData } from "next";
import { NextRequest } from "next/server";
import { ParsedUrlQuery } from "node:querystring";
import getJwtFromString from "../../hooks/jwt";
import { SesionEmpleado } from "../../tipos/Empleado";
import { Roles } from "../../tipos/Enums/Roles";

const CheckJWTHealth = (context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) => {
    try {
        const [jwt, isValidCookie] = getJwtFromString(context.req.cookies.authorization);

        if (!isValidCookie) {
            return {
                redirect: {
                    permanent: false,
                    destination: `/login`
                },
                EmpleadoSesion: {}
            };
        }

        let emp: SesionEmpleado = {
            _id: jwt._id,
            apellidos: jwt.apellidos,
            email: jwt.email,
            nombre: jwt.nombre,
            rol: Roles[jwt.rol as keyof typeof Roles] || Roles.Cajero,
        }
        jwt.TPV ? emp.TPV = jwt.TPV : null;

        return emp;
    }
    catch (err: any) {
        return {
            redirect: {
                permanent: false,
                destination: `/login`
            },
            EmpleadoSesion: {}
        };
    }
}

export default CheckJWTHealth;