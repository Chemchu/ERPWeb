import type { Empleado, Producto, Proveedor } from "$lib/types/types";
import type { SupabaseClient } from "@supabase/supabase-js";

export const deleteProduct = async (
  supabase: SupabaseClient,
  producto: Producto,
  sideEffect?: Function
) => {
  const response = await supabase.rpc("eliminar_producto", {
    productoid: producto.id,
  });

  if (response.error) {
    console.error(response.error);
    return;
  }

  if (sideEffect) sideEffect();
};

export const getCodigosDeBarras = async (
  supabase: SupabaseClient,
  productoId: string
): Promise<string[]> => {
  const response = await supabase
    .from("codigos_de_barra")
    .select("*")
    .eq("producto_id", productoId);

  if (response.error) {
    console.error(response.error);
    return [];
  }

  return response.data.map((codigo) => codigo.ean);
};

export const getFamilias = async (supabase: SupabaseClient) => {
  const { data: familias, error: familiasError } = await supabase.rpc(
    "get_familia_enum_values"
  );

  if (familiasError) {
    console.error(familiasError);
    return [];
  }

  return familias as string[];
};

export const getPaises = async (supabase: SupabaseClient) => {
  const { data, error } = await supabase.rpc("get_pais_enum_values");

  if (error) {
    console.log(error);
    return [];
  }

  return data as string[];
};

export const getProveedores = async (
  supabase: SupabaseClient
): Promise<Proveedor[]> => {
  const { data, error } = await supabase.from("proveedores").select("*");

  if (error) {
    console.log(error);
    return [];
  }

  return data as Proveedor[];
};

export const getEmpleados = async (
  supabase: SupabaseClient
): Promise<
  Map<string, { empleado: Empleado; pictures: string | undefined }>
> => {
  const empleadosMap = new Map<
    string,
    { empleado: Empleado; pictures: string | undefined }
  >();
  const { data, error } = await supabase.from("empleados").select("*");

  if (error) {
    console.log(error);
    return empleadosMap;
  }

  const empleados = data as Empleado[];

  for await (const emp of empleados) {
    const { data: blob } = await supabase.storage
      .from("avatars")
      .download(emp.id + "/profile");

    const img = await blob?.text();

    const empleado: Empleado = emp;
    empleadosMap.set(emp.id, { empleado, pictures: img });
  }

  return empleadosMap;
};
