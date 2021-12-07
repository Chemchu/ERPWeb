import { EventHandler, MouseEventHandler, TouchEventHandler } from "react";
import { Client } from "./Client";
import { CustomerPaymentInformation } from "./CustomerPayment";
import { Producto } from "./DBProduct";
import { TipoCobro } from "./Enums/TipoCobro";
import { ProductoEnCarrito } from "./ProductoEnCarrito";
import { SelectedProduct } from "./SelectedProduct";

type ModalProps = {
    handleClose: TouchEventHandler<HTMLButtonElement> | MouseEventHandler<HTMLButtonElement>,
}

export type ModalPagarProps = {
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

export type ModalPagarProps2 = {
    handleClose: MouseEventHandler<HTMLButtonElement>,
    finalPrice: number,
    customerProducts: Producto[],
}

export type ModalResumenProps2 = {
    //handleClose: MouseEventHandler<HTMLButtonElement>,
    handleClose: Function,
    cliente: Client | undefined,
    finalPrice: number,
    cambio: number,
    customerProducts: ProductoEnCarrito[],
    customerPayment: CustomerPaymentInformation,
    tipoCobro: TipoCobro
}