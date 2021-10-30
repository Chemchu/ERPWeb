import { MouseEventHandler } from "react";
import { Client } from "./Client";
import { CustomerPaymentInformation } from "./CustomerPayment";
import { SelectedProduct } from "./SelectedProduct";

export type ModalProps = {
    handleClose: MouseEventHandler<HTMLButtonElement>,
    cliente: Client,
    finalPrice: number,
    customerProducts: SelectedProduct[],
    tipoCobro?: string
}

export type ModalResumenProps = {
    handleClose: MouseEventHandler<HTMLButtonElement>,
    cliente: Client,
    finalPrice: number,
    cambio: number,
    customerProducts: SelectedProduct[],
    customerPayment: CustomerPaymentInformation,
    tipoCobro?: string
}