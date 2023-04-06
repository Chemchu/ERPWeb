import type { Database } from "../../../types/supabase";

export type Empleado = Database["public"]["Tables"]["empleados"]["Row"];
export type Producto = Database["public"]["Tables"]["productos"]["Row"];
export type Venta = Database["public"]["Tables"]["ventas"]["Row"];
export type Cliente = Database["public"]["Tables"]["clientes"]["Row"];
export type Proveedor = Database["public"]["Tables"]["proveedores"]["Row"];
export type Cierre = Database["public"]["Tables"]["cierres"]["Row"];
