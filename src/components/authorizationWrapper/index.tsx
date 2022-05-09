import React from "react";
import useEmpleadoContext from "../../context/empleadoContext";
import { Roles } from "../../tipos/Enums/Roles";

const ComprobarAutorizaciones = (requiredAuthorities: Roles[]): boolean => {
    const { Empleado } = useEmpleadoContext();

    if (!Empleado) {
        return false;
    }

    const currentUserAuthorities = Empleado.rol;

    return requiredAuthorities.includes(currentUserAuthorities);
};

const AuthorizationWrapper = (rolesAutorizados: Roles[]) => {

    return (WrappedComponent: Function) => {
        return (props: any) => {
            if (!ComprobarAutorizaciones(rolesAutorizados)) {
                return (
                    <div>
                        No estás autorizado para acceder a esta página
                    </div>
                );
            }

            return (
                <WrappedComponent {...props} />
            );
        };
    };
};

export default AuthorizationWrapper;