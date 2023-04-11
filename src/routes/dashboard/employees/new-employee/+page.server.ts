import { ERPWEB_URL } from "$env/static/private";

export const actions = {
  createEmployee: async ({ request, locals }) => {
    const supabase = locals.supabase;
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

    const { error } = await supabase.auth.admin.inviteUserByEmail(
      email.toString(),
      {
        data: {
          nombre: nombre.toString(),
          apellidos: apellidos.toString(),
          rol: rol.toString(),
          dni: dni.toString(),
        },
        redirectTo: `${ERPWEB_URL}/welcome`,
      }
    );

    if (error) {
      console.log(error);

      return {
        status: error.status,
        body: {
          message: error.message,
          name: error.name,
        },
      };
    }
  },
};
