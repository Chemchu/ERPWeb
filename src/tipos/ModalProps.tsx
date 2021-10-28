import { MouseEventHandler } from "react";
import { SelectedProduct } from "./SelectedProduct";

export type ModalProps = {
    handleClose: MouseEventHandler<HTMLButtonElement>,
    finalPrice: number,
    dineroEntregado: number,
    customerProducts: SelectedProduct[],
    isEfectivo: boolean
}