import { Roles } from "../../tipos/Enums/Roles";

export const CheckEqualOrMoreAuthority = (rolA: Roles, rolB: Roles) => {
  if (rolA === rolB) {
    return true;
  }

  if (rolB === Roles.Administrador) {
    return false;
  }

  if (rolB === Roles.Cajero) {
    return true;
  }

  if (rolA === Roles.Cajero) {
    return false;
  }

  if (rolA === Roles.Administrador) {
    return true;
  }

  return false;
};
