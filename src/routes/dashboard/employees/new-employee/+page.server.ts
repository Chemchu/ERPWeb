import { fail } from "@sveltejs/kit";
import { z } from "zod";

const newEployeeSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(3, { message: "El tamanyo minimo es de 3 caracteres" }),
  apellidos: z
    .string()
    .trim()
    .min(3, { message: "El tamanyo minimo es de 3 caracteres" }),
  email: z.string().trim().email({ message: "El email no es valido" }),
  rol: z.enum(["Administrador", "Gerente", "Cajero"]),
  dni: z
    .string()
    .trim()
    .min(3, { message: "El tamanyo minimo es de 3 caracteres" }),
});

export const actions = {
  createEmployee: async ({ request, locals }) => {
    const session = await locals.supabase.auth.getSession();
    if (!session.data.session) {
      return {
        status: 401,
        body: {
          message: "Unauthorized",
        },
      };
    }

    const formData = Object.fromEntries(await request.formData());
    const employeeData = newEployeeSchema.safeParse(formData);

    if (!employeeData.success) {
      const errors = employeeData.error.errors.map((error) => {
        return {
          field: error.path[0],
          message: error.message,
        };
      });

      return fail(400, { error: true, errors });
    }

    // Create a regex that mathes the url of the current request with a given pattern
    const regex = new RegExp(
      `^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)`,
      "g"
    );
    const matches = regex.exec(request.url);
    if (matches === null) {
      return fail(400, { error: true, message: "Invalid url" });
    }
    const url = matches[0];

    const { error } = await locals.supabase.auth.signInWithOtp({
      email: employeeData.data.email,
      options: {
        data: {
          nombre: employeeData.data.nombre,
          apellidos: employeeData.data.apellidos,
          rol: employeeData.data.rol,
          dni: employeeData.data.dni,
        },
        emailRedirectTo: `${url}/welcome`,
      },
    });

    if (error) {
      console.log(error);
      return fail(400, { error: true, message: error.message });
    }

    await locals.supabase.auth.setSession({
      access_token: session.data.session.access_token,
      refresh_token: session.data.session.refresh_token,
    });

    return {
      status: 200,
      error: false,
      message:
        "Invitation sent, please check your email for a link to complete your registration.",
    };
  },
};
