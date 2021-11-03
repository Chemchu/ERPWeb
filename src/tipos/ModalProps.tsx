import { MouseEventHandler } from "react";
import { Client } from "./Client";
import { CustomerPaymentInformation } from "./CustomerPayment";
import { TipoCobro } from "./Enums/TipoCobro";
import { SelectedProduct } from "./SelectedProduct";

export type ModalProps = {
    handleClose: MouseEventHandler<HTMLButtonElement>,
    cliente: Client,
    finalPrice: number,
    customerProducts: SelectedProduct[],
}

export type ModalResumenProps = {
    //handleClose: MouseEventHandler<HTMLButtonElement>,
    handleClose: Function,
    cliente: Client,
    finalPrice: number,
    cambio: number,
    customerProducts: SelectedProduct[],
    customerPayment: CustomerPaymentInformation,
    tipoCobro: TipoCobro
}