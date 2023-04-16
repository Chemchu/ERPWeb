import { error as Error } from "@sveltejs/kit";

export const actions = {
  createPassword: async ({ request, locals }) => {
    const formData = await request.formData();
    const password = formData.get("password");
    const repeatedPassword = formData.get("repeat-password");

    if (!password) {
      return {
        status: 400,
        body: {
          message: "Password is required",
        },
      };
    }
    if (!repeatedPassword) {
      return {
        status: 400,
        body: {
          message: "Password is required",
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

    const { error } = await locals.supabase.auth.updateUser({
      password: password.toString(),
    });

    if (error) {
      console.log(error);
      throw Error(error.status || 400, error.message);
    }

    return JSON.stringify({
      message:
        "Invitation sent, please check your email for a link to complete your registration.",
    });
  },
};
