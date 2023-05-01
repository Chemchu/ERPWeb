import { fail } from "@sveltejs/kit";

export const load = async ({ locals }) => {
  const session = await locals.supabase.auth.getSession();
  if (!session.data.session) {
    return {
      status: 401,
      body: {
        message: "Unauthorized",
      },
    };
  }

  const { data, error } = await locals.supabase.rpc("get_pais_enum_values");

  if (error) {
    console.log(error);
    return fail(400, { body: { error: true, message: error.message } });
  }

  return {
    status: 200,
    body: {
      data: {
        paises: data,
      },
    },
  };
};
