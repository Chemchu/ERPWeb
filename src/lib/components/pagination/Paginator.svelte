<script lang="ts">
  import { paginatorStore, type PaginatorFilter } from "$lib/stores/paginator";
</script>

<nav class="flex items-center justify-between px-4 sm:px-0">
  <div class="-mt-px flex w-0 flex-1">
    <button
      type="button"
      on:click={() =>
        paginatorStore.updateCurrentPage($paginatorStore.currentPage - 1)}
      class="inline-flex items-center border-b-2 border-transparent pr-1 pt-4 pb-2 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
    >
      <svg
        class="mr-3 h-5 w-5 text-gray-400"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M18 10a.75.75 0 01-.75.75H4.66l2.1 1.95a.75.75 0 11-1.02 1.1l-3.5-3.25a.75.75 0 010-1.1l3.5-3.25a.75.75 0 111.02 1.1l-2.1 1.95h12.59A.75.75 0 0118 10z"
          clip-rule="evenodd"
        />
      </svg>
      Anterior
    </button>
  </div>
  <div class="hidden md:-mt-px md:flex">
    {#each Array($paginatorStore.range.length) as _, i}
      {#if i < $paginatorStore.range.length}
        {#if i + $paginatorStore.range.start === $paginatorStore.currentPage}
          <button
            type="button"
            on:click={() =>
              paginatorStore.updateCurrentPage(
                i + 1 + $paginatorStore.range.start
              )}
            class="inline-flex items-center border-b-2 border-indigo-500 px-4 pt-4 pb-2 text-sm font-medium text-indigo-600"
            aria-current="page">{i + $paginatorStore.range.start}</button
          >
        {:else}
          <button
            type="button"
            on:click={() =>
              paginatorStore.updateCurrentPage(i + $paginatorStore.range.start)}
            class="inline-flex items-center border-b-2 border-transparent px-4 pt-4 pb-2 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            >{i + $paginatorStore.range.start}</button
          >
        {/if}
      {/if}
    {/each}
  </div>
  <div class="-mt-px flex w-0 flex-1 justify-end">
    <button
      type="button"
      on:click={() =>
        paginatorStore.updateCurrentPage($paginatorStore.currentPage + 1)}
      class="inline-flex items-center border-b-2 border-transparent pl-1 pt-4 pb-2 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
    >
      Siguiente
      <svg
        class="ml-3 h-5 w-5 text-gray-400"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
  </div>
</nav>
