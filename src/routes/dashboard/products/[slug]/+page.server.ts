import type { Producto, Proveedor } from "$lib/types/types.js";

export async function load({ params, locals }) {
  const { data: productos, error: productosError } = await locals.supabase
    .from("productos")
    .select("*")
    .eq("id", params.slug)
    .single();

  if (productosError) {
    console.log(productosError);
    throw productosError;
  }

  const { data: proveedores, error: proveedoresError } = await locals.supabase
    .from("proveedores")
    .select("*");

  if (proveedoresError) {
    console.log(proveedoresError);
    throw proveedoresError;
  }

  const { data: familias, error: familiasError } = await locals.supabase.rpc(
    "get_familia_enum_values"
  );

  if (familiasError) {
    console.log(familiasError);
    throw familiasError;
  }

  return {
    props: {
      producto: productos as Producto,
      familias: familias as string[],
      proveedores: proveedores as Proveedor[],
    },
  };
}
