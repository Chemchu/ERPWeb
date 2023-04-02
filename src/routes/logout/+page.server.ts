import { redirect, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
  async default({ locals: { supabase } }) {
    await supabase.auth.signOut();
    throw redirect(303, "/");
  },
};
