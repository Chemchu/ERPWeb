import { Producto } from "../tipos/Producto";

// Aplica un descuento de efectivo (descontar 5€ de una compra por ejemplo)
export const ApplyDtoCash = (totalValue: number, dto: number): number => {
    totalValue - dto <= 0 ? totalValue = 0 : totalValue = totalValue - dto;

    return totalValue;
}

// Aplica un descuento de porcentaje (descontar 25% de una compra por ejemplo)
export const ApplyDtoPercentage = (totalValue: number, dto: number): number => {
    totalValue = totalValue - (totalValue * (dto / 100))

    if (totalValue <= 0) return 0.00;
    else return totalValue;
}

export const ValidateString = (cadena: string): string | undefined => {
    const regex = new RegExp("^[A-Za-z0-9 ._-]*[A-Za-z0-9][A-Za-z0-9 ._-]*$");

    const res = cadena.match(regex);

    if (res) return res[0];
    else return undefined;
}

export const ValidateSearchString = (cadena: string): string => {
    if (cadena === "") return "";

    const regex = new RegExp("^[A-Za-z0-9 ._-]*[A-Za-z0-9][A-Za-z0-9 ._-]*$");

    const res = cadena.match(regex);

    if (res) return res[0];
    else return "";
}

export const IsEAN13 = (cadena: string) => {
    const reg = new RegExp("^[0-9]{13}$");

    return reg.test(cadena);
}

export const ValidatePositiveFloatingNumber = (inputNumber: string): string => {
    const valuePostRegex = inputNumber.match(new RegExp("[+]?([0-9]+([.][0-9]*)?|[.][0-9]+)"))?.[0];

    if (valuePostRegex === undefined) { return ""; }

    return valuePostRegex;
}

export const ValidatePositiveIntegerNumber = (inputNumber: string): string => {
    const valuePostRegex = inputNumber.match(new RegExp("^[0-9]*"))?.[0];

    if (valuePostRegex === undefined) { return ""; }

    return valuePostRegex;
}

export const IsPositiveFloatingNumber = (input: string): boolean => {
    let res = new RegExp("^$|[+]?([0-9]+([.][0-9]*)?|[.][0-9]+)").test(input);

    return res;
}

export const IsPositiveIntegerNumber = (input: string): boolean => {
    if (input === "") { return true }

    let reg = new RegExp(/^([0-9]*)/);
    const match = input.match(reg);

    if (isNaN(Number(input))) { return false }
    if (match === null) { return false }
    if (match[0] === "") { return false }
    if (isNaN(Number(match[0]))) { return false }

    return Boolean(match[0]);
}

export const IsValidProduct = (p: Producto): boolean => {
    if (!p.nombre) { return false; }
    if (!p.cantidad) { return false; }
    if (!p.cantidadRestock) { return false; }
    if (!p.ean) { return false; }
    if (!p.familia) { return false; }
    if (!p.iva) { return false; }
    if (!p.margen) { return false; }
    if (!p.precioCompra) { return false; }
    if (!p.precioVenta) { return false; }
    if (!p.proveedor) { return false; }

    return true;
}
