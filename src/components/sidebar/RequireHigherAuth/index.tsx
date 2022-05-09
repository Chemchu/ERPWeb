import { Roles } from "../../../tipos/Enums/Roles";
import AuthorizationWrapper from "../../authorizationWrapper";

const RequireHigherAuthorization = (props: { children: React.ReactNode }) => {

    return (
        <>
            {props.children}
        </>
    )
}

export default AuthorizationWrapper([Roles.Administrador, Roles.Gerente])(RequireHigherAuthorization);