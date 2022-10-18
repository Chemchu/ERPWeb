export const ADD_SALE = `
    mutation addVenta($fields: VentaFields!) {
        addVenta(fields: $fields) {
            message
            successful
            _id
            createdAt
        }
    }
`;

export const ADD_CIERRE = `mutation AddCierreTPV($cierre: CierreTPVInput!) {
  addCierreTPV(cierre: $cierre) {
    message
    successful
    token
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
      ventasEfectivo
      ventasTarjeta
      ventasTotales
      dineroEsperadoEnCaja
      dineroRealEnCaja
      dineroRetirado
      fondoDeCaja
      beneficio
    }
  }
}
`;

export const QUERY_PRODUCTS = `
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
            ean
            cantidad
            cantidadRestock
            alta
            createdAt
            updatedAt
        }
    }
`;

export const UPDATE_PRODUCT = `
   mutation UpdateProducto($producto: ProductoUpdateInput!) {
  updateProducto(producto: $producto) {
    message
    successful
  }
}
`;

export const QUERY_PRODUCT = `
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

export const ADD_PRODUCT = `
    mutation AddProducto($producto: ProductoAddInput!) {
  addProducto(producto: $producto) {
    message
    successful
  }
}
`;

export const DELETE_PRODUCT = `
    mutation Mutation($id: ID!) {
  deleteProducto(_id: $id) {
    message
    successful
  }
}
`;

export const ADD_PRODUCTOS_FILE = `
    mutation AddProductosFile($csv: String!) {
        addProductosFile(csv: $csv) {
            message
            successful
        }
    }
`;

export const ADD_SALES_FILE = `
    mutation AddVentasFile($ventasJson: String!) {
      addVentasFile(ventasJson: $ventasJson) {
        message
        successful
      }
    }
`;

export const QUERY_CLIENTS = `
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

export const ADD_CLIENTES_FILE = `
  mutation AddClientesFile($csv: String!) {
    addClientesFile(csv: $csv) {
      message
      successful
    }
  }
`;

export const QUERY_CLIENT = `
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

export const UPDATE_CLIENT = `
  mutation Mutation($id: ID!, $nif: String, $nombre: String, $calle: String, $cp: String) {
    updateCliente(_id: $id, nif: $nif, nombre: $nombre, calle: $calle, cp: $cp) {
      message
      successful
    }
  }
`;

export const DELETE_CLIENT = `
  mutation DeleteCliente($id: ID!) {
    deleteCliente(_id: $id) {
      message
      successful
    }
  }
`;

export const ADD_CLIENT = `
  mutation Mutation($nif: String!, $nombre: String!, $calle: String, $cp: String) {
    addCliente(nif: $nif, nombre: $nombre, calle: $calle, cp: $cp) {
      message
      successful
    }
  }
`;

export const QUERY_SALE = `
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
            precioFinal
            iva
            margen
            ean
            cantidadVendida
            dto
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

export const QUERY_SALES = `
    query Ventas($find: VentasFind) {
        ventas(find: $find) {
            _id
            numFactura
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
                precioFinal
                iva
                margen
                ean
                cantidadVendida
                dto
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

export const QUERY_TPV = `
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

export const QUERY_TPVS = `
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

export const OCUPY_TPV = `
    mutation OcupyTPV($idEmpleado: ID!, $idTpv: ID!, $cajaInicial: Float!) {
        ocupyTPV(idEmpleado: $idEmpleado, idTPV: $idTpv, cajaInicial: $cajaInicial) {
            token
            successful
        }
    }
`;

export const QUERY_CIERRES = `
    query CierresTPVs($find: CierresTPVFind) {
  cierresTPVs(find: $find) {
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

export const QUERY_EMPLEADOS = `
    query Empleados($find: EmpleadosFind, $limit: Int) {
  empleados(find: $find, limit: $limit) {
    _id
    nombre
    apellidos
    rol
    email
    dni
  }
}
`;

export const DELETE_EMPLEADO = `
    mutation DeleteEmpleado($id: ID!) {
  deleteEmpleado(_id: $id) {
    message
    successful
  }
}
`

export const UPDATE_EMPLEADO = `
mutation Mutation($id: ID!, $empleadoInput: EmpleadoUpdateFields!) {
  updateEmpleado(_id: $id, empleadoInput: $empleadoInput) {
    message
    successful
  }
}
`

export const LOGIN = `
  query Login($loginValues: Credentials!) {
    login(loginValues: $loginValues) {
      message
      successful
      token
    }
  }
`

export const QUERY_DEVOLUCIONES = `
query Devoluciones($find: DevolucionFind, $limit: Int) {
  devoluciones(find: $find, limit: $limit) {
    _id
    productosDevueltos {
      _id
      nombre
      proveedor
      familia
      precioVenta
      precioCompra
      precioFinal
      iva
      margen
      ean
      cantidadDevuelta
      dto
    }
    dineroDevuelto
    ventaOriginal {
      _id
      productos {
        _id
        nombre
        familia
        proveedor
        precioVenta
        precioCompra
        precioFinal
        iva
        margen
        ean
        cantidadVendida
        dto
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
        _id
        nombre
        apellidos
        rol
        email
      }
      tipo
      descuentoEfectivo
      descuentoPorcentaje
      tpv
      createdAt
      updatedAt
    }
    tpv
    cliente {
      _id
      nif
      nombre
      calle
      cp
    }
    trabajador {
      _id
      nombre
      apellidos
      rol
      email
    }
    createdAt
    updatedAt
    modificadoPor {
      _id
      nombre
      apellidos
      rol
      email
    }
  }
}
`

export const ADD_DEVOLUCION = `
  mutation AddDevolucion($fields: DevolucionFields!) {
  addDevolucion(fields: $fields) {
    message
    successful
    _id
    createdAt
  }
}
`

export const ADD_CIERRES_FILE = `
    mutation AddCierresFile($csv: String!) {
      addCierresFile(csv: $csv) {
        message
        successful
      }
    }
`;

export const UPDATE_SALE = `
mutation UpdateVenta($id: ID!, $precioVentaTotal: Float!, $tipo: String, $cliente: ClienteInput, $modificadoPor: EmpleadoInput) {
  updateVenta(_id: $id, precioVentaTotal: $precioVentaTotal, tipo: $tipo, cliente: $cliente, modificadoPor: $modificadoPor) {
    message
    successful
    _id
    createdAt
  }
}
`

export const DELETE_CIERRE = `
mutation DeleteCierreTPV($id: ID!) {
  deleteCierreTPV(_id: $id) {
    message
    successful
  }
}
`
export const QUERY_MERMA = `
query Merma($find: MermaFind!) {
  merma(find: $find) {
    _id
    productos {
      _id
      nombre
      proveedor
      cantidad
      familia
      margen
      ean
      iva
      precioCompra
      precioVenta
      motivo
    }
    creadoPor {
      _id
      nombre
      apellidos
      rol
      email
    }
    costeProductos
    ventasPerdidas
    beneficioPerdido
    createdAt
    updatedAt
  }
}
`

export const QUERY_MERMAS = `
query Mermas($find: MermasFind, $limit: Int) {
  mermas(find: $find, limit: $limit) {
    _id
    productos {
      _id
      nombre
      proveedor
      cantidad
      familia
      margen
      ean
      iva
      precioCompra
      precioVenta
      motivo
    }
    creadoPor {
      _id
      nombre
      apellidos
      rol
      email
    }
    costeProductos
    ventasPerdidas
    beneficioPerdido
    createdAt
    updatedAt
  }
}
`

export const ADD_MERMA = `
mutation Mutation($merma: MermaInput!) {
  addMerma(merma: $merma) {
    message
    successful
  }
}`

export const DELETE_MERMA = `
mutation Mutation($id: ID!) {
  deleteMerma(_id: $id) {
    message
    successful
  }
}`

export const UPDATE_MERMA = `
mutation Mutation($id: ID!, $merma: MermaInput!) {
  updateMerma(_id: $id, merma: $merma) {
    message
    successful
  }
}`