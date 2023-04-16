import { error as Error, fail } from "@sveltejs/kit";
import { z } from "zod";

const newPasswordSchema = z.object({
  password: z
    .string()
    .trim()
    .min(8, { message: "El tamanyo minimo es de 8 caracteres" }),
  repeatedPassword: z
    .string()
    .trim()
    .min(8, { message: "El tamanyo minimo es de 8 caracteres" }),
});

export const actions = {
  createPassword: async ({ request, locals }) => {
    const formData = Object.fromEntries(await request.formData());
    const passwordData = newPasswordSchema.safeParse(formData);

    if (!passwordData.success) {
      const errors = passwordData.error.errors.map((error) => {
        return {
          field: error.path[0],
          message: error.message,
        };
      });

      return fail(400, { error: true, errors });
    }

    if (passwordData.data.password !== passwordData.data.repeatedPassword) {
      const err = {
        field: "repeatedPassword",
        message: "Las contraseñas no coinciden",
      };

      return fail(400, { error: true, erros: [err] });
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

    const { error } = await locals.supabase.auth.updateUser({
      password: passwordData.data.password,
    });

    if (error) {
      console.log(error);
      throw Error(error.status || 400, error.message);
    }

    return {
      status: 200,
      body: {
        message:
          "Invitation sent, please check your email for a link to complete your registration.",
      },
    };
  },
};
