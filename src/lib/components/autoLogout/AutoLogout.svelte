<script lang="ts">
  import { goto } from "$app/navigation";
  import type { SupabaseClient } from "@supabase/supabase-js";
  import { onDestroy, onMount } from "svelte";

  export let supabase: SupabaseClient | undefined;
  export let logoutTime = 10;

  const logout = async () => {
    if (!supabase) {
      throw new Error("AutoLogout: supabase client is undefined");
    }

    const { error } = await supabase.auth.signOut();
    if (!error) {
      goto("/login", { replaceState: true });
    }
  };

  let logoutTimer: number | undefined;

  const startLogoutTimer = () => {
    logoutTimer = setTimeout(logout, logoutTime);
  };

  const resetLogoutTimer = () => {
    clearTimeout(logoutTimer);
    startLogoutTimer();
  };

  onMount(() => {
    startLogoutTimer();

    // reset the timer whenever there is user activity (e.g. mouse or keyboard events)
    window.addEventListener("mousemove", resetLogoutTimer);
    window.addEventListener("keydown", resetLogoutTimer);
  });

  // cleanup event listeners on component unmount
  onDestroy(() => {
    clearTimeout(logoutTimer);
    window.removeEventListener("mousemove", resetLogoutTimer);
    window.removeEventListener("keydown", resetLogoutTimer);
  });
</script>
