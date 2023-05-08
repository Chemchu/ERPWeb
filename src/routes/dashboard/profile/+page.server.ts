import { getPaises } from "$lib/functions/backendFunctions.js";

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

  const paises = await getPaises(locals.supabase);

  return {
    status: 200,
    body: {
      data: {
        paises: paises,
      },
    },
  };
};
