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

export const ValidatePositiveFloatingNumber = (inputNumber: string): string => {
    const valuePostRegex = inputNumber.match(new RegExp("[+]?([0-9]+([.][0-9]*)?|[.][0-9]+)"))?.[0];
    if (valuePostRegex === undefined) { return ""; }

    return valuePostRegex;
}

export const ValidatePositiveIntegerNumber = (inputNumber: string): string => {
    const valuePostRegex = inputNumber.match(new RegExp("^[+]?\d+?$"))?.[0];
    if (valuePostRegex === undefined) { return ""; }

    return valuePostRegex;
}

export const IsPositiveFloatingNumber = (input: string): boolean => {
    let res = new RegExp('^$|[+]?([0-9]+([.][0-9]*)?|[.][0-9]+)').test(input);

    return res;
}

export const IsPositiveIntegerNumber = (input: string): boolean => {
    let res = new RegExp('^$|^[0-9]+$').test(input);

    return res;
}

// export const IsValidEANCode = (ean: string): boolean => {
//     const _gtinRegex: RegExp = new RegExp("^(\\d{8}|\\d{12,14})$");

//     if (!ean.match(_gtinRegex)) return false;
//     ean = ean.PadLeft(14, '0');
//     int sum = ean.Select((c, i) => (c - '0') * ((i % 2 == 0) ? 3 : 1)).Sum();
//     return (sum % 10) == 0;
// }