<script>
  import { enhance } from "$app/forms";
</script>

<svelte:head>
  <title>ERPWeb - Iniciar sesión</title>
</svelte:head>
<div class="flex min-h-full h-screen">
  <div
    class="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24"
  >
    <div class="mx-auto w-full max-w-sm lg:w-96">
      <div>
        <p>
          <a href="/">
            <img
              class="h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
          </a>
        </p>
        <h2 class="mt-6 text-3xl font-bold tracking-tight text-gray-900">
          Inicia sesion
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          O
          <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500"
            >contacta con tu administrador</a
          >
        </p>
      </div>

      <div class="mt-8">
        <div class="mt-6">
          <form action="?/login" method="POST" class="space-y-6" use:enhance>
            <div>
              <label
                for="email"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Email</label
              >
              <div class="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  required
                  class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div class="space-y-1">
              <label
                for="password"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Contraseña</label
              >
              <div class="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autocomplete="current-password"
                  required
                  class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >Iniciar sesión</button
              >
            </div>

            <div class="text-sm text-center">
              <a
                href="/recover-account"
                class="font-medium text-indigo-600 hover:text-indigo-500"
                >¿Quieres restablecer la contraseña?</a
              >
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <div class="relative hidden w-0 flex-1 lg:block">
    <img
      class="absolute inset-0 h-full w-full object-cover"
      src="https://source.unsplash.com/Ah6WJ0nQUvE"
      alt=""
    />
  </div>
</div>
