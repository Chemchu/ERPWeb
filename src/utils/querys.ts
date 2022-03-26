import { gql } from "@apollo/client";

export const ADD_SALE = gql`
    mutation addVenta($fields: VentaFields!) {
        addVenta(fields: $fields) {
            message
            successful
            _id
            createdAt
        }
    }
`;

export const ADD_CIERRE = gql`
    mutation AddCierreTPV($cierre: CierreTPVInput!) {
        addCierreTPV(cierre: $cierre) {
            message
            successful
            token
        }
    }
`;

export const QUERY_PRODUCTS = gql`
    query Productos($limit: Int, $find: ProductosFind) {
        productos(limit: $limit, find: $find) {
            _id
            nombre
            proveedor
            familia
            precioVenta
            precioCompra
            iva
            margen
            promociones
            ean
            cantidad
            cantidadRestock
            alta
            createdAt
            updatedAt
        }
    }
`;

export const QUERY_PRODUCT = gql`
    query Producto($find: ProductoFind!) {
        producto(find: $find) {
            _id
            nombre
            proveedor
            familia
            precioVenta
            precioCompra
            iva
            margen
            promociones
            ean
            cantidad
            cantidadRestock
            alta
            createdAt
            updatedAt
        }
    }
`;

export const ADD_PRODUCT = gql`
    mutation AddProducto($precioVenta: Float!, $ean: String!, $iva: Float, $proveedor: String, $familia: String, $nombre: String!, $precioCompra: Float, $margen: Float, $cantidad: Int, $cantidadRestock: Int, $alta: Boolean) {
        addProducto(precioVenta: $precioVenta, ean: $ean, iva: $iva, proveedor: $proveedor, familia: $familia, nombre: $nombre, precioCompra: $precioCompra, margen: $margen, cantidad: $cantidad, cantidadRestock: $cantidadRestock, alta: $alta) {
            message
            successful
        }
    }
`;

export const ADD_PRODUCTOS_FILE = gql`
    mutation AddProductosFile($csv: String!) {
        addProductosFile(csv: $csv) {
            message
            successful
        }
    }
`;

export const QUERY_CLIENTS = gql`
    query Clientes($limit: Int) {
        clientes(limit: $limit) {
            _id
            nif
            nombre
            calle
            cp
        }
    }
`;

export const QUERY_SALE = gql`
    query Venta($id: ID!) {
    venta(_id: $id) {
        _id
        productos {
            _id
            nombre
            proveedor
            familia
            precioVenta
            precioCompra
            iva
            margen
            ean
            cantidadVendida
        }
        dineroEntregadoEfectivo
        dineroEntregadoTarjeta
        precioVentaTotal
        cambio
        cliente {
            _id
            nif
            nombre
            calle
            cp
        }
        vendidoPor {
            _id
            nombre
            apellidos
            rol
            email
        }
        modificadoPor {
            nombre
            _id
            apellidos
            rol
            email
        }
        tipo
        tpv
        descuentoEfectivo
        descuentoPorcentaje
        updatedAt
        createdAt
    }
}
`

export const QUERY_SALES = gql`
    query VentasVentas($find: VentasFind) {
        ventas(find: $find) {
            _id
            dineroEntregadoEfectivo
            dineroEntregadoTarjeta
            descuentoEfectivo
            descuentoPorcentaje
            precioVentaTotal
            cambio
            tipo
            tpv
            createdAt
            updatedAt
            productos {
                _id
                nombre
                proveedor
                familia
                precioVenta
                precioCompra
                iva
                margen
                ean
                cantidadVendida
            }
            cliente {
                _id
                nif
                nombre
                calle
                cp
            }
            vendidoPor {
                _id
                nombre
                apellidos
                email
                rol
            }
            modificadoPor {
                _id
                nombre
                apellidos
                email
                rol
            }
        }
    }
`;

export const QUERY_TPV = gql`
query QueryTPV($find: TPVFind!) {
    tpv(find: $find) {
            _id
            nombre
            enUsoPor {
                _id
                nombre
                apellidos
                rol
                email
            }
            libre
            cajaInicial
            createdAt
            updatedAt
        }
    }
`;

export const QUERY_TPVS = gql`
query Tpvs($find: TPVsFind, $limit: Int) {
  tpvs(find: $find, limit: $limit) {
    _id
    nombre
    enUsoPor {
      _id
      nombre
      apellidos
      rol
      email
    }
    libre
    cajaInicial
    createdAt
    updatedAt
  }
}
`;

export const OCUPY_TPV = gql`
    mutation OcupyTPV($idEmpleado: ID!, $idTpv: ID!, $cajaInicial: Float!) {
        ocupyTPV(idEmpleado: $idEmpleado, idTPV: $idTpv, cajaInicial: $cajaInicial) {
            token
        }
    }
`;

export const QUERY_CIERRES = gql`
    query CierresTPVs($limit: Int) {
        cierresTPVs(limit: $limit) {
            _id
            tpv
            cajaInicial
            abiertoPor {
                _id
                nombre
                apellidos
                rol
                email
            }
            cerradoPor {
                _id
                nombre
                apellidos
                rol
                email
            }
            apertura
            cierre
            ventasEfectivo
            ventasTarjeta
            ventasTotales
            dineroRetirado
            fondoDeCaja
            beneficio
        }
    }
`;
