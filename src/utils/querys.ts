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
    mutation Mutation($cierre: CierreTPVInput!) {
  addCierreTPV(cierre: $cierre) {
    cierre {
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
      numVentas
      ventasEfectivo
      ventasTarjeta
      ventasTotales
      dineroEsperadoEnCaja
      dineroRealEnCaja
      dineroRetirado
      fondoDeCaja
      beneficio
      nota
    }
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

export const UPDATE_PRODUCT = gql`
   mutation UpdateProducto($producto: ProductoUpdateInput!) {
  updateProducto(producto: $producto) {
    message
    successful
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
    mutation AddProducto($producto: ProductoAddInput!) {
  addProducto(producto: $producto) {
    message
    successful
  }
}
`;

export const DELETE_PRODUCT = gql`
    mutation Mutation($id: ID!) {
  deleteProducto(_id: $id) {
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

export const ADD_SALES_FILE = gql`
    mutation AddVentasFile($ventasJson: String!) {
      addVentasFile(ventasJson: $ventasJson) {
        message
        successful
      }
    }
`;

export const QUERY_CLIENTS = gql`
  query Clientes($limit: Int, $find: ClientesFind) {
    clientes(limit: $limit, find: $find) {
        _id
        nif
        nombre
        calle
        cp
    }
  }
`;

export const ADD_CLIENTES_FILE = gql`
  mutation AddClientesFile($csv: String!) {
    addClientesFile(csv: $csv) {
      message
      successful
    }
  }
`;

export const QUERY_CLIENT = gql`
  query Cliente($find: ClienteFind!) {
    cliente(find: $find) {
      _id
      nif
      nombre
      calle
      cp
    }
  }
`;

export const UPDATE_CLIENT = gql`
  mutation Mutation($id: ID!, $nif: String, $nombre: String, $calle: String, $cp: String) {
    updateCliente(_id: $id, nif: $nif, nombre: $nombre, calle: $calle, cp: $cp) {
      message
      successful
    }
  }
`;

export const DELETE_CLIENT = gql`
  mutation DeleteCliente($id: ID!) {
    deleteCliente(_id: $id) {
      message
      successful
    }
  }
`;

export const ADD_CLIENT = gql`
  mutation Mutation($nif: String!, $nombre: String!, $calle: String, $cp: String) {
    addCliente(nif: $nif, nombre: $nombre, calle: $calle, cp: $cp) {
      message
      successful
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
`;

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
            successful
        }
    }
`;

export const QUERY_CIERRES = gql`
    query CierresTPVs {
  cierresTPVs {
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
    numVentas
    ventasEfectivo
    ventasTarjeta
    ventasTotales
    dineroEsperadoEnCaja
    dineroRealEnCaja
    dineroRetirado
    fondoDeCaja
    beneficio
    nota
    cierre
    apertura
    cerradoPor {
      _id
      nombre
      apellidos
      rol
      email
    }
  }
}
`;

export const QUERY_EMPLEADOS = gql`
    query Empleados($find: EmpleadosFind, $limit: Int) {
  empleados(find: $find, limit: $limit) {
    _id
    nombre
    apellidos
    rol
    email
  }
}
`;

export const DELETE_EMPLEADO = gql`
    mutation DeleteEmpleado($id: ID!) {
  deleteEmpleado(_id: $id) {
    message
    successful
  }
}
`

export const UPDATE_EMPLEADO = gql`
    mutation UpdateEmpleado($id: ID!, $nombre: String, $apellidos: String, $rol: String, $email: String) {
  updateEmpleado(_id: $id, nombre: $nombre, apellidos: $apellidos, rol: $rol, email: $email) {
    message
    successful
  }
}
`