<script>
  import PosProducts from "$lib/components/pos/PosProducts.svelte";
  import { fade } from "svelte/transition";
</script>

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
<!--
  This example requires updating your template:

  ```
  <html class="h-full bg-white">
  <body class="h-full">
  ```
-->
<main
  class="lg:flex lg:min-h-full lg:flex-row-reverse dynamic-height lg:overflow-hidden"
>
  <h1 class="sr-only">Checkout</h1>

  <!-- Mobile order summary -->
  <section
    aria-labelledby="order-heading"
    class="bg-gray-50 px-4 py-6 sm:px-6 lg:hidden"
  >
    <div class="mx-auto max-w-lg">
      <div class="flex items-center justify-between">
        <h2 id="order-heading" class="text-lg font-medium text-gray-900">
          Your Order
        </h2>
        <button
          type="button"
          class="font-medium text-indigo-600 hover:text-indigo-500"
          aria-controls="disclosure-1"
          aria-expanded="false"
        >
          <!-- Only display for open option. -->
          <span>Hide full summary</span>
          <!-- Don't display for open option. -->
          <span>Show full summary</span>
        </button>
      </div>

      <div id="disclosure-1">
        <ul
          role="list"
          class="divide-y divide-gray-200 border-b border-gray-200"
        >
          <li class="flex space-x-6 py-6">
            <img
              src="https://tailwindui.com/img/ecommerce-images/checkout-form-04-product-01.jpg"
              alt="Off-white t-shirt with circular dot illustration on the front of mountain ridges that fade."
              class="h-40 w-40 flex-none rounded-md bg-gray-200 object-cover object-center"
            />
            <div class="flex flex-col justify-between space-y-4">
              <div class="space-y-1 text-sm font-medium">
                <h3 class="text-gray-900">Mountain Mist Artwork Tee</h3>
                <p class="text-gray-900">$36.00</p>
                <p class="text-gray-500">Birch</p>
                <p class="text-gray-500">L</p>
              </div>
              <div class="flex space-x-4">
                <button
                  type="button"
                  class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >Edit</button
                >
                <div class="flex border-l border-gray-300 pl-4">
                  <button
                    type="button"
                    class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >Remove</button
                  >
                </div>
              </div>
            </div>
          </li>

          <!-- More products... -->
        </ul>

        <dl class="mt-10 space-y-6 text-sm font-medium text-gray-500">
          <div class="flex justify-between">
            <dt>Subtotal</dt>
            <dd class="text-gray-900">$108.00</dd>
          </div>
          <div class="flex justify-between">
            <dt class="flex">
              Discount
              <span
                class="ml-2 rounded-full bg-gray-200 px-2 py-0.5 text-xs tracking-wide text-gray-600"
                >CHEAPSKATE</span
              >
            </dt>
            <dd class="text-gray-900">-$16.00</dd>
          </div>
          <div class="flex justify-between">
            <dt>Taxes</dt>
            <dd class="text-gray-900">$9.92</dd>
          </div>
          <div class="flex justify-between">
            <dt>Shipping</dt>
            <dd class="text-gray-900">$8.00</dd>
          </div>
        </dl>
      </div>

      <p
        class="mt-6 flex items-center justify-between border-t border-gray-200 pt-6 text-sm font-medium text-gray-900"
      >
        <span class="text-base">Total</span>
        <span class="text-base">$141.92</span>
      </p>
    </div>
  </section>

  <!-- Order summary -->
  <section
    aria-labelledby="summary-heading"
    class="hidden w-full max-w-md flex-col bg-gray-50 lg:flex"
  >
    <h2 id="summary-heading" class="sr-only">Order summary</h2>

    <ul
      role="list"
      class="flex-auto divide-y divide-gray-200 overflow-y-auto px-6"
    >
      <li class="flex space-x-6 py-6">
        <img
          src="https://tailwindui.com/img/ecommerce-images/checkout-form-04-product-01.jpg"
          alt="Off-white t-shirt with circular dot illustration on the front of mountain ridges that fade."
          class="h-40 w-40 flex-none rounded-md bg-gray-200 object-cover object-center"
        />
        <div class="flex flex-col justify-between space-y-4">
          <div class="space-y-1 text-sm font-medium">
            <h3 class="text-gray-900">Mountain Mist Artwork Tee</h3>
            <p class="text-gray-900">$36.00</p>
            <p class="text-gray-500">Birch</p>
            <p class="text-gray-500">L</p>
          </div>
          <div class="flex space-x-4">
            <button
              type="button"
              class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >Edit</button
            >
            <div class="flex border-l border-gray-300 pl-4">
              <button
                type="button"
                class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >Remove</button
              >
            </div>
          </div>
        </div>
      </li>

      <!-- More products... -->
    </ul>

    <div
      class="sticky bottom-0 flex-none border-t border-gray-200 bg-gray-50 p-6"
    >
      <dl class="mt-10 space-y-6 text-sm font-medium text-gray-500">
        <div class="flex justify-between">
          <dt>Subtotal</dt>
          <dd class="text-gray-900">$108.00</dd>
        </div>
        <div class="flex justify-between">
          <dt class="flex">
            Discount
            <span
              class="ml-2 rounded-full bg-gray-200 px-2 py-0.5 text-xs tracking-wide text-gray-600"
              >CHEAPSKATE</span
            >
          </dt>
          <dd class="text-gray-900">-$16.00</dd>
        </div>
        <div class="flex justify-between">
          <dt>Taxes</dt>
          <dd class="text-gray-900">$9.92</dd>
        </div>
        <div class="flex justify-between">
          <dt>Shipping</dt>
          <dd class="text-gray-900">$8.00</dd>
        </div>
        <div
          class="flex items-center justify-between border-t border-gray-200 pt-6 text-gray-900"
        >
          <dt>Total</dt>
          <dd class="text-base">$141.92</dd>
        </div>
      </dl>
    </div>
  </section>

  <!-- Checkout form -->
  <PosProducts />
</main>

<style>
  .dynamic-height {
    height: calc(100vh - 6rem);
  }
</style>
