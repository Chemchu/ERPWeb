import type { Producto } from "$lib/types/types.js";

export async function load({ params, locals }) {
  const { data, error } = await locals.supabase
    .from("productos")
    .select("*")
    .eq("id", params.slug)
    .single();

  if (error) {
    console.log(error);
    throw error;
  }

  return {
    props: {
      empleado: data as Producto,
    },
  };
}
