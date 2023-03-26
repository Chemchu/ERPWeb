<svelte:head>
  <title>ERPWeb - Home page</title>
</svelte:head>

<div
  class="flex flex-col items-stretch w-full h-screen bg-blue-900 text-white py-2 px-10"
>
  <nav class="flex flex-row-reverse">
    <a class="hover:bg-white hover:text-black rounded-lg p-2" href="/login">
      Iniciar sesion
    </a>
    <a class="hover:bg-white hover:text-black rounded-lg p-2" href="/dashboard">
      Dashboard
    </a>
  </nav>
  <div class="flex grow justify-center items-center">
    <span class="text-9xl">ERPWeb!</span>
  </div>
</div>
