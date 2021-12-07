import { JSONBuffer } from "../../tipos/JsonBuffer";

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

export const ConvertBufferToBase64 = (buffer: JSONBuffer): string => {
    var res = ""
    if (buffer) {
        res = Buffer.from(buffer.data).toString('base64');
    }

    return res;
}

export const ValidateString = (cadena: string): string | undefined => {
    const regex = new RegExp("^[A-Za-z0-9 ._-]*[A-Za-z0-9][A-Za-z0-9 ._-]*$");

    const res = cadena.match(regex);

    if (res) return res[0];
    else return undefined;
}

export const ValidatePositiveFloatingNumber = (inputNumber: string): string => {
    const valuePostRegex = inputNumber.match(new RegExp("[+]?([0-9]+([.][0-9]*)?|[.][0-9]+)"))?.[0];
    if (valuePostRegex == undefined) { return ""; }

    return valuePostRegex;
}

export const ValidatePositiveIntegerNumber = (inputNumber: string): string => {
    const valuePostRegex = inputNumber.match(new RegExp("^[+]?\d+?$"))?.[0];
    if (valuePostRegex == undefined) { return ""; }

    return valuePostRegex;
}