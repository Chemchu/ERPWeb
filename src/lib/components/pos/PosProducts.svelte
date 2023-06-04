<script>
  import PosSearchbar from "./PosSearchbar.svelte";
  import ProductCard from "./ProductCard.svelte";
</script>

<section
  aria-labelledby="payment-heading"
  class="flex-auto overflow-auto pb-16 pt-12 sm:pt-16 lg:pb-24 lg:pt-0 lg:pr-4 max-h-full"
>
  <h2 id="payment-heading" class="sr-only">Payment and shipping details</h2>

  <PosSearchbar />
  <div class="bg-white">
    <div class="mx-auto max-w-2xl sm:px-6 lg:max-w-7xl lg:px-0">
      <div
        class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
      >
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <!-- More products... -->
      </div>
    </div>
  </div>
</section>
