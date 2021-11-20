export const ValidatePositiveFloatingNumber = (inputNumber: string): string => {
    const valuePostRegex = inputNumber.match(new RegExp("[+]?([0-9]+([.][0-9]*)?|[.][0-9]+)"))?.[0];
    if(valuePostRegex == undefined) {return "";}
    
    return valuePostRegex;
}