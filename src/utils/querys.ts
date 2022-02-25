import { gql } from "@apollo/client";

export const ADD_SALE = gql`
    mutation addVenta($fields: VentaFields!) {
        addVenta(fields: $fields) {
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
        descuentoEfectivo
        descuentoPorcentaje
        updatedAt
        createdAt
    }
}
`

export const QUERY_SALES = gql`
    query Ventas {
        ventas {
            _id
            dineroEntregadoEfectivo
            dineroEntregadoTarjeta
            precioVentaTotal
            cambio
            tipo
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
query Tpv($find: TPVFind!) {
    tpv(find: $find) {
        _id
        nombre
        enUsoPor
        libre
        cajaInicial
        createdAt
        updatedAt
    }
}
`;

export const OCUPY_TPV = gql`
        mutation OcupyTPV($idEmpleado: ID!, $idTpv: ID!) {
            ocupyTPV(idEmpleado: $idEmpleado, idTPV: $idTpv) {
                token
            }
        }
`;