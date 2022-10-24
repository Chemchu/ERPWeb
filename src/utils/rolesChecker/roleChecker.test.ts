import { CheckEqualOrMoreAuthority } from "./roleChecker";
import { describe, expect, it } from "vitest";
import { Roles } from "../../tipos/Enums/Roles";

describe("#CheckEqualOrMoreAuthority", () => {
  it("Comprueba si el RolA tiene igual o más autoridad que RolB", () => {
    expect(CheckEqualOrMoreAuthority(Roles.Administrador, Roles.Administrador)).toBe(true);
    expect(CheckEqualOrMoreAuthority(Roles.Administrador, Roles.Gerente)).toBe(true);
    expect(CheckEqualOrMoreAuthority(Roles.Administrador, Roles.Cajero)).toBe(true);

    expect(CheckEqualOrMoreAuthority(Roles.Gerente, Roles.Administrador)).toBe(false);
    expect(CheckEqualOrMoreAuthority(Roles.Gerente, Roles.Gerente)).toBe(true);
    expect(CheckEqualOrMoreAuthority(Roles.Gerente, Roles.Cajero)).toBe(true);

    expect(CheckEqualOrMoreAuthority(Roles.Cajero, Roles.Administrador)).toBe(false);
    expect(CheckEqualOrMoreAuthority(Roles.Cajero, Roles.Gerente)).toBe(false);
    expect(CheckEqualOrMoreAuthority(Roles.Cajero, Roles.Cajero)).toBe(true);
  });
});
