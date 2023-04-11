import type { Empleado } from "$lib/types/types";

export async function load({ params, locals }) {
  const { data, error } = await locals.supabase
    .from("empleados")
    .select("*")
    .eq("email", params.slug);

  if (error) {
    console.log(error);
    throw error;
  }

  return {
    props: {
      empleado: data[0] as Empleado,
    },
  };
}
