<script lang="ts">
  import type { Producto } from "$lib/types/types";
  import JsBarcode from "jsbarcode";

  export let producto: Producto;
  export let ean: String;
  let componentRef: HTMLDivElement;

  function print() {
    JsBarcode("#barcode", ean.toLowerCase(), {
      text: String(producto.precio_venta) + "€",
    });
    const content = componentRef.innerHTML;
    const printWindow = window.open("", "", "height=100%,width=100%");

    if (!printWindow) return;

    printWindow.document.write(
      `<html>
        <head>
          <title>Etiqueta</title>
        </head>
        <body>${content}</body>
      </html>`
    );
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  }
</script>

<!-- Add your HTML code here -->
<div class="hidden print:flex" bind:this={componentRef}>
  <div
    style="display: flex; flex-direction: column; justify-content: center; align-items: center; width: 100%;"
  >
    <span style="font-size: 1.25rem; line-height:1.75rem">
      {producto.nombre}
    </span>
    <svg id="barcode" />
  </div>
</div>

<!-- Add a button to trigger the print method -->
<button type="button" on:click={print}>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="w-6 h-6 hover:stroke-orange-700"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z"
    />
  </svg>
</button>
