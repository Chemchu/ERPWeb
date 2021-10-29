import { MouseEventHandler } from "react";
import { Client } from "./Client";
import { SelectedProduct } from "./SelectedProduct";

export type ModalProps = {
    handleClose: MouseEventHandler<HTMLButtonElement>,
    cliente: Client,
    finalPrice: number,
    customerProducts: SelectedProduct[],
    tipoCobro?: string
}