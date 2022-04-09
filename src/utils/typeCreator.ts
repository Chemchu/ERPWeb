import { Cierre } from "../tipos/Cierre";
import { Cliente } from "../tipos/Cliente";
import { Devolucion } from "../tipos/Devolucion";
import { Empleado } from "../tipos/Empleado";
import { Producto } from "../tipos/Producto";
import { ProductoVendido } from "../tipos/ProductoVendido";
import { TPVType } from "../tipos/TPV";
import { Venta } from "../tipos/Venta";

function CreateProduct(p: any): Producto | undefined {
    try {
        if (p.nombre === undefined) return undefined;

        let producto = {
            _id: p._id,
            alta: p.alta,
            cantidad: p.cantidad | 0,
            cantidadRestock: p.cantidadRestock | 0,
            descripcion: p.descripcion ? p.descripcion : "",
            ean: p.ean,
            familia: p.familia,
            img: p.img,
            iva: p.iva,
            nombre: p.nombre,
            precioCompra: p.precioCompra,
            precioVenta: p.precioVenta,
            tags: p.tags,
            promociones: p.promociones,
            proveedor: p.proveedor,
            margen: p.margen
        } as unknown as Producto

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
            numVentas: c.numVentas,
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

export function CreateTPV(tpv: any): TPVType {
    let res: TPVType = {
        _id: tpv._id,
        nombre: tpv.nombre,
        enUsoPor: tpv.enUsoPor,
        cajaInicial: tpv.cajaInicial,
        libre: tpv.libre,
        createdAt: tpv.createdAt,
        updatedAt: tpv.updatedAt
    }

    return res;
}

export function CreateTPVsList(tpvs: any): TPVType[] {
    let res: TPVType[] = [];
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
            productosDevueltos: CreateProductoVendidoList(s.productos),
            dineroDevuelto: s.dineroDevuelto,
            cliente: CreateClient(s.cliente) || s.client,
            trabajador: CreateEmployee(s.trabajador),
            modificadoPor: CreateEmployee(s.modificadoPor),
            ventaId: s.ventaId,
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