import { Devolucion } from "../tipos/Devolucion";
import { TipoCobro } from "../tipos/Enums/TipoCobro";
import { ProductoVendido } from "../tipos/ProductoVendido";
import { ITPV } from "../tipos/TPV";
import { Venta } from "../tipos/Venta";

export const AplicarDescuentos = (productos: ProductoVendido[], descuentoEfectivo: number, descuentoPorcentaje: number) => {
    let precioTotal: number;

    precioTotal = productos.reduce((total: number, p: ProductoVendido) => {
        if (p.dto) {
            return total += ((100 - Number(p.dto)) / 100) * (Number(p.cantidadVendida) * Number(p.precioVenta));
        }
        else {
            return total += (Number(p.cantidadVendida) * Number(p.precioVenta));
        }
    }, 0)
    const dtoEfectivo = descuentoEfectivo > precioTotal ? precioTotal : descuentoEfectivo;
    const dtoPorcentaje = descuentoPorcentaje > 100 ? 100 : descuentoPorcentaje;

    const precioDescontadoEfectivo = precioTotal - dtoEfectivo;
    return Number((precioDescontadoEfectivo - precioDescontadoEfectivo * (dtoPorcentaje / 100)).toFixed(2));
}

export const PrecioTotalCarrito = (productos: ProductoVendido[]): number => {
    const precio = productos.reduce((total: number, p: ProductoVendido) => {
        return total += (Number(p.cantidadVendida) * Number(p.precioVenta));
    }, 0);

    return Number(precio.toFixed(2));
}

export const CalcularCambio = (precioTotalAPagar: number, dineroEntregadoEfectivo: number, dineroEntregadoTarjeta: number): number => {
    return Number(((dineroEntregadoEfectivo + dineroEntregadoTarjeta) - precioTotalAPagar).toFixed(2));
}

export const GetEfectivoTotal = (Ventas: Venta[]): number => {
    const efectivo = Ventas.reduce((total: number, v: Venta): number => {
        const tipoVenta = v.tipo as TipoCobro;

        if (tipoVenta === TipoCobro.Fraccionado) {
            return total += v.dineroEntregadoEfectivo - v.cambio;
        }

        if (tipoVenta === TipoCobro.Rapido || tipoVenta === TipoCobro.Efectivo) {
            return total += v.precioVentaTotal;
        }
        return total;
    }, 0);

    return Number(efectivo.toFixed(2))
}

export const GetTarjetaTotal = (Ventas: Venta[]): number => {
    const total = Ventas.reduce((total: number, v: Venta): number => {
        const tipoVenta = v.tipo as TipoCobro;

        if (tipoVenta === TipoCobro.Fraccionado) {
            return total += v.dineroEntregadoTarjeta;
        }

        if (tipoVenta === TipoCobro.Tarjeta) {
            return total += v.precioVentaTotal;
        }
        return total;
    }, 0);
    return Number(total.toFixed(2));
}

export const GetTotalEnCaja = (Ventas: Venta[], Devoluciones: Devolucion[], Tpv: ITPV): number => {

    const valorDeVentas = Ventas.reduce((total: number, venta: Venta): number => {
        if (Tpv._id !== venta.tpv) {
            return total;
        }
        const tipoVenta = venta.tipo as TipoCobro;

        if (tipoVenta === TipoCobro.Efectivo || tipoVenta === TipoCobro.Rapido) {
            return total + venta.precioVentaTotal;
        }

        if (tipoVenta === TipoCobro.Fraccionado) {
            return total + venta.dineroEntregadoEfectivo - venta.cambio;
        }

        console.log(total);

        return Number(total.toFixed(2));
    }, Tpv.cajaInicial);

    return valorDeVentas;
}
