export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      cierres: {
        Row: {
          caja_final: number
          caja_inicial: number
          dinero_dejado_en_caja: number
          dinero_esperado_en_caja: number
          dinero_real_en_caja: number
          dinero_retirado_de_caja: number
          fecha_apertura: string
          fecha_cierre: string
          id: string
          tpv_id: string
          ventas_efectivo: number
          ventas_tarjeta: number
        }
        Insert: {
          caja_final: number
          caja_inicial: number
          dinero_dejado_en_caja: number
          dinero_esperado_en_caja: number
          dinero_real_en_caja: number
          dinero_retirado_de_caja: number
          fecha_apertura?: string
          fecha_cierre?: string
          id?: string
          tpv_id: string
          ventas_efectivo: number
          ventas_tarjeta: number
        }
        Update: {
          caja_final?: number
          caja_inicial?: number
          dinero_dejado_en_caja?: number
          dinero_esperado_en_caja?: number
          dinero_real_en_caja?: number
          dinero_retirado_de_caja?: number
          fecha_apertura?: string
          fecha_cierre?: string
          id?: string
          tpv_id?: string
          ventas_efectivo?: number
          ventas_tarjeta?: number
        }
      }
      clientes: {
        Row: {
          created_at: string
          direccion_id: string | null
          id: string
          nif: string
          nombre: string
        }
        Insert: {
          created_at?: string
          direccion_id?: string | null
          id?: string
          nif: string
          nombre: string
        }
        Update: {
          created_at?: string
          direccion_id?: string | null
          id?: string
          nif?: string
          nombre?: string
        }
      }
      codigos_de_barra: {
        Row: {
          created_at: string
          ean: string
          ean_id: string
          producto_id: string | null
        }
        Insert: {
          created_at?: string
          ean: string
          ean_id?: string
          producto_id?: string | null
        }
        Update: {
          created_at?: string
          ean?: string
          ean_id?: string
          producto_id?: string | null
        }
      }
      devoluciones: {
        Row: {
          cliente_id: string | null
          created_at: string
          dinero_devuelto: number
          empleado_id: string | null
          id: string
          tpv_id: string | null
          venta_original_id: string | null
        }
        Insert: {
          cliente_id?: string | null
          created_at?: string
          dinero_devuelto: number
          empleado_id?: string | null
          id?: string
          tpv_id?: string | null
          venta_original_id?: string | null
        }
        Update: {
          cliente_id?: string | null
          created_at?: string
          dinero_devuelto?: number
          empleado_id?: string | null
          id?: string
          tpv_id?: string | null
          venta_original_id?: string | null
        }
      }
      direcciones: {
        Row: {
          calle: string
          codigo_postal: string
          created_at: string
          id: string
          telefono: string | null
        }
        Insert: {
          calle: string
          codigo_postal: string
          created_at?: string
          id?: string
          telefono?: string | null
        }
        Update: {
          calle?: string
          codigo_postal?: string
          created_at?: string
          id?: string
          telefono?: string | null
        }
      }
      empleados: {
        Row: {
          apellidos: string
          created_at: string
          dni: string | null
          email: string
          id: string
          nombre: string
          rol: string | null
          updated_at: string
        }
        Insert: {
          apellidos: string
          created_at?: string
          dni?: string | null
          email: string
          id?: string
          nombre: string
          rol?: string | null
          updated_at?: string
        }
        Update: {
          apellidos?: string
          created_at?: string
          dni?: string | null
          email?: string
          id?: string
          nombre?: string
          rol?: string | null
          updated_at?: string
        }
      }
      mermas: {
        Row: {
          beneficio_perdido: number
          coste_productos: number
          created_at: string
          empleado_id: string | null
          id: string
          ventas_perdidas: number
        }
        Insert: {
          beneficio_perdido: number
          coste_productos: number
          created_at?: string
          empleado_id?: string | null
          id?: string
          ventas_perdidas: number
        }
        Update: {
          beneficio_perdido?: number
          coste_productos?: number
          created_at?: string
          empleado_id?: string | null
          id?: string
          ventas_perdidas?: number
        }
      }
      productos: {
        Row: {
          alta: boolean
          cantidad: number
          created_at: string
          familia: string | null
          id: string
          iva: number
          margen: number
          nombre: string
          precio_compra: number
          precio_venta: number
          proveedor_id: string | null
        }
        Insert: {
          alta: boolean
          cantidad: number
          created_at?: string
          familia?: string | null
          id?: string
          iva: number
          margen: number
          nombre: string
          precio_compra: number
          precio_venta: number
          proveedor_id?: string | null
        }
        Update: {
          alta?: boolean
          cantidad?: number
          created_at?: string
          familia?: string | null
          id?: string
          iva?: number
          margen?: number
          nombre?: string
          precio_compra?: number
          precio_venta?: number
          proveedor_id?: string | null
        }
      }
      productos_devueltos: {
        Row: {
          cantidad_devuelta: number
          codigo_de_barras: string | null
          created_at: string
          descuento: number
          devolucion_id: string
          iva: number
          margen: number
          precio_compra: number
          precio_final: number
          precio_venta: number
          producto_id: string
          proveedor_id: string | null
        }
        Insert: {
          cantidad_devuelta: number
          codigo_de_barras?: string | null
          created_at?: string
          descuento: number
          devolucion_id: string
          iva: number
          margen: number
          precio_compra: number
          precio_final: number
          precio_venta: number
          producto_id: string
          proveedor_id?: string | null
        }
        Update: {
          cantidad_devuelta?: number
          codigo_de_barras?: string | null
          created_at?: string
          descuento?: number
          devolucion_id?: string
          iva?: number
          margen?: number
          precio_compra?: number
          precio_final?: number
          precio_venta?: number
          producto_id?: string
          proveedor_id?: string | null
        }
      }
      productos_mermados: {
        Row: {
          cantidad_mermada: number
          codigo_de_barras_id: string | null
          created_at: string
          iva: number
          margen: number
          merma_id: string
          motivo_merma: string
          precio_compra: number
          precio_venta: number
          producto_id: string
          proveedor_id: string | null
        }
        Insert: {
          cantidad_mermada: number
          codigo_de_barras_id?: string | null
          created_at?: string
          iva: number
          margen: number
          merma_id: string
          motivo_merma: string
          precio_compra: number
          precio_venta: number
          producto_id: string
          proveedor_id?: string | null
        }
        Update: {
          cantidad_mermada?: number
          codigo_de_barras_id?: string | null
          created_at?: string
          iva?: number
          margen?: number
          merma_id?: string
          motivo_merma?: string
          precio_compra?: number
          precio_venta?: number
          producto_id?: string
          proveedor_id?: string | null
        }
      }
      productos_vendidos: {
        Row: {
          beneficio: number
          cantidad_vendida: number
          codigo_barras_id: string | null
          created_at: string
          descuento: number
          iva: number
          margen: number
          precio_compra: number
          precio_final: number
          precio_venta: number
          producto_id: string
          proveedor_id: string | null
          venta_id: string
        }
        Insert: {
          beneficio: number
          cantidad_vendida: number
          codigo_barras_id?: string | null
          created_at?: string
          descuento: number
          iva: number
          margen: number
          precio_compra: number
          precio_final: number
          precio_venta: number
          producto_id: string
          proveedor_id?: string | null
          venta_id: string
        }
        Update: {
          beneficio?: number
          cantidad_vendida?: number
          codigo_barras_id?: string | null
          created_at?: string
          descuento?: number
          iva?: number
          margen?: number
          precio_compra?: number
          precio_final?: number
          precio_venta?: number
          producto_id?: string
          proveedor_id?: string | null
          venta_id?: string
        }
      }
      proveedores: {
        Row: {
          cif: string
          created_at: string
          direccion: string | null
          id: string
          nombre: string
        }
        Insert: {
          cif: string
          created_at?: string
          direccion?: string | null
          id?: string
          nombre: string
        }
        Update: {
          cif?: string
          created_at?: string
          direccion?: string | null
          id?: string
          nombre?: string
        }
      }
      tpvs: {
        Row: {
          abierto_por_id: string | null
          caja_inicial: number
          created_at: string
          id: string
          libre: boolean
          nombre: string
          usado_por_id: string | null
        }
        Insert: {
          abierto_por_id?: string | null
          caja_inicial: number
          created_at?: string
          id?: string
          libre: boolean
          nombre: string
          usado_por_id?: string | null
        }
        Update: {
          abierto_por_id?: string | null
          caja_inicial?: number
          created_at?: string
          id?: string
          libre?: boolean
          nombre?: string
          usado_por_id?: string | null
        }
      }
      ventas: {
        Row: {
          cambio: number
          cliente_id: string | null
          created_at: string
          descuento_porcentaje: number
          descuento_sobre_total: number
          dinero_efectivo: number
          dinero_tarjeta: number
          empleado_id: string | null
          id: string
          numero_factura: number
          precio_venta_pagado: number
          precio_venta_total: number
          tipo_pago: string
          tpv_id: string | null
        }
        Insert: {
          cambio: number
          cliente_id?: string | null
          created_at?: string
          descuento_porcentaje: number
          descuento_sobre_total: number
          dinero_efectivo: number
          dinero_tarjeta: number
          empleado_id?: string | null
          id?: string
          numero_factura: number
          precio_venta_pagado: number
          precio_venta_total: number
          tipo_pago: string
          tpv_id?: string | null
        }
        Update: {
          cambio?: number
          cliente_id?: string | null
          created_at?: string
          descuento_porcentaje?: number
          descuento_sobre_total?: number
          dinero_efectivo?: number
          dinero_tarjeta?: number
          empleado_id?: string | null
          id?: string
          numero_factura?: number
          precio_venta_pagado?: number
          precio_venta_total?: number
          tipo_pago?: string
          tpv_id?: string | null
        }
      }
      ventas_devueltas: {
        Row: {
          cambio: number
          cliente_id: string | null
          created_at: string
          descuento_porcentaje: number
          descuento_valor: number
          dinero_efectivo: number
          dinero_tarjeta: number
          id: string
          numero_factura: number
          precio_venta_pagado: number
          precio_venta_total: number
          tipo_pago: string
          tpv_id: string | null
          vendedor: string | null
        }
        Insert: {
          cambio: number
          cliente_id?: string | null
          created_at?: string
          descuento_porcentaje: number
          descuento_valor: number
          dinero_efectivo: number
          dinero_tarjeta: number
          id?: string
          numero_factura: number
          precio_venta_pagado: number
          precio_venta_total: number
          tipo_pago: string
          tpv_id?: string | null
          vendedor?: string | null
        }
        Update: {
          cambio?: number
          cliente_id?: string | null
          created_at?: string
          descuento_porcentaje?: number
          descuento_valor?: number
          dinero_efectivo?: number
          dinero_tarjeta?: number
          id?: string
          numero_factura?: number
          precio_venta_pagado?: number
          precio_venta_total?: number
          tipo_pago?: string
          tpv_id?: string | null
          vendedor?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      crear_producto: {
        Args: {
          nombre: string
          familia: string
          preciocompra: number
          precio: number
          iva: number
          margen: number
          cantidad: number
          codigos_de_barra: string[]
          proveedorid?: string
        }
        Returns: string
      }
      crear_venta: {
        Args: {
          venta: Database["public"]["CompositeTypes"]["venta_a_procesar"]
        }
        Returns: string
      }
      get_familia_enum_values: {
        Args: Record<PropertyKey, never>
        Returns: Database["public"]["Enums"]["familia"][]
      }
      get_pais_enum_values: {
        Args: Record<PropertyKey, never>
        Returns: Database["public"]["Enums"]["pais"][]
      }
    }
    Enums: {
      familia:
        | "Bebida"
        | "Drogueria"
        | "Alimentacion"
        | "Servicio"
        | "Snack"
        | "Vino"
        | "Otro"
        | "Bolleria dulce"
        | "Bolleria salada"
        | "Alcohol"
        | "Panaderia"
        | "Nevera"
        | "Congelado"
        | "Helado"
      pais:
        | "China"
        | "India"
        | "United States"
        | "Indonesia"
        | "Pakistan"
        | "Brazil"
        | "Nigeria"
        | "Bangladesh"
        | "Russia"
        | "Mexico"
        | "Japan"
        | "Ethiopia"
        | "Philippines"
        | "Egypt"
        | "Vietnam"
        | "DR Congo"
        | "Turkey"
        | "Iran"
        | "Germany"
        | "Thailand"
        | "United Kingdom"
        | "France"
        | "Italy"
        | "Tanzania"
        | "South Africa"
        | "Myanmar"
        | "Kenya"
        | "South Korea"
        | "Colombia"
        | "Spain"
        | "Uganda"
        | "Argentina"
        | "Algeria"
        | "Sudan"
        | "Ukraine"
        | "Iraq"
        | "Afghanistan"
        | "Poland"
        | "Canada"
        | "Morocco"
        | "Uzbekistan"
        | "Saudi Arabia"
        | "Malaysia"
        | "Peru"
        | "Venezuela"
        | "Nepal"
        | "Mozambique"
        | "Ghana"
        | "Yemen"
        | "Madagascar"
        | "North Korea"
        | "Australia"
        | "Cameroon"
        | "Taiwan"
        | "Ivory Coast"
        | "Niger"
        | "Sri Lanka"
        | "Burkina Faso"
        | "Mali"
        | "Romania"
        | "Malawi"
        | "Syria"
        | "Kazakhstan"
        | "Zambia"
        | "Netherlands"
        | "Chile"
        | "Guatemala"
        | "Ecuador"
        | "Zimbabwe"
        | "Senegal"
        | "Cambodia"
        | "Chad"
        | "Somalia"
        | "Guinea"
        | "Rwanda"
        | "Benin"
        | "Tunisia"
        | "Burundi"
        | "Belgium"
        | "Haiti"
        | "Cuba"
        | "South Sudan"
        | "Dominican Republic"
        | "Czech Republic"
        | "Greece"
        | "Jordan"
        | "Portugal"
        | "Azerbaijan"
        | "Sweden"
        | "United Arab Emirates"
        | "Hungary"
        | "Tajikistan"
        | "Belarus"
        | "Honduras"
        | "Austria"
        | "Switzerland"
        | "Israel"
        | "Papua New Guinea"
        | "Togo"
        | "Sierra Leone"
        | "Hong Kong"
        | "Laos"
        | "Paraguay"
        | "Bulgaria"
        | "Serbia"
        | "Lebanon"
        | "Libya"
        | "Nicaragua"
        | "El Salvador"
        | "Kyrgyzstan"
        | "Turkmenistan"
        | "Singapore"
        | "Denmark"
        | "Finland"
        | "Congo"
        | "Slovakia"
        | "Norway"
        | "Oman"
        | "State of Palestine"
        | "Costa Rica"
        | "Liberia"
        | "Ireland"
        | "Central African Republic"
        | "New Zealand"
        | "Mauritania"
        | "Panama"
        | "Kuwait"
        | "Croatia"
        | "Moldova"
        | "Georgia"
        | "Eritrea"
        | "Uruguay"
        | "Bosnia and Herzegovina"
        | "Mongolia"
        | "Armenia"
        | "Jamaica"
        | "Qatar"
        | "Albania"
        | "Puerto Rico"
        | "Lithuania"
        | "Namibia"
        | "Gambia"
        | "Botswana"
        | "Gabon"
        | "Lesotho"
        | "North Macedonia"
        | "Slovenia"
        | "Guinea-Bissau"
        | "Latvia"
        | "Bahrain"
        | "Trinidad and Tobago"
        | "Equatorial Guinea"
        | "Estonia"
        | "Timor-Leste"
        | "Mauritius"
        | "Cyprus"
        | "Eswatini"
        | "Djibouti"
        | "Fiji"
    }
    CompositeTypes: {
      producto_vendido: {
        id: string
        precio_final: number
        cantidad_vendida: number
        descuento: number
        ean_id: string
      }
      venta_a_procesar: {
        tpv_id: string
        cliente_id: string
        empleado_id: string
        productos_vendidos: unknown
        precio_venta_total: number
        precio_venta_pagado: number
        dinero_efectivo: number
        dinero_tarjeta: number
        cambio: number
        tipo_pago: string
        descuento_sobre_total: number
        descuento_porcentaje: number
      }
    }
  }
}
