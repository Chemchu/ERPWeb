import type { Empleado } from "$lib/types/types";

type Image = {
  imageSrc: string;
};

export async function load({ params, locals }) {
  const { data, error } = await locals.supabase
    .from("empleados")
    .select("*")
    .eq("email", params.slug);

  if (error) {
    console.log(error);
    throw error;
  }

  const res = await locals.supabase.storage.from("avatars").list();
  console.log(res);

  return {
    props: {
      empleado: data[0] as Empleado & Image,
    },
  };
}
