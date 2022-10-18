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

const AuthorizationWrapper = (rolesAutorizados: Roles[], showMessage?: boolean) => {
    return (WrappedComponent: Function) => {
        const result = (props: any) => {
            if (!ComprobarAutorizaciones(rolesAutorizados)) {
                if (showMessage) {
                    return (
                        <div>
                            No estás autorizado para acceder a esta página
                        </div>
                    );
                }

                return (
                    <></>
                )
            }

            return (
                <WrappedComponent {...props} />
            );
        };

        result.displayName = "result"
        return result;
    };
};

AuthorizationWrapper.displayName = 'AuthorizationWrapper';
export default AuthorizationWrapper;