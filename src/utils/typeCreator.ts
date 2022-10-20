import { Cierre } from "../tipos/Cierre";
import { Cliente } from "../tipos/Cliente";
import { Devolucion } from "../tipos/Devolucion";
import { Empleado } from "../tipos/Empleado";
import { MotivoMerma } from "../tipos/Enums/MotivoMerma";
import { Merma, NuevaMerma } from "../tipos/Merma";
import { Producto } from "../tipos/Producto";
import { ProductoDevuelto } from "../tipos/ProductoDevuelto";
import { NuevoProductoMermado } from "../tipos/ProductoMermado";
import { ProductoVendido } from "../tipos/ProductoVendido";
import { Summary, VentasPorHora } from "../tipos/Summary";
import { ITPV } from "../tipos/TPV";
import { Venta } from "../tipos/Venta";

function CreateProduct(p: any): Producto | undefined {
    try {
        if (p.nombre === undefined) return undefined;

        let producto = {
            _id: p._id,
            alta: p.alta,
            cantidad: p.cantidad | 0,
            cantidadRestock: p.cantidadRestock | 0,
            ean: p.ean,
            familia: p.familia,
            iva: p.iva,
            nombre: p.nombre,
            precioCompra: p.precioCompra,
            precioVenta: p.precioVenta,
            proveedor: p.proveedor,
            margen: p.margen
        } as Producto

        return producto;
    }
    catch (e) {
        return undefined;
    }
}

function CreateClient(c: any): Cliente | undefined {
    try {
        if (c.nif === undefined) return undefined;

        let client = {
            _id: c._id,
            nombre: c.nombre,
            nif: c.nif,
            calle: c.calle ? c.calle : "",
            cp: c.cp ? c.cp : "",
        } as Cliente

        return client;
    }
    catch (e) {
        return undefined;
    }
}

function CreateSale(s: any): Venta | undefined {
    try {
        let venta: Venta = {
            _id: s._id,
            productos: CreateProductoVendidoList(s.productos),
            numFactura: s.numFactura,
            dineroEntregadoEfectivo: s.dineroEntregadoEfectivo,
            dineroEntregadoTarjeta: s.dineroEntregadoTarjeta,
            precioVentaTotalSinDto: s.preprecioVentaTotalSinDto,
            precioVentaTotal: s.precioVentaTotal,
            cambio: s.cambio,
            cliente: CreateClient(s.cliente) || s.client,
            vendidoPor: CreateEmployee(s.vendidoPor),
            modificadoPor: CreateEmployee(s.modificadoPor),
            tipo: s.tipo,
            descuentoEfectivo: s.descuentoEfectivo || 0,
            descuentoPorcentaje: s.descuentoPorcentaje || 0,
            tpv: s.tpv,
            createdAt: s.createdAt,
            updatedAt: s.updatedAt,
        }

        return venta;
    }
    catch (e) {
        return undefined;
    }
}

function CreateProductoVendido(s: any): ProductoVendido | undefined {
    try {
        let prod: ProductoVendido = {
            _id: s._id,
            nombre: s.nombre,
            familia: s.familia,
            proveedor: s.proveedor,
            ean: s.ean,
            iva: s.iva,
            margen: s.margen,
            precioCompra: s.precioCompra,
            precioVenta: s.precioVenta,
            precioFinal: s.precioVenta * ((100 - s.dto) / 100),
            cantidadVendida: Number(s.cantidadVendida),
            dto: s.dto || 0
        }
        return prod;
    }
    catch (e) {
        return undefined;
    }
}

export function CreateCierre(c: any): Cierre | undefined {
    try {
        let cierre: Cierre = {
            _id: c._id,
            tpv: c.tpv,
            abiertoPor: CreateEmployee(c.abiertoPor) || c.abiertoPor,
            cerradoPor: CreateEmployee(c.cerradoPor) || c.cerradoPor,
            apertura: c.apertura,
            cierre: c.cierre,
            cajaInicial: c.cajaInicial,
            ventasEfectivo: c.ventasEfectivo,
            ventasTarjeta: c.ventasTarjeta,
            ventasTotales: c.ventasTotales,
            dineroEsperadoEnCaja: c.dineroEsperadoEnCaja,
            dineroRealEnCaja: c.dineroRealEnCaja,
            dineroRetirado: c.dineroRetirado,
            fondoDeCaja: c.fondoDeCaja,
            beneficio: c.beneficio,
            nota: c.nota
        }
        return cierre;
    }
    catch (e) {
        return undefined;
    }
}

export function CreateProductList(pList: any[]): Producto[] {
    if (!pList) { throw "Lista de productos indefinida"; }

    let res: Producto[] = [];
    pList.forEach((p: any) => {
        const prod = CreateProduct(p);

        if (prod) res.push(prod);
    });

    return res;
}

export function CreateMermaList(mList: any[]): Merma[] {
    if (!mList) { throw "Lista de mermas indefinida"; }

    let res: Merma[] = [];
    mList.forEach((m: any) => {
        const merma = CreateMerma(m);

        if (merma) res.push(merma);
    });

    return res;
}

export function CreateNuevaMerma(empleadoID: string, productos: NuevoProductoMermado[]): NuevaMerma | undefined {
    try {
        if (productos.length <= 0) return undefined;
        if (!empleadoID) return undefined;

        let merma = {
            empleadoId: empleadoID,
            productos: productos,
        } as NuevaMerma

        return merma;
    }
    catch (e) {
        return undefined;
    }
}

export function CreateNuevoProductoMermado(producto: Producto, cantidadMermada: number, motivo: MotivoMerma | string): NuevoProductoMermado | undefined {
    try {
        let prodMermado = {
            _id: producto._id,
            cantidad: cantidadMermada,
            motivo: motivo,
        } as NuevoProductoMermado

        return prodMermado;
    }
    catch (e) {
        return undefined;
    }
}

function CreateMerma(m: any): Merma | undefined {
    try {
        if (!m) return undefined;

        let merma = {
            _id: m._id,
            productos: m.productos,
            costeProductos: m.costeProductos,
            ventasPerdidas: m.ventasPerdidas,
            beneficioPerdido: m.beneficioPerdido,
            creadoPor: m.creadoPor,
            createdAt: m.createdAt,
            updatedAt: m.updatedAt,
        } as Merma

        return merma;
    }
    catch (e) {
        return undefined;
    }
}

export function CreateClientList(cList: any[]): Cliente[] {
    if (cList === undefined) { return []; }

    let res: Cliente[] = [];
    cList.forEach((c: any) => {
        const client = CreateClient(c);

        if (client) res.push(client);
    });

    return res;
}

export function CreateSalesList(sList: any[]): Venta[] {
    if (sList === undefined) { return [] as Venta[]; }

    try {
        let res: Venta[] = [];
        sList.forEach((c: any) => {
            const venta = CreateSale(c);

            if (venta) res.push(venta);
        });

        return res;
    }
    catch (e) {
        console.log(e);
        return []
    }

}

export function CreateProductoVendidoList(pList: any[]): ProductoVendido[] {
    let res: ProductoVendido[] = [];
    pList.forEach((p: any) => {
        const prod = CreateProductoVendido(p);

        if (prod) res.push(prod);
    });

    return res;
}

export function CreateEmployee(employee: any): Empleado {
    let res: Empleado = {
        _id: employee._id,
        nombre: employee.nombre,
        apellidos: employee.apellidos,
        email: employee.email,
        rol: employee.rol,
        dni: employee.dni || "",
        fechaAlta: employee.fechaAlta || "",
        genero: employee.genero || "",
        horasPorSemana: employee.horasPorSemana || -1
    }

    return res;
}

export function CreateTPV(tpv: any): ITPV {
    let res: ITPV = {
        _id: tpv._id,
        nombre: tpv.nombre,
        abiertoPor: tpv.abiertoPor,
        enUsoPor: tpv.enUsoPor,
        cajaInicial: tpv.cajaInicial,
        fechaApertura: tpv.fechaApertura,
        libre: tpv.libre,
        createdAt: tpv.createdAt,
        updatedAt: tpv.updatedAt
    }

    return res;
}

export function CreateTPVsList(tpvs: any): ITPV[] {
    let res: ITPV[] = [];
    tpvs.forEach((t: any) => {
        const tpv = CreateTPV(t);

        if (tpv) res.push(tpv);
    });

    return res;
}

export function CreateCierreList(cierres: any): Cierre[] {
    let res: Cierre[] = [];
    cierres.forEach((c: any) => {
        const cierre = CreateCierre(c);

        if (cierre) res.push(cierre);
    });

    return res;
}

export function CreateEmployeeList(empleados: any): Empleado[] {
    let res: Empleado[] = [];
    empleados.forEach((emp: any) => {
        const empleado = CreateEmployee(emp);

        if (empleado) res.push(empleado);
    });

    return res;
}

export function CreateDevolucionList(dList: any[]): Devolucion[] {
    if (dList === undefined) { return [] as Devolucion[]; }


    try {
        let res: Devolucion[] = [];
        dList.forEach((d: any) => {
            const dev = CreateDevolucion(d);

            if (dev) res.push(dev);
        });

        return res;
    }
    catch (e) {
        console.log(e);
        return []
    }

}

function CreateDevolucion(s: any): Devolucion | undefined {
    try {
        const vOriginal = CreateSale(s.ventaOriginal);
        if (!vOriginal) { return undefined; }

        let dev: Devolucion = {
            _id: s._id,
            productosDevueltos: CreateProductoDevueltoList(s.productosDevueltos),
            dineroDevuelto: s.dineroDevuelto,
            cliente: CreateClient(s.cliente) || s.client,
            trabajador: CreateEmployee(s.trabajador),
            modificadoPor: CreateEmployee(s.modificadoPor),
            ventaOriginal: vOriginal,
            tpv: s.tpv,
            createdAt: s.createdAt,
            updatedAt: s.updatedAt,
        }

        return dev;
    }
    catch (e) {
        return undefined;
    }
}

export function CreateProductoDevueltoList(pList: any[]): ProductoDevuelto[] {
    let res: ProductoDevuelto[] = [];
    pList.forEach((p: any) => {
        const prod = CreateProductoDevuelto(p);

        if (prod) res.push(prod);
    });

    return res;
}

function CreateProductoDevuelto(s: any): ProductoDevuelto | undefined {
    try {
        let prod: ProductoDevuelto = {
            _id: s._id,
            nombre: s.nombre,
            proveedor: s.proveedor,
            familia: s.familia,
            precioVenta: s.precioVenta,
            precioCompra: s.precioCompra,
            precioFinal: s.precioFinal,
            iva: s.iva,
            margen: s.margen,
            ean: s.ean,
            cantidadDevuelta: s.cantidadDevuelta,
            dto: s.dto || 0
        }
        return prod;
    }
    catch (e) {
        return undefined;
    }
}

export function CreateSummary(s: any): Summary | undefined {
    try {
        let summary: Summary = {
            beneficio: s.beneficio,
            productosMasVendidos: s.productosMasVendidos,
            familiasMasVendidas: s.familiasMasVendidas,
            cantidadProductosVendidos: s.cantidadProductosVendidos,
            dineroDescontado: s.dineroDescontado,
            ivaPagado: s.ivaPagado,
            mediaCantidadVenida: s.mediaCantidadVenida,
            mediaVentas: s.mediaVentas,
            ventaMinima: s.ventaMinima,
            ventaMaxima: s.ventaMaxima,
            numVentas: s.numVentas,
            totalVentas: s.totalVentas,
            ventasPorHora: CreateVentasPorHoraList(s.ventasPorHora),
            totalEfectivo: s.totalEfectivo,
            totalTarjeta: s.totalTarjeta
        }
        return summary;
    }
    catch (e) {
        console.log(e);

        return undefined;
    }
}

export function CreateVentasPorHoraList(pList: any[]): VentasPorHora[] {
    let res: VentasPorHora[] = [];
    pList.forEach((p: any) => {
        const ventasPorHora = CreateVentasPorHora(p);

        if (ventasPorHora) res.push(ventasPorHora);
    });

    return res;
}

function CreateVentasPorHora(s: any): VentasPorHora | undefined {
    try {
        let ventasHora: VentasPorHora = {
            beneficioHora: s.beneficioHora,
            productosMasVendidosHora: s.productosMasVendidosHora,
            familiasMasVendidasHora: s.familiasMasVendidasHora,
            dineroDescontadoHora: s.dineroDescontadoHora,
            hora: s.hora,
            productosVendidosHora: s.productosVendidosHora,
            totalVentaHora: s.totalVentaHora,
            totalEfectivoHora: s.totalEfectivoHora,
            totalTarjetaHora: s.totalTarjetaHora
        }
        return ventasHora;
    }
    catch (e) {
        return undefined;
    }
}

export const CalcularBaseImponiblePorIva = (productosVendidos: ProductoVendido[], iva: number): [number, number] => {
    const prodsFiltrados = productosVendidos.filter((p) => p.iva === iva);
    const bImponible = prodsFiltrados.reduce((prev: number, current: ProductoVendido) => {
        return prev + ((current.precioFinal / (1 + (current.iva / 100))) * current.cantidadVendida)
    }, 0);
    return [bImponible, bImponible * (iva / 100)]
}
