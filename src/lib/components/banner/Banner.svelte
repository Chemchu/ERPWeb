<script lang="ts">
  import { BannerType } from "$lib/customEnums";

  export let title: string = "";
  export let subtitle: string = "";
  export let canBeClosed = true;
  export let bannerType: BannerType = BannerType.INFO;

  $: bannerColor = () => {
    switch (bannerType) {
      case BannerType.INFO:
        return "bg-purple-600";
      case BannerType.WARNING:
        return "bg-yellow-600";
      case BannerType.BAD:
        return "bg-red-600";
      case BannerType.GOOD:
        return "bg-green-600";
      default:
        return "bg-gray-900";
    }
  };
</script>

<!--
  Make sure you add some bottom padding to pages that include a sticky banner like this to prevent
  your content from being obscured when the user scrolls to the bottom of the page.
-->
<div
  class="pointer-events-none sm:flex sm:justify-center w-full pt-2.5 sm:pt-0"
>
  <div
    class={`pointer-events-auto flex items-center justify-between w-full gap-x-6 ${bannerColor()} px-6 py-2.5 sm:py-3 sm:pl-4 sm:pr-3.5`}
  >
    <p class="text-sm leading-6 text-white text-center w-full">
      <span>
        <strong class="font-semibold">{title}</strong><svg
          viewBox="0 0 2 2"
          class="mx-2 inline h-0.5 w-0.5 fill-current"
          aria-hidden="true"><circle cx="1" cy="1" r="1" /></svg
        >{subtitle}
      </span>
    </p>
    {#if canBeClosed}
      <button type="button" class="-m-1.5 flex-none p-1.5">
        <span class="sr-only">Dismiss</span>
        <svg
          class="h-5 w-5 text-white"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
          />
        </svg>
      </button>
    {/if}
  </div>
</div>
