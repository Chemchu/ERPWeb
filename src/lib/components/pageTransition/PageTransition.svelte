<script lang="ts">
  import { fly } from "svelte/transition";
  import { cubicIn, cubicOut } from "svelte/easing";
  import type { LayoutData } from "../../../routes/$types";

  export let data: LayoutData;
  export let excludedPaths: string[] = [];

  const duration = 300;
  const delay = duration + 100;
  const y = 10;

  const transitionIn = { easing: cubicOut, y, duration, delay };
  const transitionOut = { easing: cubicIn, y: -y, duration };

  const isExcludedPath = (path: string) =>
    excludedPaths.some((excludedPath) => path.includes(excludedPath));
</script>

{#key isExcludedPath(data.pathname)}
  <div in:fly={transitionIn} out:fly={transitionOut}>
    <slot />
  </div>
{/key}
