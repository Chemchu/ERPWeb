export const ValidatePositiveFloatingNumber = (inputNumber: string): string => {
    const valuePostRegex = inputNumber.match(new RegExp("[+]?([0-9]+([.][0-9]*)?|[.][0-9]+)"))?.[0];
    if(valuePostRegex == undefined) {return "";}
    
    return valuePostRegex;
}

// Aplica un descuento de efectivo (descontar 5€ de una compra por ejemplo)
export const ApplyDtoCash = (totalValue: number, dto: number): number => {
    totalValue - dto <= 0 ? totalValue = 0 : totalValue = totalValue - dto;

    return totalValue;
}

// Aplica un descuento de porcentaje (descontar 25% de una compra por ejemplo)
export const ApplyDtoPercentage = (totalValue: number, dto: number): number => {
    totalValue = totalValue - (totalValue * (dto / 100))

    if(totalValue <= 0) return 0.00;
    else return totalValue; 
}