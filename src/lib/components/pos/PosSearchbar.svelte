<!--
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
-->
<div class="relative mt-2">
  <label
    for="name"
    class="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
    >Buscar producto</label
  >
  <div
    class="w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6
    flex items-center justify-between"
  >
    <input
      type="text"
      name="name"
      id="name"
      class="block w-full border-0 rounded-md focus:ring-0 focus:outline-none text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
      placeholder="Nombre, código de barras o familia"
      autocomplete="off"
    />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-6 h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </div>
</div>
