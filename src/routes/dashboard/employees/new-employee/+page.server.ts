import { ERPWEB_URL } from "$env/static/private";
import { error as Error } from "@sveltejs/kit";

export const actions = {
  createEmployee: async ({ request, locals }) => {
    const formData = await request.formData();
    const nombre = formData.get("nombre");
    const apellidos = formData.get("apellidos");
    const email = formData.get("email");
    const rol = formData.get("rol");
    const dni = formData.get("dni");

    if (!email) {
      return {
        status: 400,
        body: {
          message: "Email is required",
        },
      };
    }
    if (!nombre) {
      return {
        status: 400,
        body: {
          message: "Nombre is required",
        },
      };
    }
    if (!apellidos) {
      return {
        status: 400,
        body: {
          message: "Apellidos is required",
        },
      };
    }
    if (!rol) {
      return {
        status: 400,
        body: {
          message: "Rol is required",
        },
      };
    }
    if (!dni) {
      return {
        status: 400,
        body: {
          message: "DNI is required",
        },
      };
    }

    const session = await locals.supabase.auth.getSession();
    if (!session.data.session) {
      return {
        status: 401,
        body: {
          message: "Unauthorized",
        },
      };
    }

    const { error } = await locals.supabase.auth.signInWithOtp({
      email: email.toString(),
      options: {
        data: {
          nombre: nombre.toString(),
          apellidos: apellidos.toString(),
          rol: rol.toString(),
          dni: dni.toString(),
        },
        emailRedirectTo: `${ERPWEB_URL}/welcome`,
      },
    });

    if (error) {
      console.log(error);

      throw Error(error.status || 400, error.message);
    }

    await locals.supabase.auth.setSession({
      access_token: session.data.session.access_token,
      refresh_token: session.data.session.refresh_token,
    });

    return new Response(
      String({
        message:
          "Invitation sent, please check your email for a link to complete your registration.",
      })
    );
  },
};
