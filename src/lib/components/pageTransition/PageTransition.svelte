<script lang="ts">
  import { fade, fly } from "svelte/transition";
  import { cubicIn, cubicOut } from "svelte/easing";
  import { GetNestedLevel } from "$lib/functions/paths";
  import { RouteNestedLevels } from "$lib/enums/nestedLevels";

  const duration = 300;
  const delay = duration + 100;
  const y = 50;
  const x = 50;

  export let pathname: string;
  export let excludedPaths: string[] = [];

  let svelteTransition: Function = fly;
  let currentPathname: string = pathname;
  let nestedLevel: RouteNestedLevels = RouteNestedLevels.Root;

  let transitionIn = { easing: cubicOut, y, x: 0, duration, delay };
  let transitionOut = { easing: cubicIn, y: -y, x: 0, duration };

  $: if (!isExcludedPath(pathname)) {
    currentPathname = pathname;
    nestedLevel = GetNestedLevel(pathname);

    if (nestedLevel == RouteNestedLevels.Root) {
      transitionIn.y = y;
      transitionOut.y = -y;
      transitionIn.x = 0;
      transitionOut.x = 0;
      svelteTransition = fly;
    }
    if (nestedLevel == RouteNestedLevels.Group) {
      svelteTransition = fade;
    }
    if (nestedLevel == RouteNestedLevels.Page) {
      transitionIn.y = 0;
      transitionOut.y = 0;
      transitionIn.x = -x;
      transitionOut.x = x;
      svelteTransition = fly;
    }
  }

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
