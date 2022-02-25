import { TipoCobro } from "../tipos/Enums/TipoCobro";
import { ProductoVendido } from "../tipos/ProductoVendido";
import { TPV } from "../tipos/TPV";
import { Venta } from "../tipos/Venta";

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

export const PrecioTotalCarrito = (productos: ProductoVendido[]): number => {
    return productos.reduce((total: number, p: ProductoVendido) => {
        if (p.dto) {
            return total += ((100 - Number(p.dto)) / 100) * (Number(p.cantidadVendida) * p.precioVenta);
        }
        else {
            return total += (Number(p.cantidadVendida) * p.precioVenta);
        }
    }, 0);
}

export const CalcularCambio = (precioTotalAPagar: number, dineroEntregadoEfectivo: number, dineroEntregadoTarjeta: number): number => {
    return (dineroEntregadoEfectivo + dineroEntregadoTarjeta) - precioTotalAPagar;
}

export const GetTotalPorTipos = (Ventas: Venta[], tipos: TipoCobro[]): number => {
    return Ventas.reduce((total: number, v: Venta): number => {
        if (tipos.includes(v.tipo as TipoCobro)) {
            return total += v.precioVentaTotal;
        }
        return total;
    }, 0);

}

export const GetTotalEnCaja = (Ventas: Venta[], Tpv: TPV): number => {
    return Ventas.reduce((total: number, v: Venta): number => {
        if (Tpv._id !== v.tpv) {
            return total;
        }

        if (v.tipo as TipoCobro === TipoCobro.Efectivo) {
            return total += v.precioVentaTotal;
        }

        if (v.tipo as TipoCobro === TipoCobro.Fraccionado) {
            return total += v.dineroEntregadoEfectivo - v.cambio;
        }

        return total;
    }, 0);
}
