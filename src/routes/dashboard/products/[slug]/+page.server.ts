import {
  getCodigosDeBarras,
  getFamilias,
  getProveedores,
} from "$lib/functions/backendFunctions.js";
import type { Producto, Proveedor } from "$lib/types/types.js";

export async function load({ params, locals }) {
  const { data: producto, error: productosError } = await locals.supabase
    .from("productos")
    .select("*")
    .eq("id", params.slug)
    .single();

  if (productosError) {
    console.log(productosError);
    throw productosError;
  }

  const proveedores = await getProveedores(locals.supabase);
  const familias = await getFamilias(locals.supabase);
  const codigosDeBarra = await getCodigosDeBarras(locals.supabase, producto.id);

  return {
    producto: producto as Producto,
    familias: familias as string[],
    proveedores: proveedores as Proveedor[],
    codigosDeBarra,
  };
}
