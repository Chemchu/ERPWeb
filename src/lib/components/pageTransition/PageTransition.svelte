<script lang="ts">
  import { fly } from "svelte/transition";
  import { cubicIn, cubicOut } from "svelte/easing";

  export let pathname: string;
  export let excludedPaths: string[] = [];
  export let svelteTransition: Function = fly;

  $: if (!isExcludedPath(pathname)) {
    currentPathname = pathname;
  }

  let currentPathname: string = pathname;

  const duration = 300;
  const delay = duration + 100;
  const y = 50;

  const transitionIn = { easing: cubicOut, y, duration, delay };
  const transitionOut = { easing: cubicIn, y: -y, duration };

  const isExcludedPath = (path: string) =>
    excludedPaths.some((excludedPath) => {
      return path.includes(excludedPath);
    });
</script>

{#key currentPathname}
  <div in:svelteTransition={transitionIn} out:svelteTransition={transitionOut}>
    <slot />
  </div>
{/key}
