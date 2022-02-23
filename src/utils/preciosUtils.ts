import { ProductoVendido } from "../tipos/ProductoVendido";

export const AplicarDescuentos = (productos: ProductoVendido[], descuentoEfectivo: number, descuentoPorcentaje: number) => {
    let precioTotal: number;

    precioTotal = productos.reduce((total: number, p: ProductoVendido) => {
        if (p.dto) {
            return total += ((100 - Number(p.dto)) / 100) * (Number(p.cantidadVendida) * p.precioVenta);
        }
        else {
            return total += (Number(p.cantidadVendida) * p.precioVenta);
        }
    }, 0)
    const dtoEfectivo = descuentoEfectivo > precioTotal ? precioTotal : descuentoEfectivo;
    const dtoPorcentaje = descuentoPorcentaje > 100 ? 100 : descuentoPorcentaje;

    const precioDescontadoEfectivo = precioTotal - dtoEfectivo;
    return (precioDescontadoEfectivo - precioDescontadoEfectivo * (dtoPorcentaje / 100));
}

export const PrecioTotalCarrito = (productos: ProductoVendido[]) => {
    return productos.reduce((total: number, p: ProductoVendido) => {
        if (p.dto) {
            return total += ((100 - Number(p.dto)) / 100) * (Number(p.cantidadVendida) * p.precioVenta);
        }
        else {
            return total += (Number(p.cantidadVendida) * p.precioVenta);
        }
    }, 0)
}

export const CalcularCambio = (precioTotalAPagar: number, dineroEntregadoEfectivo: number, dineroEntregadoTarjeta: number): number => {
    return (dineroEntregadoEfectivo + dineroEntregadoTarjeta) - precioTotalAPagar;
}