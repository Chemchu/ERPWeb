<script lang="ts">
  export let titulo: string = "";
  export let defaultItem: string = "";
  export let items: string[] = [];
  export let id: string = "combobox";
  export let name: string = "combobox";

  let isOpen = false;
  let renderedItems = items;

  $: if (!isOpen) {
    AutoSelectItem();
  } else {
    renderedItems = items;
  }

  $: renderedItems = items.filter((item) => {
    return item.toLowerCase().startsWith(defaultItem.toLowerCase());
  });

  const AutoSelectItem = () => {
    const itemAlreadySelected = renderedItems.find(
      (item) => item == defaultItem
    );
    if (itemAlreadySelected) {
      return;
    }
    if (renderedItems.length > 0) {
      defaultItem = renderedItems[0];
    } else {
      defaultItem = items[0];
    }
  };
</script>

<div>
  <label for={id} class="block text-sm font-medium leading-6 text-gray-900"
    >{titulo}</label
  >
  <div class="relative">
    <input
      {id}
      {name}
      type="text"
      class="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      role="combobox"
      aria-controls="options"
      aria-expanded="false"
      autocomplete="off"
      bind:value={defaultItem}
      on:input={() => {
        isOpen = true;
      }}
      on:blur={() => (isOpen = false)}
    />
    <button
      type="button"
      class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
      on:click={() => (isOpen = !isOpen)}
    >
      <svg
        class="h-5 w-5 text-gray-400"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
    {#if isOpen}
      <ul
        class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        id="options"
        role="listbox"
      >
        {#each renderedItems as item, index}
          <li
            class={"relative cursor-default select-none py-2 pl-8 pr-4" +
              (item == defaultItem
                ? " text-white bg-indigo-600"
                : " text-gray-900 cursor-pointer hover:bg-gray-100")}
            id={"option-" + index}
            role="option"
            aria-selected={item == defaultItem}
            tabindex="-1"
            on:mousedown={() => {
              if (item != defaultItem) {
                defaultItem = item;
                isOpen = false;
              }
            }}
          >
            <span
              class={"block truncate" + item == defaultItem
                ? "font-semibold"
                : ""}>{item}</span
            >
            <span
              class={"absolute inset-y-0 left-0 flex items-center pl-1.5" +
                (item == defaultItem ? " text-white" : " text-indigo-600")}
            >
              {#if item == defaultItem}
                <svg
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clip-rule="evenodd"
                  />
                </svg>
              {/if}
            </span>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</div>
