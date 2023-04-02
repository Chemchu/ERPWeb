import { redirect } from "@sveltejs/kit";

export const actions = {
  login: async ({ request, locals }) => {
    const supabase = locals.supabase;
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email) {
      return {
        status: 400,
        body: {
          message: "Email is required",
        },
      };
    }
    if (!password) {
      return {
        status: 400,
        body: {
          message: "Password is required",
        },
      };
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: email.toString(),
      password: password.toString(),
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
