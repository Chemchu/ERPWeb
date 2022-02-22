import { gql } from "@apollo/client";

export const ADD_SALE = gql`
    mutation addVenta($fields: VentaFields!) {
        addVenta(fields: $fields) {
            message
            successful
        }
    }
`;

export const QUERY_SALES = gql`
    query Ventas($limit: Int) {
        ventas(limit: $limit) {
            _id
            productos {
            nombre
            _id
            familia
            ean
            cantidadVendida
            precioVenta
            }
            dineroEntregadoEfectivo
            dineroEntregadoTarjeta
            precioVentaTotal
            cambio
            cliente {
            nombre
            _id
            }
            vendidoPor {
            _id
            nombre
            }
            tipo
            descuentoEfectivo
            createdAt
            descuentoPorcentaje
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

export const QUERY_TPV_SALES = gql`
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

export const OCUPY_TPV = gql`
        mutation OcupyTPV($idEmpleado: ID!, $idTpv: ID!) {
            ocupyTPV(idEmpleado: $idEmpleado, idTPV: $idTpv) {
                token
            }
        }
    `;