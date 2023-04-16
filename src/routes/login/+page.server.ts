import { fail, redirect } from "@sveltejs/kit";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().trim().email({ message: "El email no es valido" }),
  password: z
    .string()
    .trim()
    .min(8, { message: "El tamanyo minimo es de 8 caracteres" }),
});

export const actions = {
  login: async ({ request, locals }) => {
    const supabase = locals.supabase;
    const formData = Object.fromEntries(await request.formData());
    const loginData = loginSchema.safeParse(formData);

    if (!loginData.success) {
      const errors = loginData.error.errors.map((error) => {
        return {
          field: error.path[0],
          message: error.message,
        };
      });

      return fail(400, { error: true, errors });
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: loginData.data.email,
      password: loginData.data.password,
    });

    if (error) {
      return {
        status: error.status,
        body: {
          message: error.message,
          name: error.name,
        },
      };
    }

    throw redirect(303, "/dashboard");
  },
};
