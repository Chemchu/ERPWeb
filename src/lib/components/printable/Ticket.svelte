<script lang="ts">
  function print() {
    window.print();
  }
</script>

<!-- Add your HTML code here -->
<div>
  <!-- Your component HTML -->
</div>

<!-- Add a button to trigger the print method -->
<button
  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  on:click={print}
>
  Print
</button>
